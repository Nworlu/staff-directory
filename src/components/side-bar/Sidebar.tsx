import { GraduationCap, Settings, UserCheck, Users } from "lucide-react";
import type { SidebarProps } from "../../types/sidebar";
import { useState } from "react";
import SidebarOverlay from "./side-bar-overlay";
import SidebarHeader from "./side-bar-header";
import SidebarMenu from "./side-bar-menu";
import SidebarUserProfile from "./side-bar-user-profile";
import MobileMenuButton from "./mobile-menu-button";

const Sidebar: React.FC<SidebarProps> = ({
  title = "Staff Directory",
  subtitle = "Dashboard",
  headerIcon = UserCheck,
  menuItems = [
    {
      id: "employees",
      label: "Employees",
      icon: Users,
      href: "/employees",
    },
    {
      id: "grade-levels",
      label: "Grade Levels",
      icon: GraduationCap,
      href: "/grade-levels",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ],
  user = {
    name: "John Doe",
    role: "Administrator",
    initials: "JD",
  },
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0]?.id || "");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleOverlayClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MobileMenuButton isOpen={isOpen} onToggle={toggleSidebar} />
      <SidebarOverlay isOpen={isOpen} onClose={handleOverlayClose} />

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full bg-white shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64 max-w-64 border-r border-gray-200
          ${className}
        `}
      >
        <SidebarHeader title={title} subtitle={subtitle} icon={headerIcon} />

        <SidebarMenu
          items={menuItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />

        <SidebarUserProfile user={user} />
      </aside>
    </>
  );
};

export default Sidebar;
