import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradeInput } from "@/components/grade-input";
import {
  bimesterLabel,
  formatGrade,
  STATUS_LABEL,
  type GradeValue,
  type Subject,
  type SubjectAnalysis,
} from "@/lib/grades";
import { cn } from "@/lib/utils";

interface SubjectListProps {
  subjects: Subject[];
  analyses: SubjectAnalysis[];
  bimesters: number;
  meta: number;
  focusId: string | null;
  onName: (id: string, name: string) => void;
  onGrade: (id: string, index: number, value: GradeValue) => void;
  onSemNota: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
}

function StatusBadge({ status }: { status: SubjectAnalysis["status"] }) {
  return <Badge tone={status}>{STATUS_LABEL[status]}</Badge>;
}

function ProgressBar({ total, meta, excluded }: { total: number; meta: number; excluded: boolean }) {
  const pct = excluded ? 0 : Math.min(100, Math.round((total / Math.max(meta, 0.1)) * 100));
  return (
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-200",
          pct >= 100 ? "bg-success" : "bg-primary",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SubjectList({
  subjects,
  analyses,
  bimesters,
  meta,
  focusId,
  onName,
  onGrade,
  onSemNota,
  onRemove,
}: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <div className="rounded-xl bg-surface px-6 py-12 text-center shadow-[var(--shadow-card)]">
        <p className="font-display text-lg text-ink">Nenhuma matéria cadastrada</p>
        <p className="mt-1 text-sm text-muted">Use “Adicionar matéria” para começar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 print:hidden lg:hidden">
        {subjects.map((subject, index) => {
          const row = analyses[index];
          if (!row) return null;
          return (
            <article
              key={subject.id}
              className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] print-break"
            >
              <div className="flex items-start gap-2">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Nome da matéria</span>
                  <span className="pointer-events-none absolute top-3 left-3 text-subtle">
                    <Pencil className="size-3.5" />
                  </span>
                  <input
                    defaultValue={subject.name}
                    key={`${subject.id}-${subject.name}`}
                    autoFocus={focusId === subject.id}
                    onBlur={(event) => onName(subject.id, event.target.value.trim() || subject.name)}
                    className="h-11 w-full rounded-md bg-surface-2 pr-3 pl-9 text-base font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remover ${subject.name}`}
                  onClick={() => onRemove(subject.id)}
                >
                  <Trash2 />
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-pressed={subject.semNota}
                  onClick={() => onSemNota(subject.id, !subject.semNota)}
                  className={cn(
                    "inline-flex h-11 items-center rounded-md px-3 text-xs font-semibold",
                    subject.semNota
                      ? "bg-surface-2 text-muted"
                      : "bg-primary-soft text-primary",
                  )}
                >
                  {subject.semNota ? "Sem nota (SN)" : "Participa do cálculo"}
                </button>
                <StatusBadge status={row.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {Array.from({ length: bimesters }, (_, i) => (
                  <div key={i}>
                    <p className="mb-1 text-xs font-medium text-muted">{bimesterLabel(i)} bimestre</p>
                    <GradeInput
                      value={subject.grades[i] ?? null}
                      disabled={subject.semNota}
                      label={`${subject.name}, ${bimesterLabel(i)} bimestre`}
                      onChange={(value) => onGrade(subject.id, i, value)}
                    />
                  </div>
                ))}
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">Total</dt>
                  <dd className="font-semibold tabular-nums text-ink">
                    {row.excluded ? "—" : formatGrade(row.total)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Falta</dt>
                  <dd className="font-semibold tabular-nums text-ink">
                    {row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed)}
                  </dd>
                </div>
              </dl>
              <p className="mt-2 text-sm text-muted">{row.message}</p>
              <ProgressBar total={row.total} meta={meta} excluded={row.excluded} />
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-card)] lg:block print:block">
        <table className="w-full min-w-table border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold tracking-wide text-muted uppercase">
              <th className="sticky left-0 z-10 bg-surface-2 px-4 py-3">Matéria</th>
              {Array.from({ length: bimesters }, (_, i) => (
                <th key={i} className="px-3 py-3 text-center">
                  {bimesterLabel(i)} bimestre
                </th>
              ))}
              <th className="px-3 py-3 text-center">Total</th>
              <th className="px-3 py-3 text-center">Falta</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-2 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const row = analyses[index];
              if (!row) return null;
              return (
                <tr key={subject.id} className="border-b border-line last:border-b-0">
                  <th className="sticky left-0 z-10 min-w-56 bg-surface px-4 py-3 text-left font-medium">
                    <input
                      defaultValue={subject.name}
                      key={`${subject.id}-${subject.name}`}
                      autoFocus={focusId === subject.id}
                      onBlur={(event) =>
                        onName(subject.id, event.target.value.trim() || subject.name)
                      }
                      className="h-11 w-full rounded-md bg-transparent px-2 text-sm font-medium text-ink outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                    <button
                      type="button"
                      aria-pressed={subject.semNota}
                      onClick={() => onSemNota(subject.id, !subject.semNota)}
                      className={cn(
                        "mt-1 ml-2 inline-flex h-8 items-center rounded-md px-2 text-[11px] font-semibold",
                        subject.semNota ? "bg-surface-2 text-muted" : "text-primary hover:bg-primary-soft",
                      )}
                    >
                      {subject.semNota ? "Sem nota (SN)" : "Marcar SN"}
                    </button>
                  </th>
                  {Array.from({ length: bimesters }, (_, i) => (
                    <td key={i} className="px-3 py-3 align-middle">
                      <GradeInput
                        stacked
                        value={subject.grades[i] ?? null}
                        disabled={subject.semNota}
                        label={`${subject.name}, ${bimesterLabel(i)} bimestre`}
                        onChange={(value) => onGrade(subject.id, i, value)}
                      />
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center font-semibold tabular-nums">
                    {row.excluded ? "—" : formatGrade(row.total)}
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums">
                    {row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed)}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={row.status} />
                    <p className="mt-1 max-w-52 text-xs leading-snug text-muted">{row.message}</p>
                  </td>
                  <td className="px-2 py-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remover ${subject.name}`}
                      onClick={() => onRemove(subject.id)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
