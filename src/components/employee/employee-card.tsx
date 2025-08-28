import { Edit, Eye, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import type { Employee } from "../../types/app";
import { Link } from "react-router-dom";
import { useGradeLevelStore } from "../../stores/useGradeLevelStore";

const EmployeeCard: React.FC<{
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}> = ({ employee, onEdit, onDelete }) => {
  const { gradeLevels } = useGradeLevelStore();
  const gradeLevel = gradeLevels.find((gl) => gl.id === employee.gradeLevel);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600">{employee.role}</p>
            <p className="text-sm text-gray-500">{employee.department}</p>
            {gradeLevel && (
              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {gradeLevel.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to={`/employees/${employee?.id}`}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => onEdit(employee)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit Employee"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Employee"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={14} />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone size={14} />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin size={14} />
          <span>
            {employee.state}, {employee.country}
          </span>
        </div>
      </div>
    </div>
  );
};
export default EmployeeCard;
