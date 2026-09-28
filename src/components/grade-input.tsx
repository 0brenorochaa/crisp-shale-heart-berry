import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatValue, parseGrade, type GradeValue } from "@/lib/grades";

interface GradeInputProps {
  value: GradeValue;
  disabled?: boolean;
  label: string;
  onChange: (value: GradeValue) => void;
  stacked?: boolean;
}

export function GradeInput({ value, disabled, label, onChange, stacked }: GradeInputProps) {
  const [text, setText] = useState(formatValue(value));
  const [focused, setFocused] = useState(false);
  const isSN = value === "SN";

  useEffect(() => {
    if (!focused) setText(formatValue(value));
  }, [value, focused]);

  function commit(raw: string) {
    const parsed = parseGrade(raw);
    if (!parsed.ok) {
      setText(formatValue(value));
      return;
    }
    onChange(parsed.value);
    setText(formatValue(parsed.value));
  }

  return (
    <div className={cn("flex gap-1", stacked ? "flex-col items-stretch" : "items-center")}>
      <input
        aria-label={label}
        disabled={disabled}
        inputMode="decimal"
        enterKeyHint="done"
        autoComplete="off"
        spellCheck={false}
        value={isSN && !focused ? "SN" : text}
        placeholder="—"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          commit(text);
        }}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") (event.target as HTMLInputElement).blur();
        }}
        className={cn(
          "h-11 min-h-11 w-full min-w-16 rounded-md bg-surface px-2 text-center text-base tabular-nums text-ink shadow-[var(--shadow-card)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-surface-2 disabled:text-muted",
          isSN && "text-muted",
        )}
      />
      <button
        type="button"
        disabled={disabled}
        aria-pressed={isSN}
        aria-label={`${label}: sem nota`}
        onClick={() => onChange(isSN ? null : "SN")}
        className={cn(
          "relative inline-flex h-11 min-h-11 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold tracking-wide transition-colors duration-150",
          stacked ? "w-full" : "min-w-11",
          isSN
            ? "bg-surface-2 text-muted"
            : "bg-surface text-subtle shadow-[var(--shadow-card)] hover:text-ink",
        )}
      >
        SN
      </button>
    </div>
  );
}
