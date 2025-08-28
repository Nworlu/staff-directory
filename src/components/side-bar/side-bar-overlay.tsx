import type { SidebarOverlayProps } from "../../types/sidebar";

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      onClick={onClose}
    />
  );
};

export default SidebarOverlay;
