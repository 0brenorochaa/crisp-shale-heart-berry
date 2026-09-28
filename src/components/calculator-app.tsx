import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Calculator,
  Eraser,
  FileDown,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { SubjectList } from "@/components/subject-list";
import {
  analyzeAll,
  formatGrade,
  STATUS_LABEL,
  summarize,
  type SubjectStatus,
} from "@/lib/grades";
import { generatePdfReport } from "@/lib/pdf";
import { useGradeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<SubjectStatus, string> = {
  achieved: "bg-success",
  progress: "bg-info",
  attention: "bg-warn",
  impossible: "bg-danger",
  excluded: "bg-subtle",
};

export function CalculatorApp() {
  const meta = useGradeStore((s) => s.meta);
  const bimesters = useGradeStore((s) => s.bimesters);
  const maxPerBimester = useGradeStore((s) => s.maxPerBimester);
  const student = useGradeStore((s) => s.student);
  const subjects = useGradeStore((s) => s.subjects);
  const setMeta = useGradeStore((s) => s.setMeta);
  const setBimesters = useGradeStore((s) => s.setBimesters);
  const setStudent = useGradeStore((s) => s.setStudent);
  const setSubjectName = useGradeStore((s) => s.setSubjectName);
  const setGrade = useGradeStore((s) => s.setGrade);
  const setSemNota = useGradeStore((s) => s.setSemNota);
  const addSubject = useGradeStore((s) => s.addSubject);
  const removeSubject = useGradeStore((s) => s.removeSubject);
  const clearGrades = useGradeStore((s) => s.clearGrades);
  const resetAll = useGradeStore((s) => s.resetAll);

  const [metaText, setMetaText] = useState(String(meta).replace(".", ","));
  const [confirm, setConfirm] = useState<"clear" | "reset" | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    setMetaText(String(meta).replace(".", ","));
  }, [meta]);

  const analyses = useMemo(
    () => analyzeAll(subjects, meta, maxPerBimester),
    [subjects, meta, maxPerBimester],
  );
  const stats = useMemo(() => summarize(analyses), [analyses]);

  function commitMeta(raw: string) {
    const normalized = raw.trim().replace(",", ".");
    const value = Number(normalized);
    if (!Number.isFinite(value) || value <= 0) {
      setMetaText(String(meta).replace(".", ","));
      toast.error("Informe uma meta válida maior que zero.");
      return;
    }
    setMeta(Math.round(value * 10) / 10);
  }

  function handleCalculate() {
    document.getElementById("resumo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success("Cálculos atualizados instantaneamente.");
  }

  async function handlePdf() {
    setPdfBusy(true);
    try {
      await generatePdfReport(useGradeStore.getState());
      toast.success("PDF gerado. Salve o arquivo no aparelho.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível gerar o PDF.");
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg pb-16">
      <Toaster position="top-center" richColors closeButton />
      <header className="border-b border-line bg-primary text-primary-fg">
        <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-6 sm:py-8">
          <span className="mt-1 hidden rounded-md bg-primary-fg/10 p-2 sm:inline-flex">
            <BookOpen className="size-6" />
          </span>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary-fg/70 uppercase">
              Ano letivo {student.year || new Date().getFullYear()}
            </p>
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              Calculadora de Pontos para Aprovação
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-primary-fg/80">
              Meta de aprovação: {formatGrade(meta)} pontos · {bimesters} bimestres · máximo{" "}
              {formatGrade(maxPerBimester)} por bimestre
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-6">
        <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] sm:p-6">
          <div className="flex flex-wrap items-end gap-4">
            <label className="min-w-40 flex-1">
              <span className="mb-1 block text-xs font-medium text-muted">
                Meta de aprovação (pontos)
              </span>
              <Input
                inputMode="decimal"
                value={metaText}
                onChange={(event) => setMetaText(event.target.value)}
                onBlur={() => commitMeta(metaText)}
                aria-label="Meta de aprovação"
              />
            </label>
            <label className="w-40">
              <span className="mb-1 block text-xs font-medium text-muted">Bimestres</span>
              <select
                aria-label="Número de bimestres"
                value={bimesters}
                onChange={(event) => setBimesters(Number(event.target.value))}
                className="h-11 w-full rounded-md bg-surface px-3 text-base text-ink shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Field
              label="Nome do estudante"
              value={student.name}
              onChange={(value) => setStudent({ name: value })}
            />
            <Field
              label="Escola"
              value={student.school}
              onChange={(value) => setStudent({ school: value })}
            />
            <Field
              label="Série/Ano"
              value={student.series}
              onChange={(value) => setStudent({ series: value })}
            />
            <Field
              label="Turma"
              value={student.className}
              onChange={(value) => setStudent({ className: value })}
            />
          </div>
          <div className="mt-3 max-w-xs">
            <Field
              label="Ano letivo"
              value={student.year}
              onChange={(value) => setStudent({ year: value })}
            />
          </div>
        </section>

        <div className="no-print mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            onClick={() => {
              const id = addSubject();
              setFocusId(id);
              toast.success("Matéria adicionada.");
            }}
          >
            <Plus />
            Adicionar matéria
          </Button>
          <Button type="button" variant="outline" onClick={() => setConfirm("clear")}>
            <Eraser />
            Limpar notas
          </Button>
          <Button type="button" variant="secondary" onClick={handleCalculate}>
            <Calculator />
            Calcular
          </Button>
          <Button type="button" variant="success" disabled={pdfBusy} onClick={() => void handlePdf()}>
            <FileDown />
            {pdfBusy ? "Gerando…" : "Gerar PDF"}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.print()}>
            <Printer />
            Imprimir
          </Button>
        </div>

        <section id="resumo" className="mt-6 scroll-mt-4">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="size-4 text-primary" />
            <h2 className="font-display text-2xl font-semibold text-ink">Resumo</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Matérias cadastradas" value={String(stats.registered)} />
            <Stat label="Matérias com meta atingida" value={String(stats.achieved)} tone="success" />
            <Stat label="Matérias em andamento" value={String(stats.progress)} tone="info" />
            <Stat
              label="Matérias que precisam de atenção"
              value={String(stats.needsAttention)}
              tone={stats.needsAttention ? "warn" : "muted"}
            />
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <NeedCard
              title="Maior pontuação necessária"
              entry={stats.highest}
              empty="Nenhuma matéria pendente."
            />
            <NeedCard
              title="Menor pontuação necessária"
              entry={stats.lowest}
              empty="Nenhuma matéria pendente."
            />
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Notas por matéria</h2>
            <p className="hidden text-xs text-muted sm:block">
              Toque no nome para editar. Digite SN ou use o botão para sem nota.
            </p>
          </div>
          <SubjectList
            subjects={subjects}
            analyses={analyses}
            bimesters={bimesters}
            meta={meta}
            focusId={focusId}
            onName={setSubjectName}
            onGrade={setGrade}
            onSemNota={setSemNota}
            onRemove={(id) => {
              removeSubject(id);
              toast.success("Matéria removida.");
            }}
          />
        </section>

        <section className="mt-6 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5">
          <h3 className="text-sm font-semibold text-ink">Legenda de status</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(["achieved", "progress", "attention", "impossible"] as const).map((status) => (
              <li key={status} className="flex items-center gap-2 text-sm text-ink">
                <span className={cn("size-2.5 rounded-full", STATUS_DOT[status])} />
                {STATUS_LABEL[status]}
              </li>
            ))}
          </ul>
        </section>

        <div className="no-print mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
            Tudo fica neste aparelho. As notas são salvas automaticamente e nenhum dado é enviado.
          </p>
          <Button type="button" variant="ghost" onClick={() => setConfirm("reset")}>
            <RotateCcw />
            Apagar todos os dados
          </Button>
        </div>
      </main>

      <ConfirmDialog
        open={confirm === "clear"}
        onOpenChange={(open) => !open && setConfirm(null)}
        title="Limpar todas as notas?"
        description="As matérias continuam cadastradas, mas todos os bimestres voltam a ficar vazios."
        confirmLabel="Limpar notas"
        danger
        onConfirm={() => {
          clearGrades();
          setConfirm(null);
          toast.success("Notas apagadas.");
        }}
      />
      <ConfirmDialog
        open={confirm === "reset"}
        onOpenChange={(open) => !open && setConfirm(null)}
        title="Apagar todos os dados?"
        description="Isso restaura as matérias iniciais de demonstração e limpa os dados do estudante neste aparelho."
        confirmLabel="Apagar dados"
        danger
        onConfirm={() => {
          resetAll();
          setConfirm(null);
          toast.success("Dados restaurados.");
        }}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Stat({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "muted" | "success" | "info" | "warn";
}) {
  const valueClass = {
    muted: "text-ink",
    success: "text-success",
    info: "text-info",
    warn: "text-warn",
  }[tone];
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={cn("mt-1 font-display text-3xl leading-none font-semibold tabular-nums", valueClass)}>
        {value}
      </p>
    </div>
  );
}

function NeedCard({
  title,
  entry,
  empty,
}: {
  title: string;
  entry: { name: string; needed: number; avgNeeded: number | null } | null;
  empty: string;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]">
      <p className="text-xs font-medium text-muted">{title}</p>
      {entry ? (
        <>
          <p className="mt-1 font-display text-lg font-semibold text-ink">{entry.name}</p>
          <p className="mt-1 text-sm text-muted">
            Faltam <span className="font-semibold tabular-nums text-ink">{formatGrade(entry.needed)}</span>{" "}
            pontos
            {entry.avgNeeded !== null
              ? ` · média ${formatGrade(entry.avgNeeded)} por bimestre restante`
              : ""}
          </p>
        </>
      ) : (
        <p className="mt-1 text-sm text-muted">{empty}</p>
      )}
    </div>
  );
}
