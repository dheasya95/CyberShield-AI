import { useState } from "react";
import { 
  Shield, 
  Target, 
  Code2, 
  Award, 
  AlertTriangle, 
  RotateCcw, 
  BookOpen,
  EyeOff,
  Layers
} from "lucide-react";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";

export default function About({ onNavigate }) {
  const { resetAllProgress } = useUserProgress();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetAllProgress();
    setResetConfirm(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const OBJECTIVES = [
    {
      icon: EyeOff,
      title: "100% Local Client-Side Privacy",
      color: "cyan",
      desc: "Every password analysis, phishing heuristic scan, and progress metric runs purely in your browser memory. We never transmit, store, or log sensitive strings on any external server."
    },
    {
      icon: Target,
      title: "Demystify Threat Vectors",
      color: "purple",
      desc: "Translate confusing technical acronyms (XSS, MITM, MFA, Zero-Day) into plain-English metaphors, real-world examples, and actionable defense checklists."
    },
    {
      icon: Award,
      title: "Gamified Habit Building",
      color: "emerald",
      desc: "Security shouldn't feel like a chore. Our composite Defense Readiness Score, interactive checklists, and quizzes provide clear milestones for everyday digital hygiene."
    },
    {
      icon: Layers,
      title: "Defense in Depth Focus",
      color: "pink",
      desc: "Teach students that security isn't a single silver bullet—it's layered defense combining strong passwords, multi-factor authentication, software hygiene, and skeptical link evaluation."
    }
  ];

  const FEATURES_MATRIX = [
    { name: "Interactive Security Dashboard", status: "Active", desc: "Composite defense score, milestone metrics, and quick feature access." },
    { name: "Password Strength & Entropy Analyzer", status: "Active", desc: "Length, charset entropy, brute-force crack time, and safe local generator." },
    { name: "Phishing Heuristic Scanner", status: "Active", desc: "Analyzes urgent language, spoofed domains, and credential-harvesting indicators." },
    { name: "Cyber Knowledge Quiz", status: "Active", desc: "18 comprehensive questions with instant explanations and streak tracking." },
    { name: "Cyber Learning Hub", status: "Active", desc: "6 modular lessons covering Ethical Hacking, Networks, Phishing, Malware, Passwords, and Privacy." },
    { name: "Daily Security Tips", status: "Active", desc: "Actionable tips categorized across Email, Social Media, Wi-Fi, Mobile, and Passwords." },
    { name: "Personal Security Checklist", status: "Active", desc: "Step-by-step interactive hardening guide with live score boost." },
    { name: "Cyber Learning Assistant", status: "Active", desc: "Curated conversational tutor answering questions offline with optional API hook." }
  ];

  return (
    <div className="page-container" style={{ maxWidth: "1100px" }}>
      {/* Hero Welcome Banner */}
      <div className="hero-banner" style={{ marginBottom: "36px" }}>
        <div className="hero-badge-row">
          <Badge variant="cyan">Platform Overview</Badge>
          <Badge variant="purple">Open Educational Resource</Badge>
          <Badge variant="emerald">Version 1.0.0</Badge>
        </div>

        <h1 className="hero-title">
          Empowering Everyone to <br />
          <span className="gradient-text">Navigate Cyberspace Fearlessly.</span>
        </h1>

        <p className="hero-subtitle">
          <strong>CyberShield AI</strong> is a modern cybersecurity awareness and personal online safety platform built specifically for students, educators, and technology beginners.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button 
            className="btn-cyber-primary"
            onClick={() => onNavigate("dashboard")}
          >
            <span>Explore Dashboard</span>
          </button>
          <button 
            className="btn-cyber-secondary"
            onClick={() => onNavigate("learning-hub")}
          >
            <BookOpen size={16} />
            <span>Start Learning</span>
          </button>
        </div>
      </div>

      {/* Mission & Purpose */}
      <section className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <Shield size={22} color="var(--neon-cyan)" />
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff" }}>
            Our Mission & Purpose
          </h2>
        </div>

        <p style={{ fontSize: "1rem", color: "var(--text-bright)", lineHeight: 1.7, marginBottom: "16px" }}>
          The modern Internet is full of traps designed to exploit human psychology. Phishing messages look indistinguishable from real bank alerts, data breaches happen weekly, and credential stuffing bots test billions of leaked passwords every hour.
        </p>

        <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
          Most cybersecurity resources are either overly academic, filled with enterprise jargon, or focus on offensive exploitation techniques that do not help regular users protect their digital lives. <strong>CyberShield AI</strong> was created to bridge this gap: offering practical, hands-on defensive tools and friendly lessons that empower anyone to build unbreakable digital hygiene.
        </p>
      </section>

      {/* Educational Objectives Grid */}
      <section style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Target size={22} color="var(--neon-purple)" />
          Core Educational Objectives
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {OBJECTIVES.map((obj, idx) => {
            const Icon = obj.icon;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{ padding: "24px", display: "flex", flexDirection: "column" }}
              >
                <div style={{ 
                  width: "44px", 
                  height: "44px", 
                  borderRadius: "10px", 
                  background: `rgba(255, 255, 255, 0.05)`, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: `var(--neon-${obj.color})`,
                  marginBottom: "16px"
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  {obj.title}
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  {obj.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Overview Matrix */}
      <section className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Layers size={22} color="var(--neon-pink)" />
          Application Capabilities & Architecture
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FEATURES_MATRIX.map((feat, idx) => (
            <div 
              key={idx}
              style={{ 
                background: "rgba(255, 255, 255, 0.02)", 
                border: "1px solid var(--border-subtle)", 
                borderRadius: "var(--radius-md)", 
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                  {feat.name}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {feat.desc}
                </div>
              </div>

              <Badge variant="emerald">{feat.status}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <Code2 size={22} color="var(--neon-cyan)" />
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff" }}>
            Technical Architecture
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>Frontend Framework</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>React 19 + Vite 8</div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>Ultra-fast HMR and lightweight bundle sizes.</p>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>State & Persistence</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>LocalStorage + React Context</div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>Zero server tracking. Progress stays strictly on user hardware.</p>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>Design System</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>Glassmorphism & Lucide Icons</div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>Dark navy cyber aesthetic with glowing neon gradients.</p>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>Privacy & Threat Model</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>Zero Network Exfiltration</div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>Passwords and URLs are never sent over the wire.</p>
          </div>
        </div>
      </section>

      {/* Safety & Educational Disclaimer */}
      <section style={{ 
        background: "rgba(244, 63, 94, 0.08)", 
        border: "1px solid rgba(244, 63, 94, 0.25)", 
        borderRadius: "var(--radius-lg)", 
        padding: "24px", 
        marginBottom: "36px" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--neon-rose)", fontWeight: 700, marginBottom: "8px" }}>
          <AlertTriangle size={20} />
          <span>Educational Disclaimer & Safe Usage Policy</span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-bright)", lineHeight: 1.6 }}>
          CyberShield AI is an interactive educational simulation designed exclusively for defensive learning and cyber hygiene awareness.
          The password checker and phishing scanner rely on heuristic pattern matching; they do not replace commercial antivirus, endpoint detection, or enterprise security audits. Never use offensive tools against unauthorized targets.
        </p>
      </section>

      {/* Project Maintenance & Data Reset */}
      <section className="glass-panel" style={{ padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Manage Local Demo Data
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Clear all completed lessons, quiz scores, and checklist answers to start the simulation fresh.
          </p>
        </div>

        <div>
          {!resetConfirm ? (
            <button 
              className="btn-cyber-outline"
              onClick={() => setResetConfirm(true)}
              style={{ color: "var(--neon-rose)", borderColor: "rgba(244, 63, 94, 0.4)" }}
            >
              <RotateCcw size={16} />
              <span>Reset User Progress</span>
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--neon-rose)", fontWeight: 600 }}>Confirm reset?</span>
              <button 
                className="btn-cyber-primary"
                onClick={handleReset}
                style={{ background: "var(--grad-alert)", padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Yes, Reset
              </button>
              <button 
                className="btn-cyber-outline"
                onClick={() => setResetConfirm(false)}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Cancel
              </button>
            </div>
          )}

          {resetSuccess && (
            <div style={{ color: "var(--neon-emerald)", fontSize: "0.82rem", marginTop: "6px", textAlign: "right" }}>
              Progress reset to default state!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
