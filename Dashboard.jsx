import { useState } from "react";
import { 
  KeyRound, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  CheckSquare, 
  Bot, 
  ArrowRight, 
  Award, 
  Copy, 
  Check, 
  TrendingUp,
  Bookmark
} from "lucide-react";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import SecurityScoreGauge from "../components/common/SecurityScoreGauge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";
import Badge from "../components/common/Badge.jsx";
import { SECURITY_TIPS } from "../data/tipsData.js";
import { CHECKLIST_ITEMS } from "../data/checklistData.js";

export default function Dashboard({ onNavigate }) {
  const { 
    securityScore, 
    shieldTier, 
    completedLessonsCount, 
    totalLessons, 
    lessonsPercentage,
    completedChecklistCount, 
    totalChecklistItems, 
    checklistPercentage,
    bestQuizScore,
    progress,
    toggleBookmarkTip
  } = useUserProgress();

  const [copiedTip, setCopiedTip] = useState(false);

  // Daily Tip selection
  const dailyTip = SECURITY_TIPS[0];
  const isTipBookmarked = progress.bookmarkedTips.includes(dailyTip.id);

  const handleCopyTip = () => {
    navigator.clipboard.writeText(`${dailyTip.title}: ${dailyTip.summary}`);
    setCopiedTip(true);
    setTimeout(() => setCopiedTip(false), 2000);
  };

  // Find next recommended action from uncompleted checklist
  const pendingChecklist = CHECKLIST_ITEMS.find(item => !progress.checklistCompleted[item.id]);

  return (
    <div className="page-container">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-badge-row">
          <Badge variant="cyan">Cyber Awareness Platform</Badge>
          <Badge variant="purple">100% Client-Side Privacy</Badge>
          <Badge variant="emerald">Beginner Friendly</Badge>
        </div>

        <h1 className="hero-title">
          Stay Safe. Stay Smart. <br />
          <span className="gradient-text">Stay Protected.</span>
        </h1>

        <p className="hero-subtitle">
          Welcome to <strong>CyberShield AI</strong>—your personal cybersecurity command center. Learn ethical hacking fundamentals, test passwords locally, spot sophisticated phishing scams, and track your defense readiness.
        </p>

        <div className="hero-actions">
          <button 
            className="btn-cyber-primary"
            onClick={() => onNavigate("password-checker")}
          >
            <KeyRound size={18} />
            <span>Test Password Strength</span>
          </button>
          <button 
            className="btn-cyber-secondary"
            onClick={() => onNavigate("phishing-checker")}
          >
            <AlertTriangle size={18} />
            <span>Scan Suspicious Link</span>
          </button>
          <button 
            className="btn-cyber-outline"
            onClick={() => onNavigate("quiz")}
          >
            <HelpCircle size={18} />
            <span>Take Knowledge Quiz</span>
          </button>
        </div>
      </section>

      {/* Main Metrics & Security Score Card */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        
        {/* Security Score Overview Card */}
        <div className="glass-panel" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--neon-cyan)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px" }}>
                Defense Posture
              </span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                Overall Security Score
              </h2>
            </div>
            <Badge variant={shieldTier.color}>{shieldTier.badge}</Badge>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", margin: "10px 0 20px" }}>
            <SecurityScoreGauge score={securityScore} size={145} />
            <div style={{ flex: 1, minWidth: "160px" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
                {shieldTier.title}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "12px" }}>
                {shieldTier.description}
              </p>
              <button 
                className="btn-cyber-outline" 
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                onClick={() => onNavigate("checklist")}
              >
                Boost Your Score &rarr;
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", paddingTop: "18px", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Checklist</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--neon-cyan)" }}>{checklistPercentage}%</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Lessons</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--neon-purple)" }}>{lessonsPercentage}%</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Quiz Best</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--neon-emerald)" }}>{bestQuizScore}%</div>
            </div>
          </div>
        </div>

        {/* Learning & Quiz Progress Summary */}
        <div className="glass-panel" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--neon-purple)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px" }}>
                  Milestones
                </span>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                  Learning & Quiz Activity
                </h2>
              </div>
              <Award size={24} color="var(--neon-purple)" />
            </div>

            {/* Lesson Module Progress */}
            <div style={{ marginBottom: "22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
                <span style={{ color: "var(--text-bright)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <BookOpen size={16} color="var(--neon-purple)" />
                  Learning Hub Lessons
                </span>
                <span style={{ fontWeight: 700, color: "var(--neon-purple)" }}>
                  {completedLessonsCount} of {totalLessons} completed
                </span>
              </div>
              <ProgressBar progress={lessonsPercentage} variant="purple" height={8} />
            </div>

            {/* Quiz Performance */}
            <div style={{ marginBottom: "22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
                <span style={{ color: "var(--text-bright)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <HelpCircle size={16} color="var(--neon-cyan)" />
                  Cyber Knowledge Quiz
                </span>
                <span style={{ fontWeight: 700, color: "var(--neon-cyan)" }}>
                  {bestQuizScore > 0 ? `Best Score: ${bestQuizScore}%` : "Not attempted yet"}
                </span>
              </div>
              <ProgressBar progress={bestQuizScore} variant="cyan" height={8} />
            </div>

            {/* Security Checklist Progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
                <span style={{ color: "var(--text-bright)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckSquare size={16} color="var(--neon-emerald)" />
                  Security Checklist
                </span>
                <span style={{ fontWeight: 700, color: "var(--neon-emerald)" }}>
                  {completedChecklistCount} of {totalChecklistItems} tasks done
                </span>
              </div>
              <ProgressBar progress={checklistPercentage} variant="emerald" height={8} />
            </div>
          </div>

          {/* Quick recommendation pill */}
          {pendingChecklist && (
            <div style={{ marginTop: "20px", background: "rgba(255, 255, 255, 0.03)", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
                <TrendingUp size={16} color="var(--neon-amber)" />
                <span style={{ color: "var(--text-muted)" }}>Next Task:</span>
                <span style={{ fontWeight: 600, color: "#fff" }}>{pendingChecklist.shortTitle}</span>
              </div>
              <button 
                onClick={() => onNavigate("checklist")}
                style={{ background: "transparent", border: "none", color: "var(--neon-cyan)", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}
              >
                Complete &rarr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Daily Security Tip Widget */}
      <div className="glass-panel" style={{ padding: "24px 28px", marginBottom: "32px", borderLeft: "4px solid var(--neon-cyan)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-cyan)" }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
              Featured Daily Security Tip
            </span>
            <Badge variant="cyan">{dailyTip.tag}</Badge>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button 
              className="btn-cyber-secondary"
              onClick={handleCopyTip}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
              title="Copy Tip to Clipboard"
            >
              {copiedTip ? <Check size={14} color="var(--neon-emerald)" /> : <Copy size={14} />}
              <span>{copiedTip ? "Copied!" : "Copy Tip"}</span>
            </button>
            <button 
              className="btn-cyber-secondary"
              onClick={() => toggleBookmarkTip(dailyTip.id)}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
              title={isTipBookmarked ? "Remove Bookmark" : "Save Bookmark"}
            >
              <Bookmark size={14} fill={isTipBookmarked ? "var(--neon-cyan)" : "none"} color="var(--neon-cyan)" />
              <span>{isTipBookmarked ? "Saved" : "Save"}</span>
            </button>
            <button 
              className="btn-cyber-outline"
              onClick={() => onNavigate("security-tips")}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <span>View All Tips</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
          {dailyTip.title}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
          {dailyTip.summary}
        </p>
      </div>

      {/* Feature Cards Grid (Quick Access to all 7 core modules) */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span>Security Operations & Tools</span>
        <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: 500 }}>(Click any tool to start)</span>
      </h2>

      <div className="features-grid">
        {/* 1. Password Strength Checker */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("password-checker")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(6, 182, 212, 0.15)", color: "var(--neon-cyan)" }}>
                <KeyRound size={24} />
              </div>
              <Badge variant="cyan">Instant Analysis</Badge>
            </div>
            <h3 className="feature-title">Password Strength Checker</h3>
            <p className="feature-desc">
              Evaluate password entropy, crack times, and common vulnerabilities 100% locally in your browser. Passwords are never saved or sent anywhere.
            </p>
          </div>
          <div className="feature-footer">
            <span>Analyze Passwords</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* 2. Phishing Awareness Checker */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("phishing-checker")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(244, 63, 94, 0.15)", color: "var(--neon-rose)" }}>
                <AlertTriangle size={24} />
              </div>
              <Badge variant="rose">Heuristic Scanner</Badge>
            </div>
            <h3 className="feature-title">Phishing Awareness Scanner</h3>
            <p className="feature-desc">
              Inspect suspicious SMS texts, urgent emails, and deceptive lookalike URLs using educational heuristic threat indicators.
            </p>
          </div>
          <div className="feature-footer" style={{ color: "var(--neon-rose)" }}>
            <span>Scan Messages & URLs</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* 3. Cybersecurity Quiz */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("quiz")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(139, 92, 246, 0.15)", color: "var(--neon-purple)" }}>
                <HelpCircle size={24} />
              </div>
              <Badge variant="purple">18 Questions</Badge>
            </div>
            <h3 className="feature-title">Interactive Cyber Quiz</h3>
            <p className="feature-desc">
              Test your defense skills against real-world scenarios covering malware, OTP safety, Wi-Fi hygiene, and social engineering.
            </p>
          </div>
          <div className="feature-footer" style={{ color: "var(--neon-purple)" }}>
            <span>Start Challenge</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* 4. Learning Hub */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("learning-hub")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(236, 72, 153, 0.15)", color: "var(--neon-pink)" }}>
                <BookOpen size={24} />
              </div>
              <Badge variant="pink">6 Core Lessons</Badge>
            </div>
            <h3 className="feature-title">Cybersecurity Learning Hub</h3>
            <p className="feature-desc">
              Clear, bite-sized lessons with analogies, definitions, and real-world attack breakdowns for ethical hacking, network safety, and privacy.
            </p>
          </div>
          <div className="feature-footer" style={{ color: "var(--neon-pink)" }}>
            <span>Explore Lessons</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* 5. Security Checklist */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("checklist")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--neon-emerald)" }}>
                <CheckSquare size={24} />
              </div>
              <Badge variant="emerald">{completedChecklistCount}/{totalChecklistItems} Completed</Badge>
            </div>
            <h3 className="feature-title">Personal Security Checklist</h3>
            <p className="feature-desc">
              Step-by-step action items to lock down your digital life: 2FA setup, safe updates, app permissions, and password auditing.
            </p>
          </div>
          <div className="feature-footer" style={{ color: "var(--neon-emerald)" }}>
            <span>Audit Your Security</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* 6. AI Cyber Assistant */}
        <div 
          className="glass-panel glass-panel-glow feature-card"
          onClick={() => onNavigate("assistant")}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-box" style={{ background: "rgba(6, 182, 212, 0.15)", color: "var(--neon-cyan)" }}>
                <Bot size={24} />
              </div>
              <Badge variant="cyan">Instant Answers</Badge>
            </div>
            <h3 className="feature-title">Cyber Learning Assistant</h3>
            <p className="feature-desc">
              Have questions about VPNs, ransomware, or setting up authenticator apps? Chat with our client-side educational knowledge assistant.
            </p>
          </div>
          <div className="feature-footer">
            <span>Ask a Question</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
