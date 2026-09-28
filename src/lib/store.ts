import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type AppData,
  type GradeValue,
  type StudentInfo,
  STORAGE_KEY,
  createDefaultData,
  emptyGrades,
  newId,
  normalizeData,
  resizeGrades,
} from "@/lib/grades";

interface GradeActions {
  setMeta: (meta: number) => void;
  setBimesters: (count: number) => void;
  setStudent: (patch: Partial<StudentInfo>) => void;
  setSubjectName: (id: string, name: string) => void;
  setGrade: (id: string, index: number, value: GradeValue) => void;
  setSemNota: (id: string, semNota: boolean) => void;
  addSubject: () => string;
  removeSubject: (id: string) => void;
  clearGrades: () => void;
  resetAll: () => void;
}

export type GradeStore = AppData & GradeActions;

export const useGradeStore = create<GradeStore>()(
  persist(
    (set, get) => ({
      ...createDefaultData(),

      setMeta: (meta) => set({ meta }),

      setBimesters: (count) => {
        const bimesters = Math.min(6, Math.max(1, Math.round(count)));
        set({
          bimesters,
          subjects: get().subjects.map((subject) => ({
            ...subject,
            grades: resizeGrades(subject.grades, bimesters),
          })),
        });
      },

      setStudent: (patch) => set({ student: { ...get().student, ...patch } }),

      setSubjectName: (id, name) =>
        set({
          subjects: get().subjects.map((subject) =>
            subject.id === id ? { ...subject, name } : subject,
          ),
        }),

      setGrade: (id, index, value) =>
        set({
          subjects: get().subjects.map((subject) => {
            if (subject.id !== id) return subject;
            const grades = [...subject.grades];
            grades[index] = value;
            return { ...subject, grades };
          }),
        }),

      setSemNota: (id, semNota) =>
        set({
          subjects: get().subjects.map((subject) =>
            subject.id === id ? { ...subject, semNota } : subject,
          ),
        }),

      addSubject: () => {
        const id = newId();
        set({
          subjects: [
            ...get().subjects,
            {
              id,
              name: "Nova matéria",
              grades: emptyGrades(get().bimesters),
              semNota: false,
            },
          ],
        });
        return id;
      },

      removeSubject: (id) =>
        set({ subjects: get().subjects.filter((subject) => subject.id !== id) }),

      clearGrades: () =>
        set({
          subjects: get().subjects.map((subject) => ({
            ...subject,
            grades: emptyGrades(get().bimesters),
          })),
        }),

      resetAll: () => set(createDefaultData()),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        meta: state.meta,
        bimesters: state.bimesters,
        maxPerBimester: state.maxPerBimester,
        student: state.student,
        subjects: state.subjects,
      }),
      merge: (persisted, current) => {
        const raw = (persisted ?? {}) as Partial<AppData>;
        const normalized = normalizeData({
          meta: raw.meta ?? current.meta,
          bimesters: raw.bimesters ?? current.bimesters,
          maxPerBimester: raw.maxPerBimester ?? current.maxPerBimester,
          student: raw.student ?? current.student,
          subjects: raw.subjects ?? current.subjects,
        });
        return { ...current, ...normalized };
      },
    },
  ),
);
