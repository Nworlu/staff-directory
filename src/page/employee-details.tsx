import {
  ArrowLeft,
  Building,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import { useGradeLevelStore } from "../stores/useGradeLevelStore";
import { useEmployeeStore } from "../stores/useEmployeeStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EmployeeDetailsPage = () => {
  const { gradeLevels } = useGradeLevelStore();
  const { singleEmployee, setSingleEmployee } = useEmployeeStore();
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const employee = singleEmployee;
  const gradeLevel = gradeLevels.find((gl) => gl.id === employee?.gradeLevel);

  console.log({ employee, params });

  useEffect(() => {
    const loadEmployee = async () => {
      if (params?.employeeId) {
        setIsLoading(true);
        try {
          await setSingleEmployee(params.employeeId);
        } catch (error) {
          console.error("Failed to load employee:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadEmployee();
  }, [params?.employeeId, setSingleEmployee]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading employee details...</span>
        </div>
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/employees" replace />;
  }

  const handleBackClick = () => {
    navigate("/employees");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackClick}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Back to employees"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-xl">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-white truncate">
                {employee.name}
              </h2>
              <p className="text-blue-100 truncate">{employee.role}</p>
              <p className="text-blue-100 truncate">{employee.department}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400 shrink-0" size={20} />
                  <span className="text-gray-700 break-all">
                    {employee.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400 shrink-0" size={20} />
                  <span className="text-gray-700">{employee.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-400 mt-0.5 shrink-0" size={20} />
                  <div className="text-gray-700 min-w-0">
                    {employee.address && (
                      <p className="break-words">{employee.address}</p>
                    )}
                    <p>
                      {employee.state}, {employee.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Work Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="text-gray-400 shrink-0" size={20} />
                  <span className="text-gray-700">{employee.role}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="text-gray-400 shrink-0" size={20} />
                  <span className="text-gray-700">{employee.department}</span>
                </div>
                {gradeLevel && (
                  <div className="flex items-center space-x-3">
                    <GraduationCap
                      className="text-gray-400 shrink-0"
                      size={20}
                    />
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {gradeLevel.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
