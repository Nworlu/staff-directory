import { ChevronRight } from "lucide-react";
import type { SidebarMenuItemProps } from "../../types/sidebar";
import { Link } from "react-router-dom";

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  onClick,
}) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.href}
        onClick={() => onClick(item.id)}
        className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg
            text-left transition-all duration-200 group
            ${
              isActive
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
      >
        <div className="flex items-center space-x-3">
          <Icon
            size={20}
            className={`
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }
              `}
          />
          <span className="font-medium">{item.label}</span>
        </div>
        <ChevronRight
          size={16}
          className={`
              transition-transform duration-200
              ${
                isActive
                  ? "text-blue-600 rotate-90"
                  : "text-gray-400 group-hover:text-gray-600"
              }
            `}
        />
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
