import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface GradeLevel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export type CreateGradeLevelData = Omit<GradeLevel, "id" | "createdAt">;

interface GradeLevelStore {
  gradeLevels: GradeLevel[];
  loading: boolean;
  error: string | null;

  addGradeLevel: (gradeData: CreateGradeLevelData) => void;
  removeGradeLevel: (id: string) => void;
  updateGradeLevel: (id: string, update: Partial<GradeLevel>) => void;
}

export const useGradeLevelStore = create<GradeLevelStore>()(
  persist(
    (set, get) => ({
      gradeLevels: [
        {
          id: crypto.randomUUID(),
          name: "Level 1",
          description: "Entry level employees",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          name: "Level 2",
          description: "Intermediate employees",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          name: "Level 3",
          description: "Senior employees",
          createdAt: new Date().toISOString(),
        },
      ],
      error: null,
      loading: false,

      addGradeLevel: (gradeData) => {
        set((state) => {
          const alreadyExists = state.gradeLevels.some(
            (grade) => grade.name.toLowerCase() === gradeData.name.toLowerCase()
          );

          if (alreadyExists) {
            return {
              error: "A grade level with this name already exists",
            };
          }

          const newData: GradeLevel = {
            ...gradeData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };

          return {
            gradeLevels: [...state.gradeLevels, newData],
            error: null,
          };
        });

        const error = get().error;
        if (error) throw new Error(error);
      },

      removeGradeLevel: (id) => {
        set((state) => ({
          gradeLevels: state.gradeLevels.filter((grade) => grade.id !== id),
        }));
      },

      updateGradeLevel: (id, update) => {
        set((state) => ({
          gradeLevels: state.gradeLevels.map((grade) =>
            grade.id === id
              ? { ...grade, ...update, createdAt: grade.createdAt } // keep original createdAt
              : grade
          ),
        }));
      },
    }),
    {
      name: "grade-level-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        gradeLevels: state.gradeLevels,
      }),
    }
  )
);
