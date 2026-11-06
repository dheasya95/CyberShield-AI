import { 
  Shield, 
  KeyRound, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  CheckSquare, 
  Bot, 
  Info,
  X
} from "lucide-react";
import { useUserProgress } from "../../context/UserProgressContext.jsx";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Shield, badge: null },
  { id: "password-checker", label: "Password Checker", icon: KeyRound, badge: "Safe" },
  { id: "phishing-checker", label: "Phishing Checker", icon: AlertTriangle, badge: "Heuristic" },
  { id: "quiz", label: "Cyber Quiz", icon: HelpCircle, badge: "18 Qs" },
  { id: "learning-hub", label: "Learning Hub", icon: BookOpen, badge: "6 Lessons" },
  { id: "security-tips", label: "Security Tips", icon: Sparkles, badge: null },
  { id: "checklist", label: "Security Checklist", icon: CheckSquare, badge: null },
  { id: "assistant", label: "Cyber Assistant", icon: Bot, badge: "Demo AI" },
  { id: "about", label: "About Platform", icon: Info, badge: null }
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const { securityScore, shieldTier, checklistPercentage } = useUserProgress();

  const handleNavClick = (id) => {
    onNavigate(id);
    if (window.innerWidth <= 840 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`mobile-drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`cyber-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header / Brand */}
        <div className="sidebar-header">
          <div className="brand-wrapper" onClick={() => handleNavClick("dashboard")} style={{ cursor: "pointer" }}>
            <div className="brand-icon-box">
              <Shield size={24} />
            </div>
            <div className="brand-text-col">
              <span className="brand-name">
                CyberShield <span className="gradient-text-cyan">AI</span>
              </span>
              <span className="brand-tagline">Awareness & Safety</span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button 
            className="mobile-menu-btn" 
            onClick={onClose} 
            aria-label="Close Navigation"
            style={{ display: window.innerWidth <= 840 ? "flex" : "none" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={19} className="nav-icon" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer with Security Tier Card */}
        <div className="sidebar-footer">
          <div className="sidebar-score-card">
            <div className="sidebar-score-circle">
              {securityScore}%
            </div>
            <div className="sidebar-score-info">
              <span className="sidebar-score-title">Defense Status</span>
              <span className="sidebar-score-level">{shieldTier.title}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--neon-cyan)" }}>
                {checklistPercentage}% Checklist Done
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
