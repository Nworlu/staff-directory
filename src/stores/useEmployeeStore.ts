import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Employee } from "../types/app";

export type CreateEmployeeData = Omit<
  Employee,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateEmployeeData = Partial<Employee>;

interface EmployeeStore {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedGradeLevel: string;

  singleEmployee: Employee | null;

  // setEmployees : (employee)=>{}

  addEmployee: (employeeData: CreateEmployeeData) => void;

  updateEmployee: (id: string, update: UpdateEmployeeData) => void;

  setSingleEmployee: (id: string) => void;
  removeEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      error: null,
      loading: false,
      searchTerm: "",
      selectedGradeLevel: "",
      singleEmployee: null,

      addEmployee: (employeeData) => {
        set((state) => {
          const alreadyExists = state.employees.some(
            (employee) =>
              employee.email.toLowerCase() ===
                employeeData.email.toLowerCase() ||
              employee.phone === employeeData.phone
          );

          if (alreadyExists) {
            // you can also set error if you want feedback
            return {
              error: "Employee with this email or phone already exists",
            };
          }

          const newData: Employee = {
            ...employeeData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          return {
            employees: [...state.employees, newData],
            error: null,
          };
        });
        const error = get().error;
        if (error) throw new Error(error);
      },

      updateEmployee: (id, update) => {
        set((state) => ({
          employees: state.employees.map((employee) =>
            employee.id === id
              ? { ...employee, ...update, updatedAt: new Date().toISOString() } // ✅ spread update
              : employee
          ),
        }));
      },

      setSingleEmployee: (id) => {
        set((state) => ({
          singleEmployee:
            state.employees.find((employee) => employee.id === id) || null,
        }));
      },

      removeEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((employee) => employee.id !== id),
        }));
      },
    }),
    {
      name: "employee-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
      }),
    }
  )
);
