import type { SidebarMenuProps } from "../../types/sidebar";
import SidebarMenuItem from "./side-bar-menu-item";

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  activeItem,
  onItemClick,
}) => (
  <nav className="p-4 flex-1">
    <ul className="space-y-2">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
          onClick={onItemClick}
        />
      ))}
    </ul>
  </nav>
);
export default SidebarMenu;
