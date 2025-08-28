import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface User {
  name: string;
  role: string;
  initials: string;
}

export interface SidebarHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: (itemId: string) => void;
}

export interface SidebarMenuProps {
  items: MenuItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export interface SidebarUserProfileProps {
  user: User;
}

export interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SidebarProps {
  title?: string;
  subtitle?: string;
  headerIcon?: LucideIcon;
  menuItems?: MenuItem[];
  user?: User;
  className?: string;
}
