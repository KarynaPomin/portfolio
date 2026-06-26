import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const navItems = [
  { id: "home", icon: HomeOutlinedIcon, ariaLabel: "Home" },
  { id: "prices", icon: PaymentsOutlinedIcon, ariaLabel: "Prices" },
  { id: "projects", icon: FolderOpenOutlinedIcon, ariaLabel: "Projects" }
];

export default function SideNavigation({ activeSection, onNavigate }) {
  const activeIndex = navItems.findIndex((item) => item.id === activeSection);
  const navStyle = {
    "--nav-y": `${Math.max(activeIndex, 0) * 130}px`,
    "--nav-left": `${16.666 + Math.max(activeIndex, 0) * 33.333}%`
  };

  return (
    <nav className="side-nav" style={navStyle} aria-label="Section navigation">
      <span className="nav-glow" aria-hidden="true" />

      {navItems.map((item) => {
        const Icon = item.icon;

        return (
            <button
              key={item.id}
              className={`nav-button ${activeSection === item.id ? "active" : ""}`}
              type="button"
              aria-label={item.ariaLabel}
              onClick={() => onNavigate(item.id)}
            >
              <Icon />
            </button>
        );
    })}
    </nav>
  );
}
