import type { SidebarUserProfileProps } from "../../types/sidebar";

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ user }) => (
  <div className="p-4 border-t border-gray-200 bg-gray-50">
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {user.initials}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.role}</p>
      </div>
    </div>
  </div>
);
export default SidebarUserProfile;
