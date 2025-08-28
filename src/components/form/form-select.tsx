import { ErrorMessage, Field } from "formik";

const FormSelect: React.FC<{
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}> = ({ label, name, options, placeholder = "Select..." }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      as="select"
      id={name}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default FormSelect;
