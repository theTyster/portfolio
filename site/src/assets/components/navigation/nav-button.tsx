//Components
import Menu from "./menu";

type NavButtonProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  menuId: string;
};

function NavButton({ open, onToggle, onClose, menuId }: NavButtonProps) {
  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
      >
        <span className="bar bar-top" aria-hidden="true" />
        <span className="bar bar-mid" aria-hidden="true" />
        <span className="bar bar-bot" aria-hidden="true" />
      </button>
      <Menu open={open} menuId={menuId} onClose={onClose} />
    </>
  );
}

export default NavButton;
