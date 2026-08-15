export interface HDData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  email: string;
}

const DATA_KEY = "hd_data";
const TIMER_KEY = "hd_timer_start";
const SPOTS_KEY = "hd_spots";

const TIMER_WINDOW_MS = 24 * 60 * 60 * 1000;

export function saveHDData(data: HDData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function parseHDData(raw: string | null): HDData | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<HDData>;
    if (!parsed.name || !parsed.birthDate || !parsed.birthTime || !parsed.email) {
      return null;
    }
    return {
      name: parsed.name,
      birthDate: parsed.birthDate,
      birthTime: parsed.birthTime,
      birthPlace: parsed.birthPlace ?? "",
      email: parsed.email,
    };
  } catch {
    return null;
  }
}

export function readHDData(): HDData | null {
  if (typeof window === "undefined") return null;
  return parseHDData(window.localStorage.getItem(DATA_KEY));
}

const PENDING_ORDER_KEY = "hd_pending_order";

export interface PendingOrder {
  plan: string;
  /** Нужен /api/generate-pdf, чтобы подтвердить оплату перед выдачей PDF. */
  paymentId: string | null;
}

/** Переживает переход на страницу оплаты ЮKassa и обратно. */
export function savePendingOrder(order: PendingOrder): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
  } catch {
    // Отчёт всё равно уходит письмом, даже если браузер ничего не сохранил.
  }
}

export function readPendingOrder(): PendingOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_ORDER_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<PendingOrder>;
    if (typeof parsed?.plan !== "string") return null;

    return {
      plan: parsed.plan,
      paymentId: typeof parsed.paymentId === "string" ? parsed.paymentId : null,
    };
  } catch {
    return null;
  }
}

/* --- внешнее хранилище для useSyncExternalStore --- */

export interface HDDataState {
  /** true после того, как значение прочитано в браузере */
  ready: boolean;
  data: HDData | null;
}

const SERVER_STATE: HDDataState = { ready: false, data: null };

let cachedRaw: string | null | undefined;
let cachedState: HDDataState = SERVER_STATE;

export function subscribeHDData(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getHDDataSnapshot(): HDDataState {
  const raw = window.localStorage.getItem(DATA_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedState = { ready: true, data: parseHDData(raw) };
  }
  return cachedState;
}

export function getHDDataServerSnapshot(): HDDataState {
  return SERVER_STATE;
}

/** Старт 24-часового окна цены. Возвращает миллисекунды до конца окна. */
export function getTimerRemaining(): number {
  if (typeof window === "undefined") return TIMER_WINDOW_MS;
  const raw = window.localStorage.getItem(TIMER_KEY);
  let start = raw ? parseInt(raw, 10) : NaN;
  if (!Number.isFinite(start) || Date.now() - start > TIMER_WINDOW_MS) {
    start = Date.now();
    window.localStorage.setItem(TIMER_KEY, String(start));
  }
  const remaining = start + TIMER_WINDOW_MS - Date.now();
  return remaining > 0 ? remaining : 0;
}

export function formatTimer(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

interface SpotsState {
  value: number;
  ts: number;
}

const SPOTS_MAX = 4;
const SPOTS_MIN = 2;

/** Количество оставшихся мест: от 4 до 2, шаг примерно раз в 8-12 минут. */
export function getSpots(): number {
  if (typeof window === "undefined") return SPOTS_MAX;
  let state: SpotsState | null = null;
  try {
    const raw = window.localStorage.getItem(SPOTS_KEY);
    if (raw) state = JSON.parse(raw) as SpotsState;
  } catch {
    state = null;
  }

  const now = Date.now();
  if (!state || typeof state.value !== "number" || typeof state.ts !== "number") {
    state = { value: SPOTS_MAX, ts: now };
    window.localStorage.setItem(SPOTS_KEY, JSON.stringify(state));
    return state.value;
  }

  // случайный, но стабильный шаг 8–12 минут, привязанный к текущему значению
  const stepMs = (8 + ((state.value * 7) % 5)) * 60 * 1000;
  if (state.value > SPOTS_MIN && now - state.ts >= stepMs) {
    state = { value: state.value - 1, ts: now };
    window.localStorage.setItem(SPOTS_KEY, JSON.stringify(state));
  }
  return state.value;
}
