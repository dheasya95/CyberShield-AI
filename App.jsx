import { useState, useEffect } from "react";
import { UserProgressProvider } from "./context/UserProgressContext.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import PasswordChecker from "./pages/PasswordChecker.jsx";
import PhishingChecker from "./pages/PhishingChecker.jsx";
import Quiz from "./pages/Quiz.jsx";
import LearningHub from "./pages/LearningHub.jsx";
import SecurityTips from "./pages/SecurityTips.jsx";
import Checklist from "./pages/Checklist.jsx";
import Assistant from "./pages/Assistant.jsx";
import About from "./pages/About.jsx";

import "./App.css";

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Handle navigation and auto scroll to top
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close mobile nav when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840) {
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "password-checker":
        return <PasswordChecker />;
      case "phishing-checker":
        return <PhishingChecker />;
      case "quiz":
        return <Quiz />;
      case "learning-hub":
        return <LearningHub />;
      case "security-tips":
        return <SecurityTips />;
      case "checklist":
        return <Checklist />;
      case "assistant":
        return <Assistant />;
      case "about":
        return <About onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header */}
        <Header 
          activePage={activePage} 
          onNavigate={handleNavigate}
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />

        {/* Page Content */}
        <main style={{ flex: 1 }}>
          {renderActivePage()}
        </main>

        {/* Professional Footer */}
        <footer style={{ 
          borderTop: "1px solid var(--border-subtle)", 
          padding: "24px 32px", 
          marginTop: "auto",
          background: "rgba(5, 8, 20, 0.6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "0.82rem",
          color: "var(--text-dim)"
        }}>
          <div>
            <strong style={{ color: "var(--text-bright)" }}>CyberShield AI</strong> — Personal Cybersecurity Awareness & Safety Platform.
          </div>
          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            <span>100% Client-Side Privacy Guaranteed</span>
            <span>•</span>
            <button 
              onClick={() => handleNavigate("about")} 
              style={{ background: "transparent", border: "none", color: "var(--neon-cyan)", cursor: "pointer", fontSize: "0.82rem" }}
            >
              Educational Disclaimer
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserProgressProvider>
      <AppContent />
    </UserProgressProvider>
  );
}
