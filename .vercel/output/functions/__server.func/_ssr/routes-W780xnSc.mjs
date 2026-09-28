import { o as __toESM } from "../_runtime.mjs";
import { a as Overlay2, c as Title2, d as require_jsx_runtime, f as require_react, i as Description2, l as Slot, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Printer, c as FileDown, d as BookOpen, i as RotateCcw, l as Eraser, n as Trash2, o as Plus, r as ShieldCheck, s as Pencil, u as Calculator } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-W780xnSc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] touch-manipulation [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover",
			secondary: "bg-primary-soft text-primary hover:bg-surface-2",
			outline: "bg-surface text-ink shadow-[var(--shadow-card)] hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-ink",
			danger: "bg-danger text-primary-fg hover:opacity-90",
			success: "bg-success text-primary-fg hover:opacity-90"
		},
		size: {
			default: "h-11 min-h-11 px-4",
			sm: "h-9 min-h-9 px-3 text-xs",
			lg: "h-12 min-h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function ConfirmDialog({ open, title, description, confirmLabel, danger, onOpenChange, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
			className: "fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
					className: "font-display text-xl font-semibold text-ink",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
					className: "mt-2 text-sm leading-normal text-muted",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							children: "Cancelar"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: danger ? "danger" : "default",
							onClick: onConfirm,
							children: confirmLabel
						})
					})]
				})
			]
		})] })
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full min-w-0 rounded-md bg-surface px-3 text-base text-ink shadow-[var(--shadow-card)] outline-none transition-[box-shadow] duration-(--motion-quick) placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-surface-2 disabled:text-muted", className),
		...props
	});
}
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none", {
	variants: { tone: {
		achieved: "bg-success-soft text-success",
		progress: "bg-info-soft text-info",
		attention: "bg-warn-soft text-warn",
		impossible: "bg-danger-soft text-danger",
		excluded: "bg-surface-2 text-muted"
	} },
	defaultVariants: { tone: "progress" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var STORAGE_KEY = "calculadora-pontos-v1";
var STATUS_LABEL = {
	achieved: "Meta atingida",
	progress: "Em andamento",
	attention: "Precisa de atenção",
	impossible: "Meta impossível",
	excluded: "Sem nota"
};
function round1(n) {
	return Math.round(n * 10) / 10;
}
function formatGrade(n) {
	return round1(n).toFixed(1).replace(".", ",");
}
function formatValue(value) {
	if (value === null) return "";
	if (value === "SN") return "SN";
	return formatGrade(value);
}
function parseGrade(raw) {
	const t = raw.trim().toUpperCase();
	if (t === "") return {
		ok: true,
		value: null
	};
	const compact = t.replace(/\s+/g, "");
	if (compact === "SN" || compact === "S.N." || compact === "S.N" || compact === "SEMNOTA" || compact === "SEM-NOTA") return {
		ok: true,
		value: "SN"
	};
	const normalized = compact.replace(",", ".");
	if (!/^-?\d+(\.\d+)?$/.test(normalized)) return { ok: false };
	const n = Number(normalized);
	if (!Number.isFinite(n)) return { ok: false };
	return {
		ok: true,
		value: round1(Math.min(10, Math.max(0, n)))
	};
}
function emptyGrades(count) {
	return Array.from({ length: count }, () => null);
}
function resizeGrades(grades, count) {
	if (grades.length === count) return grades;
	if (grades.length > count) return grades.slice(0, count);
	return [...grades, ...emptyGrades(count - grades.length)];
}
function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function createDefaultData() {
	const bimesters = 4;
	return {
		meta: 24,
		bimesters,
		maxPerBimester: 10,
		student: {
			name: "",
			school: "",
			series: "",
			className: "",
			year: String((/* @__PURE__ */ new Date()).getFullYear())
		},
		subjects: [
			{
				name: "Língua Portuguesa e suas Literaturas",
				grades: [10, 7]
			},
			{
				name: "Educação Física",
				grades: [7.5, 7]
			},
			{
				name: "Artes",
				grades: [10, 6]
			},
			{
				name: "Língua Inglesa",
				grades: [8, 7.5]
			},
			{
				name: "Matemática",
				grades: [7, 8]
			},
			{
				name: "Química",
				grades: [7, 6]
			},
			{
				name: "Física",
				grades: [7.5, 6.5]
			},
			{
				name: "Biologia",
				grades: [9.5, 6.5]
			},
			{
				name: "História",
				grades: [8.5, 8.5]
			},
			{
				name: "Geografia",
				grades: [10, 10]
			},
			{
				name: "Filosofia",
				grades: [10, 9]
			},
			{
				name: "Sociologia",
				grades: [7, 8.5]
			},
			{
				name: "Temas de Aprofundamento Curricular (TAC)",
				grades: [6, 8]
			},
			{
				name: "Práticas de Integração com o Território (PIT)",
				grades: [8.5, 9]
			},
			{
				name: "Projeto de Vida",
				grades: ["SN", "SN"],
				semNota: true
			}
		].map((item, index) => ({
			id: `sub-${index + 1}`,
			name: item.name,
			grades: resizeGrades(item.grades, bimesters),
			semNota: Boolean(item.semNota)
		}))
	};
}
function buildMessage(analysis, meta) {
	if (analysis.excluded) return "Matéria sem nota — não entra no cálculo.";
	if (analysis.achieved) return "Meta atingida";
	if (!analysis.possible) return `Não é mais possível atingir a meta de ${formatGrade(meta)} pontos.`;
	if (analysis.remaining === 1) return `Você precisa tirar ${formatGrade(analysis.needed)} no último bimestre.`;
	return `Pontos necessários nos bimestres restantes: ${formatGrade(analysis.needed)}. Média necessária: ${formatGrade(analysis.avgNeeded ?? 0)}.`;
}
function analyzeSubject(subject, meta, maxPer) {
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
			status: "excluded",
			grades: subject.grades,
			filledCount: 0,
			message: ""
		};
		return {
			...base,
			message: buildMessage(base, meta)
		};
	}
	const total = round1(subject.grades.reduce((sum, grade) => sum + (typeof grade === "number" ? grade : 0), 0));
	const remaining = subject.grades.filter((grade) => grade === null).length;
	const filledCount = subject.grades.filter((grade) => typeof grade === "number").length;
	const needed = round1(Math.max(0, meta - total));
	const maxRemaining = round1(remaining * maxPer);
	const achieved = total + 1e-9 >= meta;
	const possible = achieved || needed <= maxRemaining + 1e-9;
	const avgNeeded = remaining > 0 ? round1(needed / remaining) : null;
	let status;
	if (achieved) status = "achieved";
	else if (!possible) status = "impossible";
	else if (avgNeeded !== null && avgNeeded >= 7) status = "attention";
	else status = "progress";
	const partial = {
		excluded: false,
		achieved,
		possible,
		remaining,
		needed,
		avgNeeded
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
		message: buildMessage(partial, meta)
	};
}
function analyzeAll(subjects, meta, maxPer) {
	return subjects.map((subject) => analyzeSubject(subject, meta, maxPer));
}
function summarize(rows) {
	const counted = rows.filter((row) => !row.excluded);
	const pending = counted.filter((row) => !row.achieved);
	let highest = null;
	let lowest = null;
	for (const row of pending) {
		const entry = {
			name: row.name,
			needed: row.needed,
			avgNeeded: row.avgNeeded
		};
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
		lowest
	};
}
function bimesterLabel(index) {
	return `${index + 1}º`;
}
function todayBR() {
	return (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR");
}
function normalizeData(data) {
	const bimesters = Math.min(6, Math.max(1, Math.round(data.bimesters) || 4));
	const metaRaw = Number(data.meta);
	return {
		meta: Number.isFinite(metaRaw) ? round1(Math.max(0, metaRaw)) : 24,
		bimesters,
		maxPerBimester: 10,
		student: {
			name: data.student?.name ?? "",
			school: data.student?.school ?? "",
			series: data.student?.series ?? "",
			className: data.student?.className ?? "",
			year: data.student?.year ?? String((/* @__PURE__ */ new Date()).getFullYear())
		},
		subjects: (data.subjects ?? []).map((subject) => ({
			id: subject.id || newId(),
			name: subject.name || "Nova matéria",
			grades: resizeGrades(Array.isArray(subject.grades) ? subject.grades : [], bimesters),
			semNota: Boolean(subject.semNota)
		}))
	};
}
function GradeInput({ value, disabled, label, onChange, stacked }) {
	const [text, setText] = (0, import_react.useState)(formatValue(value));
	const [focused, setFocused] = (0, import_react.useState)(false);
	const isSN = value === "SN";
	(0, import_react.useEffect)(() => {
		if (!focused) setText(formatValue(value));
	}, [value, focused]);
	function commit(raw) {
		const parsed = parseGrade(raw);
		if (!parsed.ok) {
			setText(formatValue(value));
			return;
		}
		onChange(parsed.value);
		setText(formatValue(parsed.value));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex gap-1", stacked ? "flex-col items-stretch" : "items-center"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			"aria-label": label,
			disabled,
			inputMode: "decimal",
			enterKeyHint: "done",
			autoComplete: "off",
			spellCheck: false,
			value: isSN && !focused ? "SN" : text,
			placeholder: "—",
			onFocus: () => setFocused(true),
			onBlur: () => {
				setFocused(false);
				commit(text);
			},
			onChange: (event) => setText(event.target.value),
			onKeyDown: (event) => {
				if (event.key === "Enter") event.target.blur();
			},
			className: cn("h-11 min-h-11 w-full min-w-16 rounded-md bg-surface px-2 text-center text-base tabular-nums text-ink shadow-[var(--shadow-card)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-surface-2 disabled:text-muted", isSN && "text-muted")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled,
			"aria-pressed": isSN,
			"aria-label": `${label}: sem nota`,
			onClick: () => onChange(isSN ? null : "SN"),
			className: cn("relative inline-flex h-11 min-h-11 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold tracking-wide transition-colors duration-150", stacked ? "w-full" : "min-w-11", isSN ? "bg-surface-2 text-muted" : "bg-surface text-subtle shadow-[var(--shadow-card)] hover:text-ink"),
			children: "SN"
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status,
		children: STATUS_LABEL[status]
	});
}
function ProgressBar({ total, meta, excluded }) {
	const pct = excluded ? 0 : Math.min(100, Math.round(total / Math.max(meta, .1) * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-200", pct >= 100 ? "bg-success" : "bg-primary"),
			style: { width: `${pct}%` }
		})
	});
}
function SubjectList({ subjects, analyses, bimesters, meta, focusId, onName, onGrade, onSemNota, onRemove }) {
	if (subjects.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-6 py-12 text-center shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg text-ink",
			children: "Nenhuma matéria cadastrada"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Use “Adicionar matéria” para começar."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 print:hidden lg:hidden",
		children: subjects.map((subject, index) => {
			const row = analyses[index];
			if (!row) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] print-break",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Nome da matéria"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none absolute top-3 left-3 text-subtle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									defaultValue: subject.name,
									autoFocus: focusId === subject.id,
									onBlur: (event) => onName(subject.id, event.target.value.trim() || subject.name),
									className: "h-11 w-full rounded-md bg-surface-2 pr-3 pl-9 text-base font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
								}, `${subject.id}-${subject.name}`)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": `Remover ${subject.name}`,
							onClick: () => onRemove(subject.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": subject.semNota,
							onClick: () => onSemNota(subject.id, !subject.semNota),
							className: cn("inline-flex h-11 items-center rounded-md px-3 text-xs font-semibold", subject.semNota ? "bg-surface-2 text-muted" : "bg-primary-soft text-primary"),
							children: subject.semNota ? "Sem nota (SN)" : "Participa do cálculo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: Array.from({ length: bimesters }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-1 text-xs font-medium text-muted",
							children: [bimesterLabel(i), " bimestre"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeInput, {
							value: subject.grades[i] ?? null,
							disabled: subject.semNota,
							label: `${subject.name}, ${bimesterLabel(i)} bimestre`,
							onChange: (value) => onGrade(subject.id, i, value)
						})] }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums text-ink",
							children: row.excluded ? "—" : formatGrade(row.total)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Falta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums text-ink",
							children: row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: row.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						total: row.total,
						meta,
						excluded: row.excluded
					})
				]
			}, subject.id);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-card)] lg:block print:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-table border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line bg-surface-2 text-left text-xs font-semibold tracking-wide text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "sticky left-0 z-10 bg-surface-2 px-4 py-3",
						children: "Matéria"
					}),
					Array.from({ length: bimesters }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						className: "px-3 py-3 text-center",
						children: [bimesterLabel(i), " bimestre"]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 text-center",
						children: "Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 text-center",
						children: "Falta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Ações"
						})
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: subjects.map((subject, index) => {
				const row = analyses[index];
				if (!row) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "sticky left-0 z-10 min-w-56 bg-surface px-4 py-3 text-left font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								defaultValue: subject.name,
								autoFocus: focusId === subject.id,
								onBlur: (event) => onName(subject.id, event.target.value.trim() || subject.name),
								className: "h-11 w-full rounded-md bg-transparent px-2 text-sm font-medium text-ink outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-primary/40"
							}, `${subject.id}-${subject.name}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": subject.semNota,
								onClick: () => onSemNota(subject.id, !subject.semNota),
								className: cn("mt-1 ml-2 inline-flex h-8 items-center rounded-md px-2 text-[11px] font-semibold", subject.semNota ? "bg-surface-2 text-muted" : "text-primary hover:bg-primary-soft"),
								children: subject.semNota ? "Sem nota (SN)" : "Marcar SN"
							})]
						}),
						Array.from({ length: bimesters }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 align-middle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeInput, {
								stacked: true,
								value: subject.grades[i] ?? null,
								disabled: subject.semNota,
								label: `${subject.name}, ${bimesterLabel(i)} bimestre`,
								onChange: (value) => onGrade(subject.id, i, value)
							})
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-center font-semibold tabular-nums",
							children: row.excluded ? "—" : formatGrade(row.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-center tabular-nums",
							children: row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-52 text-xs leading-snug text-muted",
								children: row.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": `Remover ${subject.name}`,
								onClick: () => onRemove(subject.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						})
					]
				}, subject.id);
			}) })]
		})
	})] });
}
function dash(value) {
	return value.trim() ? value : "Não informado";
}
async function generatePdfReport(data) {
	const [{ jsPDF }, autoTableMod] = await Promise.all([import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())), import("../_libs/jspdf-autotable.mjs").then((n) => n.t)]);
	const autoTable = autoTableMod.default;
	const rows = analyzeAll(data.subjects, data.meta, data.maxPerBimester);
	const stats = summarize(rows);
	const doc = new jsPDF({
		orientation: "landscape",
		unit: "mm",
		format: "a4"
	});
	const pageWidth = doc.internal.pageSize.getWidth();
	const margin = 12;
	doc.setFillColor(30, 79, 155);
	doc.rect(0, 0, pageWidth, 28, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("times", "bold");
	doc.setFontSize(16);
	doc.text("CÁLCULO DE PONTOS NECESSÁRIOS PARA APROVAÇÃO", pageWidth / 2, 12, { align: "center" });
	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.text("Controle de Notas – Ano Letivo", pageWidth / 2, 21, { align: "center" });
	doc.setTextColor(21, 32, 51);
	let y = 38;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(11);
	doc.text("IDENTIFICAÇÃO", margin, y);
	y += 6;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	const identity = [
		[`Nome do estudante: ${dash(data.student.name)}`, `Escola: ${dash(data.student.school)}`],
		[`Série/Ano: ${dash(data.student.series)}`, `Turma: ${dash(data.student.className)}`],
		[`Ano letivo: ${dash(data.student.year)}`, `Data de geração: ${todayBR()}`]
	];
	for (const line of identity) {
		doc.text(line[0], margin, y);
		doc.text(line[1], pageWidth / 2, y);
		y += 6;
	}
	y += 2;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(11);
	doc.text("CRITÉRIO DE APROVAÇÃO", margin, y);
	y += 6;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(`Meta de aprovação: ${formatGrade(data.meta)} pontos`, margin, y);
	doc.text(`Número de bimestres: ${data.bimesters}`, pageWidth / 2, y);
	y += 6;
	doc.text(`Máximo por bimestre: ${formatGrade(data.maxPerBimester)} pontos`, margin, y);
	y += 4;
	const head = [
		"Componente Curricular",
		...Array.from({ length: data.bimesters }, (_, i) => `${bimesterLabel(i)} Bim.`),
		"Total Atual",
		"Pontos que Faltam",
		"Média Necessária",
		"Situação"
	];
	const body = rows.map((row) => {
		const gradeCells = Array.from({ length: data.bimesters }, (_, i) => formatValue(row.grades[i] ?? null) || "—");
		const falta = row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed);
		const media = row.excluded || row.achieved || row.avgNeeded === null ? "—" : formatGrade(row.avgNeeded);
		return [
			row.name,
			...gradeCells,
			row.excluded ? "—" : formatGrade(row.total),
			falta,
			media,
			STATUS_LABEL[row.status]
		];
	});
	autoTable(doc, {
		startY: y,
		head: [head],
		body,
		theme: "grid",
		styles: {
			font: "helvetica",
			fontSize: 8,
			cellPadding: 1.6,
			valign: "middle",
			textColor: [
				21,
				32,
				51
			],
			lineColor: [
				213,
				222,
				234
			],
			lineWidth: .2
		},
		headStyles: {
			fillColor: [
				30,
				79,
				155
			],
			textColor: 255,
			fontStyle: "bold",
			halign: "center"
		},
		columnStyles: { 0: {
			cellWidth: 58,
			halign: "left",
			fontStyle: "bold"
		} },
		didParseCell: (hook) => {
			if (hook.section !== "body") return;
			const last = hook.table.columns.length - 1;
			if (hook.column.index !== last) return;
			const label = String(hook.cell.raw);
			if (label === STATUS_LABEL.achieved) hook.cell.styles.textColor = [
				21,
				122,
				75
			];
			if (label === STATUS_LABEL.attention) hook.cell.styles.textColor = [
				192,
				86,
				18
			];
			if (label === STATUS_LABEL.impossible) hook.cell.styles.textColor = [
				192,
				53,
				43
			];
			if (label === STATUS_LABEL.progress) hook.cell.styles.textColor = [
				29,
				106,
				165
			];
		},
		margin: {
			left: margin,
			right: margin
		}
	});
	let obsY = (doc.lastAutoTable?.finalY ?? y + 40) + 10;
	if (obsY > 180) {
		doc.addPage();
		obsY = 20;
	}
	doc.setFont("helvetica", "bold");
	doc.setFontSize(11);
	doc.setTextColor(21, 32, 51);
	doc.text("OBSERVAÇÕES", margin, obsY);
	obsY += 7;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	const achievedNames = rows.filter((row) => row.status === "achieved").map((row) => row.name);
	const impossibleNames = rows.filter((row) => row.status === "impossible").map((row) => row.name);
	const attentionNames = rows.filter((row) => row.status === "attention").map((row) => row.name);
	const notes = [
		`Foram consideradas ${stats.counted} matérias no cálculo (${stats.excluded} marcada${stats.excluded === 1 ? "" : "s"} como sem nota).`,
		`Meta de aprovação: ${formatGrade(data.meta)} pontos em ${data.bimesters} bimestres (máximo de ${formatGrade(data.maxPerBimester)} por bimestre).`,
		stats.achieved > 0 ? `Matérias que já atingiram a meta (${stats.achieved}): ${achievedNames.join("; ") || "—"}.` : "Nenhuma matéria atingiu a meta ainda.",
		stats.progress > 0 ? `${stats.progress} matéria${stats.progress === 1 ? "" : "s"} em andamento, com meta ainda alcançável.` : "Não há matérias em andamento com folga de pontos.",
		attentionNames.length ? `Precisam de atenção: ${attentionNames.join("; ")}.` : "Nenhuma matéria exige média alta nos bimestres restantes.",
		impossibleNames.length ? `Não é mais possível atingir a meta em: ${impossibleNames.join("; ")}.` : "Nenhuma matéria está com a meta impossível neste momento."
	];
	if (stats.highest) notes.push(`Maior pontuação ainda necessária: ${stats.highest.name} (${formatGrade(stats.highest.needed)} pontos).`);
	if (stats.lowest && stats.lowest.name !== stats.highest?.name) notes.push(`Menor pontuação ainda necessária: ${stats.lowest.name} (${formatGrade(stats.lowest.needed)} pontos).`);
	notes.push("Documento gerado neste aparelho. Nenhum dado foi enviado a servidores.");
	const wrapped = doc.splitTextToSize(notes.map((note) => `• ${note}`).join("\n"), pageWidth - 24);
	doc.text(wrapped, margin, obsY);
	const pageCount = doc.getNumberOfPages();
	for (let i = 1; i <= pageCount; i += 1) {
		doc.setPage(i);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.setTextColor(92, 107, 126);
		doc.text(`Relatório de pontos para aprovação · página ${i} de ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 8, { align: "center" });
	}
	const filename = `calculo-pontos-aprovacao-${data.student.year || todayBR().replaceAll("/", "-")}.pdf`;
	doc.save(filename);
}
var useGradeStore = create()(persist((set, get) => ({
	...createDefaultData(),
	setMeta: (meta) => set({ meta }),
	setBimesters: (count) => {
		const bimesters = Math.min(6, Math.max(1, Math.round(count)));
		set({
			bimesters,
			subjects: get().subjects.map((subject) => ({
				...subject,
				grades: resizeGrades(subject.grades, bimesters)
			}))
		});
	},
	setStudent: (patch) => set({ student: {
		...get().student,
		...patch
	} }),
	setSubjectName: (id, name) => set({ subjects: get().subjects.map((subject) => subject.id === id ? {
		...subject,
		name
	} : subject) }),
	setGrade: (id, index, value) => set({ subjects: get().subjects.map((subject) => {
		if (subject.id !== id) return subject;
		const grades = [...subject.grades];
		grades[index] = value;
		return {
			...subject,
			grades
		};
	}) }),
	setSemNota: (id, semNota) => set({ subjects: get().subjects.map((subject) => subject.id === id ? {
		...subject,
		semNota
	} : subject) }),
	addSubject: () => {
		const id = newId();
		set({ subjects: [...get().subjects, {
			id,
			name: "Nova matéria",
			grades: emptyGrades(get().bimesters),
			semNota: false
		}] });
		return id;
	},
	removeSubject: (id) => set({ subjects: get().subjects.filter((subject) => subject.id !== id) }),
	clearGrades: () => set({ subjects: get().subjects.map((subject) => ({
		...subject,
		grades: emptyGrades(get().bimesters)
	})) }),
	resetAll: () => set(createDefaultData())
}), {
	name: STORAGE_KEY,
	partialize: (state) => ({
		meta: state.meta,
		bimesters: state.bimesters,
		maxPerBimester: state.maxPerBimester,
		student: state.student,
		subjects: state.subjects
	}),
	merge: (persisted, current) => {
		const raw = persisted ?? {};
		const normalized = normalizeData({
			meta: raw.meta ?? current.meta,
			bimesters: raw.bimesters ?? current.bimesters,
			maxPerBimester: raw.maxPerBimester ?? current.maxPerBimester,
			student: raw.student ?? current.student,
			subjects: raw.subjects ?? current.subjects
		});
		return {
			...current,
			...normalized
		};
	}
}));
var STATUS_DOT = {
	achieved: "bg-success",
	progress: "bg-info",
	attention: "bg-warn",
	impossible: "bg-danger",
	excluded: "bg-subtle"
};
function CalculatorApp() {
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
	const [metaText, setMetaText] = (0, import_react.useState)(String(meta).replace(".", ","));
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [focusId, setFocusId] = (0, import_react.useState)(null);
	const [pdfBusy, setPdfBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMetaText(String(meta).replace(".", ","));
	}, [meta]);
	const analyses = (0, import_react.useMemo)(() => analyzeAll(subjects, meta, maxPerBimester), [
		subjects,
		meta,
		maxPerBimester
	]);
	const stats = (0, import_react.useMemo)(() => summarize(analyses), [analyses]);
	function commitMeta(raw) {
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
		document.getElementById("resumo")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true,
				closeButton: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line bg-primary text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-start gap-3 px-4 py-6 sm:py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 hidden rounded-md bg-primary-fg/10 p-2 sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold tracking-[0.18em] text-primary-fg/70 uppercase",
							children: ["Ano letivo ", student.year || (/* @__PURE__ */ new Date()).getFullYear()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl",
							children: "Calculadora de Pontos para Aprovação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-2xl text-sm text-primary-fg/80",
							children: [
								"Meta de aprovação: ",
								formatGrade(meta),
								" pontos · ",
								bimesters,
								" bimestres · máximo",
								" ",
								formatGrade(maxPerBimester),
								" por bimestre"
							]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "min-w-40 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-xs font-medium text-muted",
										children: "Meta de aprovação (pontos)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "decimal",
										value: metaText,
										onChange: (event) => setMetaText(event.target.value),
										onBlur: () => commitMeta(metaText),
										"aria-label": "Meta de aprovação"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "w-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-xs font-medium text-muted",
										children: "Bimestres"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": "Número de bimestres",
										value: bimesters,
										onChange: (event) => setBimesters(Number(event.target.value)),
										className: "h-11 w-full rounded-md bg-surface px-3 text-base text-ink shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
										children: [
											1,
											2,
											3,
											4,
											5,
											6
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: n,
											children: n
										}, n))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Nome do estudante",
										value: student.name,
										onChange: (value) => setStudent({ name: value })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Escola",
										value: student.school,
										onChange: (value) => setStudent({ school: value })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Série/Ano",
										value: student.series,
										onChange: (value) => setStudent({ series: value })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Turma",
										value: student.className,
										onChange: (value) => setStudent({ className: value })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 max-w-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Ano letivo",
									value: student.year,
									onChange: (value) => setStudent({ year: value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => {
									const id = addSubject();
									setFocusId(id);
									toast.success("Matéria adicionada.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Adicionar matéria"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setConfirm("clear"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Limpar notas"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: handleCalculate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {}), "Calcular"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "success",
								disabled: pdfBusy,
								onClick: () => void handlePdf(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {}), pdfBusy ? "Gerando…" : "Gerar PDF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Imprimir"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "resumo",
						className: "mt-6 scroll-mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-semibold text-ink",
									children: "Resumo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Matérias cadastradas",
										value: String(stats.registered)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Matérias com meta atingida",
										value: String(stats.achieved),
										tone: "success"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Matérias em andamento",
										value: String(stats.progress),
										tone: "info"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Matérias que precisam de atenção",
										value: String(stats.needsAttention),
										tone: stats.needsAttention ? "warn" : "muted"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 lg:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedCard, {
									title: "Maior pontuação necessária",
									entry: stats.highest,
									empty: "Nenhuma matéria pendente."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedCard, {
									title: "Menor pontuação necessária",
									entry: stats.lowest,
									empty: "Nenhuma matéria pendente."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-ink",
								children: "Notas por matéria"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-xs text-muted sm:block",
								children: "Toque no nome para editar. Digite SN ou use o botão para sem nota."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectList, {
							subjects,
							analyses,
							bimesters,
							meta,
							focusId,
							onName: setSubjectName,
							onGrade: setGrade,
							onSemNota: setSemNota,
							onRemove: (id) => {
								removeSubject(id);
								toast.success("Matéria removida.");
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-ink",
							children: "Legenda de status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								"achieved",
								"progress",
								"attention",
								"impossible"
							].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", STATUS_DOT[status]) }), STATUS_LABEL[status]]
							}, status))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-success" }), "Tudo fica neste aparelho. As notas são salvas automaticamente e nenhum dado é enviado."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setConfirm("reset"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Apagar todos os dados"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm === "clear",
				onOpenChange: (open) => !open && setConfirm(null),
				title: "Limpar todas as notas?",
				description: "As matérias continuam cadastradas, mas todos os bimestres voltam a ficar vazios.",
				confirmLabel: "Limpar notas",
				danger: true,
				onConfirm: () => {
					clearGrades();
					setConfirm(null);
					toast.success("Notas apagadas.");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm === "reset",
				onOpenChange: (open) => !open && setConfirm(null),
				title: "Apagar todos os dados?",
				description: "Isso restaura as matérias iniciais de demonstração e limpa os dados do estudante neste aparelho.",
				confirmLabel: "Apagar dados",
				danger: true,
				onConfirm: () => {
					resetAll();
					setConfirm(null);
					toast.success("Dados restaurados.");
				}
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1 block text-xs font-medium text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value,
		onChange: (event) => onChange(event.target.value)
	})] });
}
function Stat({ label, value, tone = "muted" }) {
	const valueClass = {
		muted: "text-ink",
		success: "text-success",
		info: "text-info",
		warn: "text-warn"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 font-display text-3xl leading-none font-semibold tabular-nums", valueClass),
			children: value
		})]
	});
}
function NeedCard({ title, entry, empty }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: title
		}), entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-lg font-semibold text-ink",
			children: entry.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				"Faltam ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold tabular-nums text-ink",
					children: formatGrade(entry.needed)
				}),
				" ",
				"pontos",
				entry.avgNeeded !== null ? ` · média ${formatGrade(entry.avgNeeded)} por bimestre restante` : ""
			]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: empty
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorApp, {});
}
//#endregion
export { Home as component };
