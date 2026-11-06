import { Menu, ShieldCheck, Sparkles } from "lucide-react";
import { useUserProgress } from "../../context/UserProgressContext.jsx";

const PAGE_TITLES = {
  "dashboard": "Security Dashboard",
  "password-checker": "Password Strength Analyzer",
  "phishing-checker": "Phishing & URL Awareness Scanner",
  "quiz": "Cybersecurity Knowledge Quiz",
  "learning-hub": "Cybersecurity Learning Hub",
  "security-tips": "Daily Security Tips",
  "checklist": "Personal Security Checklist",
  "assistant": "Cyber Learning Assistant",
  "about": "About CyberShield AI"
};

export default function Header({ activePage, onNavigate, onToggleMobileNav }) {
  const { securityScore, shieldTier } = useUserProgress();

  return (
    <header className="cyber-header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleMobileNav} 
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="header-page-title">
            {PAGE_TITLES[activePage] || "CyberShield AI"}
          </h1>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Stay Safe. Stay Smart. Stay Protected.
          </span>
        </div>
      </div>

      <div className="header-right">
        {/* Security Health Indicator */}
        <div 
          className="header-score-pill" 
          onClick={() => onNavigate("checklist")}
          title="Click to view your personal checklist and boost your score"
        >
          <div className="status-dot" />
          <ShieldCheck size={16} color="var(--neon-cyan)" />
          <span style={{ fontWeight: 600 }}>{securityScore}%</span>
          <span style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>{shieldTier.title}</span>
        </div>

        {/* Quick Help Shortcut */}
        <button 
          className="btn-cyber-outline" 
          onClick={() => onNavigate("assistant")}
          style={{ padding: "6px 12px", fontSize: "0.82rem" }}
        >
          <Sparkles size={15} />
          <span>Ask Assistant</span>
        </button>
      </div>
    </header>
  );
}
