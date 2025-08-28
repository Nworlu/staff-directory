import { Save, X } from "lucide-react";
import type { GradeLevel } from "../../types/app";
import { Form, Formik, type FormikHelpers } from "formik";
import FormInput from "../form/form-input";
import FormTextarea from "../form/form-textarea";
import { gradeLevelValidationSchema } from "../../validations";

export type GradeLevelFormValues = Omit<GradeLevel, "id" | "createdAt">;

const GradeLevelForm: React.FC<{
  gradeLevel?: GradeLevel;
  onSubmit: (
    values: GradeLevelFormValues,
    helpers: FormikHelpers<GradeLevelFormValues>
  ) => void;
  onCancel: () => void;
}> = ({ gradeLevel, onSubmit, onCancel }) => {
  const initialValues = {
    name: gradeLevel?.name || "",
    description: gradeLevel?.description || "",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {gradeLevel ? "Edit Grade Level" : "Add New Grade Level"}
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
        validationSchema={gradeLevelValidationSchema}
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
            <FormInput
              label="Grade Level Name"
              name="name"
              placeholder="e.g., LVL1, Senior, Manager"
            />

            <FormTextarea
              label="Description"
              name="description"
              placeholder="Describe this grade level and its responsibilities"
              rows={4}
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
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{isSubmitting ? "Saving..." : "Save Grade Level"}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GradeLevelForm;
