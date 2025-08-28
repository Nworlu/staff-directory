import { Menu, X } from "lucide-react";
import type { MobileMenuButtonProps } from "../../types/sidebar";

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
  >
    {isOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
);

export default MobileMenuButton;
