import type { SidebarHeaderProps } from "../../types/sidebar";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
}) => (
  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-white bg-opacity-20 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-blue-100 text-sm">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default SidebarHeader;
