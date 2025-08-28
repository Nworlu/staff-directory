import { Save, X } from "lucide-react";
import FormTextarea from "../form/form-textarea";
import FormSelect from "../form/form-select";
import FormInput from "../form/form-input";
import { Form, Formik, type FormikHelpers } from "formik";
import { employeeValidationSchema } from "../../validations";
import type { Employee } from "../../types/app";
import { useGradeLevelStore } from "../../stores/useGradeLevelStore";
import { useAppStore } from "../../stores/useAppStore";

export type EmployeeFormValues = Omit<
  Employee,
  "id" | "createdAt" | "updatedAt"
>;

const EmployeeForm: React.FC<{
  employee?: Employee;
  onSubmit: (
    values: EmployeeFormValues,
    helpers: FormikHelpers<EmployeeFormValues>
  ) => void;
  onCancel: () => void;
}> = ({ employee, onSubmit, onCancel }) => {
  const { gradeLevels } = useGradeLevelStore();
  const { countries } = useAppStore();

  const initialValues = {
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    country: employee?.country || "",
    state: employee?.state || "",
    address: employee?.address || "",
    role: employee?.role || "",
    department: employee?.department || "",
    gradeLevel: employee?.gradeLevel || "",
  };

  const roleOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Senior Engineer", label: "Senior Engineer" },
    { value: "Team Lead", label: "Team Lead" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Designer", label: "Designer" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "HR Manager", label: "HR Manager" },
  ];

  const departmentOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Product", label: "Product" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Finance", label: "Finance" },
    { value: "Operations", label: "Operations" },
  ];

  const countryOptions = [...new Set(countries.map((c) => c.country))].map(
    (country) => ({ value: country, label: country })
  );

  const gradeLevelOptions = gradeLevels.map((gl) => ({
    value: gl.id,
    label: gl.name,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={async (values, helpers) => {
          console.log({ values });
          await new Promise((resolve) => setTimeout(resolve, 1500));

          await onSubmit(values, helpers);

          helpers.setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                name="name"
                placeholder="Enter full name"
              />
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
              />
              <FormInput
                label="Phone Number"
                name="phone"
                placeholder="Enter phone number"
              />
              <FormSelect
                label="Country"
                name="country"
                options={countryOptions}
                placeholder="Select country"
              />
              <FormInput
                label="State/Province"
                name="state"
                placeholder="Enter state or province"
              />
              <FormSelect
                label="Role"
                name="role"
                options={roleOptions}
                placeholder="Select role"
              />
              <FormSelect
                label="Department"
                name="department"
                options={departmentOptions}
                placeholder="Select department"
              />
              <FormSelect
                label="Grade Level (Optional)"
                name="gradeLevel"
                options={gradeLevelOptions}
                placeholder="Select grade level"
              />
            </div>

            <FormTextarea
              label="Address"
              name="address"
              placeholder="Enter full address"
              rows={3}
            />

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{isSubmitting ? "Saving..." : "Save Employee"}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
