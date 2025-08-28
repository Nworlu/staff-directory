import { Edit, GraduationCap, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { GradeLevel } from "../types/app";
import GradeLevelForm, {
  type GradeLevelFormValues,
} from "../components/grade-level/grade-level-form";
import { useGradeLevelStore } from "../stores/useGradeLevelStore";
import type { FormikHelpers } from "formik";

const GradeLevelsPage: React.FC = () => {
  const { gradeLevels, addGradeLevel, updateGradeLevel, removeGradeLevel } =
    useGradeLevelStore();
  const [showGradeLevelForm, setShowGradeLevelForm] = useState(false);
  const [editingGradeLevel, setEditingGradeLevel] = useState<GradeLevel | null>(
    null
  );

  const handleAddGradeLevel = async (
    values: GradeLevelFormValues,
    helpers: FormikHelpers<GradeLevelFormValues>
  ) => {
    try {
      console.log("Adding grade level:", values);
      addGradeLevel(values);
      setShowGradeLevelForm(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding grade level:", error.message);
        helpers?.setErrors({
          name: error?.message,
        });
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const handleEditGradeLevel = (values: GradeLevelFormValues) => {
    console.log("Updating grade level:", values);
    updateGradeLevel(editingGradeLevel?.id as string, values);
    setEditingGradeLevel(null);
  };

  const handleDeleteGradeLevel = (id: string) => {
    if (window.confirm("Are you sure you want to delete this grade level?")) {
      removeGradeLevel(id);
      console.log("Deleting grade level:", id);
    }
  };

  if (showGradeLevelForm) {
    return (
      <GradeLevelForm
        onSubmit={handleAddGradeLevel}
        onCancel={() => setShowGradeLevelForm(false)}
      />
    );
  }

  if (editingGradeLevel) {
    return (
      <GradeLevelForm
        gradeLevel={editingGradeLevel}
        onSubmit={handleEditGradeLevel}
        onCancel={() => setEditingGradeLevel(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grade Levels</h1>
        <button
          onClick={() => setShowGradeLevelForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Grade Level
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gradeLevels.map((gradeLevel) => (
          <div
            key={gradeLevel.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {gradeLevel.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {gradeLevel.description}
                </p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(gradeLevel.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingGradeLevel(gradeLevel)}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit Grade Level"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteGradeLevel(gradeLevel.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Grade Level"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gradeLevels.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No grade levels found
          </h3>
          <p className="text-gray-500 mb-4">
            Create grade levels to organize your employees.
          </p>
          <button
            onClick={() => setShowGradeLevelForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Grade Level
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeLevelsPage;
