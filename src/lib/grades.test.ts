import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  analyzeSubject,
  createDefaultData,
  formatGrade,
  parseGrade,
  summarize,
  type Subject,
} from "./grades.ts";

function subject(partial: Partial<Subject> & { grades: Subject["grades"] }): Subject {
  return {
    id: "t",
    name: "Teste",
    semNota: false,
    ...partial,
  };
}

describe("parseGrade", () => {
  it("accepts comma and dot", () => {
    assert.deepEqual(parseGrade("7,0"), { ok: true, value: 7 });
    assert.deepEqual(parseGrade("7.5"), { ok: true, value: 7.5 });
    assert.deepEqual(parseGrade("10"), { ok: true, value: 10 });
    assert.deepEqual(parseGrade("0"), { ok: true, value: 0 });
  });

  it("clamps to 0–10", () => {
    assert.deepEqual(parseGrade("11"), { ok: true, value: 10 });
    assert.deepEqual(parseGrade("-1"), { ok: true, value: 0 });
  });

  it("parses SN and empty", () => {
    assert.deepEqual(parseGrade("SN"), { ok: true, value: "SN" });
    assert.deepEqual(parseGrade("  "), { ok: true, value: null });
  });
});

describe("analyzeSubject cases", () => {
  it("1. matéria com nenhuma nota", () => {
    const row = analyzeSubject(subject({ grades: [null, null, null, null] }), 24, 10);
    assert.equal(row.total, 0);
    assert.equal(row.remaining, 4);
    assert.equal(row.needed, 24);
    assert.equal(row.avgNeeded, 6);
    assert.equal(row.status, "progress");
    assert.equal(row.possible, true);
  });

  it("2. apenas 1º e 2º bimestres", () => {
    const row = analyzeSubject(subject({ grades: [7, 8, null, null] }), 24, 10);
    assert.equal(row.total, 15);
    assert.equal(row.needed, 9);
    assert.equal(row.remaining, 2);
    assert.equal(row.avgNeeded, 4.5);
    assert.equal(row.status, "progress");
  });

  it("3. 3º bimestre preenchido recalcula o 4º", () => {
    const row = analyzeSubject(subject({ grades: [7, 8, 5, null] }), 24, 10);
    assert.equal(row.total, 20);
    assert.equal(row.needed, 4);
    assert.equal(row.remaining, 1);
    assert.equal(row.avgNeeded, 4);
    assert.match(row.message, /4,0/);
  });

  it("4. 24 pontos ou mais", () => {
    const row = analyzeSubject(subject({ grades: [10, 10, 4, null] }), 24, 10);
    assert.equal(row.total, 24);
    assert.equal(row.status, "achieved");
    assert.equal(row.message, "Meta atingida");
  });

  it("5. ainda é possível alcançar 24", () => {
    const row = analyzeSubject(subject({ grades: [7, 8, null, null] }), 24, 10);
    assert.equal(row.possible, true);
    assert.equal(row.status, "progress");
  });

  it("6. não é mais possível alcançar 24", () => {
    const row = analyzeSubject(subject({ grades: [0, 0, 0, null] }), 24, 10);
    assert.equal(row.possible, false);
    assert.equal(row.status, "impossible");
    assert.match(row.message, /Não é mais possível/);
  });

  it("7. Projeto de Vida como SN", () => {
    const row = analyzeSubject(
      subject({ name: "Projeto de Vida", grades: ["SN", "SN", null, null], semNota: true }),
      24,
      10,
    );
    assert.equal(row.excluded, true);
    assert.equal(row.status, "excluded");
  });

  it("8. nota 10", () => {
    const parsed = parseGrade("10,0");
    assert.equal(parsed.ok && parsed.value, 10);
    const row = analyzeSubject(subject({ grades: [10, 10, null, null] }), 24, 10);
    assert.equal(row.total, 20);
    assert.equal(row.needed, 4);
  });

  it("9. nota 0", () => {
    const parsed = parseGrade("0");
    assert.equal(parsed.ok && parsed.value, 0);
    const row = analyzeSubject(subject({ grades: [0, 0, null, null] }), 24, 10);
    assert.equal(row.total, 0);
    assert.equal(row.needed, 24);
    assert.equal(row.possible, false);
  });

  it("10. meta personalizada", () => {
    const row = analyzeSubject(subject({ grades: [7, 8, null, null] }), 28, 10);
    assert.equal(row.needed, 13);
    assert.equal(row.avgNeeded, 6.5);
    assert.equal(row.status, "progress");
  });

  it("último bimestre exatamente 10", () => {
    const row = analyzeSubject(subject({ grades: [5, 5, 4, null] }), 24, 10);
    assert.equal(row.needed, 10);
    assert.equal(row.status, "attention");
    assert.match(row.message, /10,0 no último bimestre/);
  });
});

describe("format and summary", () => {
  it("formats with comma", () => {
    assert.equal(formatGrade(4.5), "4,5");
    assert.equal(formatGrade(10), "10,0");
  });

  it("default seed includes SN subject", () => {
    const data = createDefaultData();
    const rows = data.subjects.map((item) =>
      analyzeSubject(item, data.meta, data.maxPerBimester),
    );
    const stats = summarize(rows);
    assert.equal(stats.registered, 15);
    assert.equal(stats.excluded, 1);
    assert.ok(stats.counted >= 14);
  });
});
