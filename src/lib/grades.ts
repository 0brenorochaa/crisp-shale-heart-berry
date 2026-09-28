export type GradeValue = number | "SN" | null;

export type SubjectStatus =
  | "achieved"
  | "progress"
  | "attention"
  | "impossible"
  | "excluded";

export interface Subject {
  id: string;
  name: string;
  grades: GradeValue[];
  semNota: boolean;
}

export interface StudentInfo {
  name: string;
  school: string;
  series: string;
  className: string;
  year: string;
}

export interface AppData {
  meta: number;
  bimesters: number;
  maxPerBimester: number;
  student: StudentInfo;
  subjects: Subject[];
}

export interface SubjectAnalysis {
  id: string;
  name: string;
  excluded: boolean;
  total: number;
  needed: number;
  remaining: number;
  avgNeeded: number | null;
  maxRemaining: number;
  possible: boolean;
  achieved: boolean;
  status: SubjectStatus;
  grades: GradeValue[];
  filledCount: number;
  message: string;
}

export interface SummaryStats {
  registered: number;
  counted: number;
  excluded: number;
  achieved: number;
  progress: number;
  attention: number;
  impossible: number;
  needsAttention: number;
  highest: { name: string; needed: number; avgNeeded: number | null } | null;
  lowest: { name: string; needed: number; avgNeeded: number | null } | null;
}

export const DEFAULT_META = 24;
export const DEFAULT_BIMESTERS = 4;
export const DEFAULT_MAX_PER = 10;
export const ATTENTION_THRESHOLD = 7;
export const STORAGE_KEY = "calculadora-pontos-v1";

export const STATUS_LABEL: Record<SubjectStatus, string> = {
  achieved: "Meta atingida",
  progress: "Em andamento",
  attention: "Precisa de atenção",
  impossible: "Meta impossível",
  excluded: "Sem nota",
};

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function formatGrade(n: number): string {
  return round1(n).toFixed(1).replace(".", ",");
}

export function formatValue(value: GradeValue): string {
  if (value === null) return "";
  if (value === "SN") return "SN";
  return formatGrade(value);
}

export function parseGrade(raw: string): { ok: true; value: GradeValue } | { ok: false } {
  const t = raw.trim().toUpperCase();
  if (t === "") return { ok: true, value: null };
  const compact = t.replace(/\s+/g, "");
  if (
    compact === "SN" ||
    compact === "S.N." ||
    compact === "S.N" ||
    compact === "SEMNOTA" ||
    compact === "SEM-NOTA"
  ) {
    return { ok: true, value: "SN" };
  }
  const normalized = compact.replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) return { ok: false };
  const n = Number(normalized);
  if (!Number.isFinite(n)) return { ok: false };
  const clamped = round1(Math.min(DEFAULT_MAX_PER, Math.max(0, n)));
  return { ok: true, value: clamped };
}

export function emptyGrades(count: number): GradeValue[] {
  return Array.from({ length: count }, () => null);
}

export function resizeGrades(grades: GradeValue[], count: number): GradeValue[] {
  if (grades.length === count) return grades;
  if (grades.length > count) return grades.slice(0, count);
  return [...grades, ...emptyGrades(count - grades.length)];
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createDefaultData(): AppData {
  const bimesters = DEFAULT_BIMESTERS;
  const seed: Array<{ name: string; grades: GradeValue[]; semNota?: boolean }> = [
    { name: "Língua Portuguesa e suas Literaturas", grades: [10, 7] },
    { name: "Educação Física", grades: [7.5, 7] },
    { name: "Artes", grades: [10, 6] },
    { name: "Língua Inglesa", grades: [8, 7.5] },
    { name: "Matemática", grades: [7, 8] },
    { name: "Química", grades: [7, 6] },
    { name: "Física", grades: [7.5, 6.5] },
    { name: "Biologia", grades: [9.5, 6.5] },
    { name: "História", grades: [8.5, 8.5] },
    { name: "Geografia", grades: [10, 10] },
    { name: "Filosofia", grades: [10, 9] },
    { name: "Sociologia", grades: [7, 8.5] },
    { name: "Temas de Aprofundamento Curricular (TAC)", grades: [6, 8] },
    { name: "Práticas de Integração com o Território (PIT)", grades: [8.5, 9] },
    { name: "Projeto de Vida", grades: ["SN", "SN"], semNota: true },
  ];

  return {
    meta: DEFAULT_META,
    bimesters,
    maxPerBimester: DEFAULT_MAX_PER,
    student: {
      name: "",
      school: "",
      series: "",
      className: "",
      year: String(new Date().getFullYear()),
    },
    subjects: seed.map((item, index) => ({
      id: `sub-${index + 1}`,
      name: item.name,
      grades: resizeGrades(item.grades, bimesters),
      semNota: Boolean(item.semNota),
    })),
  };
}

export function buildMessage(
  analysis: Pick<
    SubjectAnalysis,
    "excluded" | "achieved" | "possible" | "remaining" | "needed" | "avgNeeded"
  >,
  meta: number,
): string {
  if (analysis.excluded) return "Matéria sem nota — não entra no cálculo.";
  if (analysis.achieved) return "Meta atingida";
  if (!analysis.possible) {
    return `Não é mais possível atingir a meta de ${formatGrade(meta)} pontos.`;
  }
  if (analysis.remaining === 1) {
    return `Você precisa tirar ${formatGrade(analysis.needed)} no último bimestre.`;
  }
  return `Pontos necessários nos bimestres restantes: ${formatGrade(analysis.needed)}. Média necessária: ${formatGrade(analysis.avgNeeded ?? 0)}.`;
}

export function analyzeSubject(
  subject: Subject,
  meta: number,
  maxPer: number,
): SubjectAnalysis {
  if (subject.semNota) {
    const base = {
      id: subject.id,
      name: subject.name,
      excluded: true,
      total: 0,
      needed: 0,
      remaining: 0,
      avgNeeded: null,
      maxRemaining: 0,
      possible: true,
      achieved: false,
      status: "excluded" as const,
      grades: subject.grades,
      filledCount: 0,
      message: "",
    };
    return { ...base, message: buildMessage(base, meta) };
  }

  const total = round1(
    subject.grades.reduce<number>(
      (sum, grade) => sum + (typeof grade === "number" ? grade : 0),
      0,
    ),
  );
  const remaining = subject.grades.filter((grade) => grade === null).length;
  const filledCount = subject.grades.filter((grade) => typeof grade === "number").length;
  const needed = round1(Math.max(0, meta - total));
  const maxRemaining = round1(remaining * maxPer);
  const achieved = total + 1e-9 >= meta;
  const possible = achieved || needed <= maxRemaining + 1e-9;
  const avgNeeded = remaining > 0 ? round1(needed / remaining) : null;

  let status: SubjectStatus;
  if (achieved) status = "achieved";
  else if (!possible) status = "impossible";
  else if (avgNeeded !== null && avgNeeded >= ATTENTION_THRESHOLD) status = "attention";
  else status = "progress";

  const partial = {
    excluded: false,
    achieved,
    possible,
    remaining,
    needed,
    avgNeeded,
  };

  return {
    id: subject.id,
    name: subject.name,
    excluded: false,
    total,
    needed,
    remaining,
    avgNeeded,
    maxRemaining,
    possible,
    achieved,
    status,
    grades: subject.grades,
    filledCount,
    message: buildMessage(partial, meta),
  };
}

export function analyzeAll(
  subjects: Subject[],
  meta: number,
  maxPer: number,
): SubjectAnalysis[] {
  return subjects.map((subject) => analyzeSubject(subject, meta, maxPer));
}

export function summarize(rows: SubjectAnalysis[]): SummaryStats {
  const counted = rows.filter((row) => !row.excluded);
  const pending = counted.filter((row) => !row.achieved);

  let highest: SummaryStats["highest"] = null;
  let lowest: SummaryStats["lowest"] = null;
  for (const row of pending) {
    const entry = { name: row.name, needed: row.needed, avgNeeded: row.avgNeeded };
    if (!highest || row.needed > highest.needed) highest = entry;
    if (!lowest || row.needed < lowest.needed) lowest = entry;
  }

  const attention = counted.filter((row) => row.status === "attention").length;
  const impossible = counted.filter((row) => row.status === "impossible").length;

  return {
    registered: rows.length,
    counted: counted.length,
    excluded: rows.length - counted.length,
    achieved: counted.filter((row) => row.status === "achieved").length,
    progress: counted.filter((row) => row.status === "progress").length,
    attention,
    impossible,
    needsAttention: attention + impossible,
    highest,
    lowest,
  };
}

export function bimesterLabel(index: number): string {
  return `${index + 1}º`;
}

export function todayBR(): string {
  return new Date().toLocaleDateString("pt-BR");
}

export function normalizeData(data: AppData): AppData {
  const bimesters = Math.min(6, Math.max(1, Math.round(data.bimesters) || DEFAULT_BIMESTERS));
  const metaRaw = Number(data.meta);
  const meta = Number.isFinite(metaRaw) ? round1(Math.max(0, metaRaw)) : DEFAULT_META;
  const maxPer = DEFAULT_MAX_PER;
  return {
    meta,
    bimesters,
    maxPerBimester: maxPer,
    student: {
      name: data.student?.name ?? "",
      school: data.student?.school ?? "",
      series: data.student?.series ?? "",
      className: data.student?.className ?? "",
      year: data.student?.year ?? String(new Date().getFullYear()),
    },
    subjects: (data.subjects ?? []).map((subject) => ({
      id: subject.id || newId(),
      name: subject.name || "Nova matéria",
      grades: resizeGrades(Array.isArray(subject.grades) ? subject.grades : [], bimesters),
      semNota: Boolean(subject.semNota),
    })),
  };
}
