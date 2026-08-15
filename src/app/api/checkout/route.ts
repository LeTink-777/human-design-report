import { NextResponse } from "next/server";
import { createPayment } from "@/lib/yukassa";
import { resolveReturnOrigin } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLANS = {
  basic: { amount: 290, description: "Базовый отчёт Human Design" },
  full: { amount: 590, description: "Полный отчёт Human Design" },
  premium: { amount: 1390, description: "Отчёт Human Design + сессия разбора" },
} as const;

type PlanId = keyof typeof PLANS;

interface CheckoutBody {
  plan?: string;
  userData?: {
    name?: string;
    email?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
  };
}

function isPlan(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (!isPlan(body.plan)) {
    return NextResponse.json({ error: "Неизвестный тариф" }, { status: 400 });
  }

  const plan = PLANS[body.plan];
  const orderId = crypto.randomUUID();

  const origin = resolveReturnOrigin(
    request.headers.get("origin") || new URL(request.url).origin,
  );

  try {
    const payment = await createPayment(
      plan.amount,
      orderId,
      plan.description,
      `${origin}/thank-you`,
      {
        plan: body.plan,
        name: body.userData?.name?.slice(0, 100) ?? "",
        email: body.userData?.email?.slice(0, 120) ?? "",
        birth_date: body.userData?.birthDate ?? "",
        // Профиль в calculateHD() зависит от часа рождения, поэтому время
        // обязано доехать до вебхука вместе с датой.
        birth_time: body.userData?.birthTime ?? "",
        birth_place: body.userData?.birthPlace?.slice(0, 100) ?? "",
      },
    );

    return NextResponse.json({
      confirmationUrl: payment.confirmationUrl,
      orderId,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error("[checkout] payment creation failed:", error);
    return NextResponse.json(
      { error: "Не удалось создать платёж. Попробуй ещё раз." },
      { status: 502 },
    );
  }
}
