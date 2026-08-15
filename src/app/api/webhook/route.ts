import { NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf-generator";
import { sendResultEmail } from "@/lib/email";
import {
  buildSubtitle,
  generateResultSections,
  inputFromMetadata,
} from "@/lib/result-sections";
import { clientIp, isYookassaAddress } from "@/lib/webhook-guard";
import { SITE_NAME } from "@/lib/site-name";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface WebhookBody {
  event?: string;
  object?: {
    id?: string;
    status?: string;
    paid?: boolean;
    amount?: { value?: string; currency?: string };
    description?: string;
    metadata?: Record<string, string>;
  };
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (!isYookassaAddress(ip)) {
    console.warn("[webhook] уведомление с неизвестного адреса отклонено", { ip });
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: WebhookBody;
  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    // ЮKassa повторяет доставку только на 5xx, поэтому на битый JSON отвечаем 200
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const event = body.event;
  const payment = body.object;

  if (event === "payment.succeeded" && payment?.status === "succeeded") {
    console.log("[webhook] payment succeeded", {
      paymentId: payment.id,
      amount: payment.amount?.value,
      currency: payment.amount?.currency,
      description: payment.description,
      plan: payment.metadata?.plan,
      email: payment.metadata?.email,
      orderId: payment.metadata?.order_id,
    });

    await deliverReport(payment.metadata ?? {}, payment.id ?? null);
  } else if (event === "payment.canceled") {
    console.log("[webhook] payment canceled", { paymentId: payment?.id });
  } else {
    console.log("[webhook] event received", { event, paymentId: payment?.id });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Защита от повторной отправки одного и того же отчёта.
 *
 * ЮKassa повторяет уведомление, пока не получит 200, поэтому доставка,
 * завершившаяся после медленного ответа, ушла бы покупателю дважды. Множество
 * живёт в памяти инстанса и покрывает только повторы, попавшие на тот же
 * прогретый процесс — надёжное решение это запись заказа в базе, которой у
 * проекта пока нет.
 */
const delivered = new Set<string>();

async function deliverReport(
  metadata: Record<string, string>,
  paymentId: string | null,
): Promise<void> {
  const key = paymentId ?? metadata.order_id ?? "";

  if (key && delivered.has(key)) {
    console.log("[webhook] отчёт уже отправлен, пропускаем", { paymentId });
    return;
  }

  const email = metadata.email;
  const input = inputFromMetadata(metadata);

  if (!email || !input) {
    console.error("[webhook] недостаточно данных для отправки отчёта", {
      paymentId,
      hasEmail: Boolean(email),
      hasInput: Boolean(input),
    });
    return;
  }

  const userName = input.name || "Дорогой клиент";

  try {
    const sections = generateResultSections(input, metadata.plan);

    const pdfBuffer = await generatePDF({
      title: "Ваш отчёт Human Design",
      userName,
      subtitle: buildSubtitle(input),
      sections,
      siteName: SITE_NAME,
    });

    await sendResultEmail({
      to: email,
      subject: "Ваш отчёт Human Design готов",
      userName,
      resultHtml: sections
        .map(
          (section) =>
            `<h3 style="color:#C4896B;font-size:17px;margin:24px 0 8px;">${section.title}</h3>` +
            `<p style="font-size:15px;line-height:1.6;margin:0;white-space:pre-line;">${section.content}</p>`,
        )
        .join(""),
      pdfBuffer,
      fileName: "human-design.pdf",
      siteName: SITE_NAME,
    });

    if (key) delivered.add(key);

    console.log("[webhook] отчёт отправлен", { paymentId, to: email });
  } catch (error) {
    // Ошибку намеренно не пробрасываем: ответ всё равно 200. Ответ не-200
    // заставит ЮKassa повторять уведомление часами, а сбой здесь относится к
    // доставке, а не к платежу — деньги уже приняты в любом случае.
    console.error("[webhook] не удалось отправить отчёт", {
      paymentId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
