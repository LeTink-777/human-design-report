/**
 * ЮKassa — создание платежа через REST API v3.
 * Метод оплаты не фиксируется: пользователю показываются все подключённые
 * способы (банковская карта, SberPay, СБП, T-Pay, ЮMoney и другие).
 */

const API_URL = "https://api.yookassa.ru/v3/payments";

export interface CreatePaymentResult {
  id: string;
  status: string;
  confirmationUrl: string;
}

interface YooKassaPaymentResponse {
  id: string;
  status: string;
  confirmation?: { confirmation_url?: string };
  description?: string;
}

function getCredentials(): { shopId: string; secretKey: string } {
  const shopId = process.env.NEXT_PUBLIC_YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    throw new Error(
      "ЮKassa не сконфигурирована: задай NEXT_PUBLIC_YUKASSA_SHOP_ID и YUKASSA_SECRET_KEY",
    );
  }
  return { shopId, secretKey };
}

export async function createPayment(
  amount: number,
  orderId: string,
  description: string,
  returnUrl: string,
  metadata?: Record<string, string>,
): Promise<CreatePaymentResult> {
  const { shopId, secretKey } = getCredentials();
  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
      // Ключ идемпотентности: повторный запрос с тем же ключом не создаёт дубль
      "Idempotence-Key": orderId,
    },
    body: JSON.stringify({
      amount: {
        value: amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: returnUrl,
      },
      description,
      metadata: {
        order_id: orderId,
        ...metadata,
      },
    }),
    cache: "no-store",
  });

  const payload = (await res.json()) as YooKassaPaymentResponse & {
    description?: string;
  };

  if (!res.ok) {
    throw new Error(
      `ЮKassa вернула ошибку ${res.status}: ${payload?.description ?? "неизвестная ошибка"}`,
    );
  }

  const confirmationUrl = payload.confirmation?.confirmation_url;
  if (!confirmationUrl) {
    throw new Error("ЮKassa не вернула ссылку подтверждения платежа");
  }

  return {
    id: payload.id,
    status: payload.status,
    confirmationUrl,
  };
}
