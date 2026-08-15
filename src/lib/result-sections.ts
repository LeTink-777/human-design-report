import { ALL_CENTERS, calculateHD, getDefinedCenters } from "@/lib/humandesign";
import type { PdfSection } from "@/lib/pdf-generator";

/**
 * Собирает разделы отчёта для PDF в письме, PDF по кнопке и открытого
 * результата на /thank-you — чтобы все три источника совпадали.
 *
 * Всё содержание берётся из calculateHD() в src/lib/humandesign.ts, то есть из
 * того же расчёта, который показывает бесплатная страница результата.
 */

export type HDInput = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

type PlanId = "basic" | "full" | "premium";

function isPlanId(value: unknown): value is PlanId {
  return value === "basic" || value === "full" || value === "premium";
}

/**
 * Базовый тариф открывает тип, стратегию и авторитет; полный и премиум
 * добавляют центры, профиль, отношения и карьеру.
 */
function sectionCountForPlan(plan: PlanId): number {
  return plan === "basic" ? 3 : 8;
}

export function generateResultSections(
  input: HDInput,
  plan: string | null | undefined
): PdfSection[] {
  if (!input.birthDate) return [];

  const resolvedPlan: PlanId = isPlanId(plan) ? plan : "full";
  const result = calculateHD(
    input.name,
    input.birthDate,
    input.birthTime,
    input.birthPlace
  );

  const { typeData, profileData, authorityData } = result;

  const defined = new Set(getDefinedCenters(result.type));
  const definedLabels = ALL_CENTERS.filter((center) => defined.has(center.key))
    .map((center) => center.label)
    .join(", ");
  const openLabels = ALL_CENTERS.filter((center) => !defined.has(center.key))
    .map((center) => center.label)
    .join(", ");

  const all: PdfSection[] = [
    {
      title: `Ваш тип — ${typeData.name}`,
      content: `${typeData.tagline}\n\n${typeData.description}\n\nВ мире таких людей ${typeData.population}.`,
    },
    {
      title: `Стратегия — ${typeData.strategy}`,
      content: `${typeData.strategy}. Это способ принимать решения, при котором вы тратите меньше сил и реже попадаете не туда.\n\nПризнак верного пути: ${typeData.signature}. Признак того, что вы свернули: ${typeData.not_self_theme}.`,
    },
    {
      title: `Внутренний авторитет — ${authorityData.name}`,
      content: `${authorityData.how_to_decide}\n\n${typeData.authority_description}`,
    },
    {
      title: "Ваши сильные стороны",
      content: typeData.strengths
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n"),
    },
    {
      title: `Профиль ${profileData.code} — ${profileData.name}`,
      content: `${profileData.description}\n\nТема жизни: ${profileData.life_theme}`,
    },
    {
      title: "Центры бодиграфа",
      content: `Определённые центры: ${definedLabels || "нет"}.\nОткрытые центры: ${openLabels || "нет"}.\n\nОпределённые центры работают у вас стабильно — это ваша надёжная опора. Открытые центры воспринимают энергию окружающих, и именно там вы чаще всего проживаете чужое как своё.\n\nОпределение: ${result.definition}`,
    },
    {
      title: "Отношения",
      content: typeData.relationships,
    },
    {
      title: "Работа и карьера",
      content: `${typeData.career}\n\nЛовушка не-себя: ${typeData.not_self}`,
    },
  ];

  return all.slice(0, sectionCountForPlan(resolvedPlan));
}

/** Читает данные покупателя из metadata ЮKassa — там всё приходит строками. */
export function inputFromMetadata(
  metadata: Record<string, string>
): HDInput | null {
  const birthDate = metadata.birth_date;
  if (!birthDate) return null;

  return {
    name: metadata.name || "",
    birthDate,
    // Заказы, оформленные до появления этих полей, считаются на полдень.
    birthTime: metadata.birth_time || "12:00",
    birthPlace: metadata.birth_place || "",
  };
}

/** Строка под заголовком отчёта: имя и данные рождения. */
export function buildSubtitle(input: HDInput): string {
  const parts = [input.birthDate];
  if (input.birthTime) parts.push(input.birthTime);
  if (input.birthPlace) parts.push(input.birthPlace);
  const details = parts.join(" · ");
  return input.name ? `${input.name} · ${details}` : details;
}
