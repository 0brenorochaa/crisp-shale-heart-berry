import {
  analyzeAll,
  bimesterLabel,
  formatGrade,
  formatValue,
  STATUS_LABEL,
  summarize,
  todayBR,
  type AppData,
} from "@/lib/grades";

function dash(value: string): string {
  return value.trim() ? value : "Não informado";
}

export async function generatePdfReport(data: AppData): Promise<void> {
  const [{ jsPDF }, autoTableMod] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
  const autoTable = autoTableMod.default;
  const rows = analyzeAll(data.subjects, data.meta, data.maxPerBimester);
  const stats = summarize(rows);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 12;

  doc.setFillColor(30, 79, 155);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("CÁLCULO DE PONTOS NECESSÁRIOS PARA APROVAÇÃO", pageWidth / 2, 12, {
    align: "center",
  });
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
    [
      `Série/Ano: ${dash(data.student.series)}`,
      `Turma: ${dash(data.student.className)}`,
    ],
    [`Ano letivo: ${dash(data.student.year)}`, `Data de geração: ${todayBR()}`],
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
    "Situação",
  ];

  const body = rows.map((row) => {
    const gradeCells = Array.from({ length: data.bimesters }, (_, i) =>
      formatValue(row.grades[i] ?? null) || "—",
    );
    const falta = row.excluded ? "—" : row.achieved ? "Meta atingida" : formatGrade(row.needed);
    const media = row.excluded || row.achieved || row.avgNeeded === null ? "—" : formatGrade(row.avgNeeded);
    return [
      row.name,
      ...gradeCells,
      row.excluded ? "—" : formatGrade(row.total),
      falta,
      media,
      STATUS_LABEL[row.status],
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
      textColor: [21, 32, 51],
      lineColor: [213, 222, 234],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [30, 79, 155],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 58, halign: "left", fontStyle: "bold" },
    },
    didParseCell: (hook) => {
      if (hook.section !== "body") return;
      const last = hook.table.columns.length - 1;
      if (hook.column.index !== last) return;
      const label = String(hook.cell.raw);
      if (label === STATUS_LABEL.achieved) hook.cell.styles.textColor = [21, 122, 75];
      if (label === STATUS_LABEL.attention) hook.cell.styles.textColor = [192, 86, 18];
      if (label === STATUS_LABEL.impossible) hook.cell.styles.textColor = [192, 53, 43];
      if (label === STATUS_LABEL.progress) hook.cell.styles.textColor = [29, 106, 165];
    },
    margin: { left: margin, right: margin },
  });

  const finalY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 40;
  let obsY = finalY + 10;
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
  const impossibleNames = rows
    .filter((row) => row.status === "impossible")
    .map((row) => row.name);
  const attentionNames = rows.filter((row) => row.status === "attention").map((row) => row.name);

  const notes: string[] = [
    `Foram consideradas ${stats.counted} matérias no cálculo (${stats.excluded} marcada${stats.excluded === 1 ? "" : "s"} como sem nota).`,
    `Meta de aprovação: ${formatGrade(data.meta)} pontos em ${data.bimesters} bimestres (máximo de ${formatGrade(data.maxPerBimester)} por bimestre).`,
    stats.achieved > 0
      ? `Matérias que já atingiram a meta (${stats.achieved}): ${achievedNames.join("; ") || "—"}.`
      : "Nenhuma matéria atingiu a meta ainda.",
    stats.progress > 0
      ? `${stats.progress} matéria${stats.progress === 1 ? "" : "s"} em andamento, com meta ainda alcançável.`
      : "Não há matérias em andamento com folga de pontos.",
    attentionNames.length
      ? `Precisam de atenção: ${attentionNames.join("; ")}.`
      : "Nenhuma matéria exige média alta nos bimestres restantes.",
    impossibleNames.length
      ? `Não é mais possível atingir a meta em: ${impossibleNames.join("; ")}.`
      : "Nenhuma matéria está com a meta impossível neste momento.",
  ];

  if (stats.highest) {
    notes.push(
      `Maior pontuação ainda necessária: ${stats.highest.name} (${formatGrade(stats.highest.needed)} pontos).`,
    );
  }
  if (stats.lowest && stats.lowest.name !== stats.highest?.name) {
    notes.push(
      `Menor pontuação ainda necessária: ${stats.lowest.name} (${formatGrade(stats.lowest.needed)} pontos).`,
    );
  }

  notes.push("Documento gerado neste aparelho. Nenhum dado foi enviado a servidores.");

  const wrapped = doc.splitTextToSize(notes.map((note) => `• ${note}`).join("\n"), pageWidth - margin * 2);
  doc.text(wrapped, margin, obsY);

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(92, 107, 126);
    doc.text(
      `Relatório de pontos para aprovação · página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" },
    );
  }

  const filename = `calculo-pontos-aprovacao-${data.student.year || todayBR().replaceAll("/", "-")}.pdf`;
  doc.save(filename);
}
