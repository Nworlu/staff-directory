import { Plus, Search, Users } from "lucide-react";
import EmployeeCard from "../components/employee/employee-card";
import EmployeeForm, {
  type EmployeeFormValues,
} from "../components/employee/employee-form";
import { useState } from "react";
import type { Employee } from "../types/app";
import { useEmployeeStore } from "../stores/useEmployeeStore";
import type { FormikHelpers } from "formik";
import { useGradeLevelStore } from "../stores/useGradeLevelStore";

const EmployeesPage: React.FC = () => {
  const { addEmployee, employees, updateEmployee, removeEmployee } =
    useEmployeeStore();
  const { gradeLevels } = useGradeLevelStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("");
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGradeLevel =
      !selectedGradeLevel ||
      employee.gradeLevel.toLowerCase() === selectedGradeLevel.toLowerCase();
    return matchesSearch && matchesGradeLevel;
  });

  const handleAddEmployee = async (
    values: EmployeeFormValues,
    helpers: FormikHelpers<EmployeeFormValues>
  ) => {
    try {
      console.log("Adding employee:", values);
      await addEmployee(values);
      setShowEmployeeForm(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding employee:", error.message);
        helpers?.setErrors({
          email: error?.message,
          phone: error?.message,
        });
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const handleEditEmployee = async (values: EmployeeFormValues) => {
    // Update employee logic would go here
    console.log("Updating employee:", values);
    updateEmployee(editingEmployee?.id as string, values);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // Delete employee logic would go here
      removeEmployee(id);
      console.log("Deleting employee:", id);
    }
  };

  // if (viewingEmployee) {
  //   return <EmployeeDetailsPage employee={viewingEmployee} onBack={() => setViewingEmployee(null)} />;
  // }

  if (showEmployeeForm) {
    return (
      <EmployeeForm
        onSubmit={handleAddEmployee}
        onCancel={() => setShowEmployeeForm(false)}
      />
    );
  }

  if (editingEmployee) {
    return (
      <EmployeeForm
        employee={editingEmployee}
        onSubmit={handleEditEmployee}
        onCancel={() => setEditingEmployee(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowEmployeeForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedGradeLevel}
          onChange={(e) => setSelectedGradeLevel(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Grade Levels</option>
          {gradeLevels?.map((gl, index) => (
            <option key={index} value={gl?.id}>
              {gl?.name}
            </option>
          ))}
          {/* Grade level options would be populated here */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onEdit={setEditingEmployee}
            onDelete={handleDeleteEmployee}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first employee.
          </p>
          <button
            onClick={() => setShowEmployeeForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Employee
          </button>
        </div>
      )}
    </div>
  );
};
export default EmployeesPage;
