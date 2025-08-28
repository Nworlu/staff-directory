import { ErrorMessage, Field } from "formik";

const FormTextarea: React.FC<{
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}> = ({ label, name, placeholder, rows = 4 }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      as="textarea"
      id={name}
      name={name}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default FormTextarea;
