import { NextResponse } from "next/server";

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
  } else if (event === "payment.canceled") {
    console.log("[webhook] payment canceled", { paymentId: payment?.id });
  } else {
    console.log("[webhook] event received", { event, paymentId: payment?.id });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
