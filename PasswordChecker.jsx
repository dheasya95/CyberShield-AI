import { useState, useMemo } from "react";
import { 
  KeyRound, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Lock, 
  Clock, 
  Binary, 
  AlertTriangle,
  Info
} from "lucide-react";
import { analyzePassword, generateSecurePassword } from "../services/passwordAnalyzer.js";
import Badge from "../components/common/Badge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generator settings
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);

  // Analyze strictly client-side
  const analysis = useMemo(() => {
    return analyzePassword(password);
  }, [password]);

  const handleGenerate = () => {
    const newPass = generateSecurePassword(genLength, {
      includeUpper: genUpper,
      includeNumbers: genNumbers,
      includeSymbols: genSymbols
    });
    setPassword(newPass);
    setShowPassword(true); // show it so user can see what was generated
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPassword("");
  };

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-cyan)" }}>
            <KeyRound size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
              Password Strength Analyzer
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Client-side cryptographic entropy and crack time testing. 100% private.
            </p>
          </div>
        </div>

        {/* Privacy Pledge Pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.82rem", color: "#6ee7b7", marginTop: "6px" }}>
          <Lock size={14} />
          <span>Zero-Knowledge: Your password never leaves your browser, is never logged, and is never stored.</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
        
        {/* Left Column: Input, Gauge, & Analysis */}
        <div className="glass-panel" style={{ padding: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Enter Password to Test
            </label>
            {password && (
              <button 
                onClick={handleClear}
                style={{ background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "0.8rem", cursor: "pointer" }}
              >
                Clear input
              </button>
            )}
          </div>

          {/* Secure Input Box */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or generate a password..."
              className="cyber-input"
              style={{
                paddingRight: "80px",
                fontFamily: showPassword ? "var(--font-mono)" : "inherit",
                fontSize: "1.05rem",
                letterSpacing: showPassword ? "1px" : "2px"
              }}
              autoComplete="off"
              spellCheck="false"
            />
            <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "6px" }}>
              {password && (
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{ background: "transparent", border: "none", color: copied ? "var(--neon-emerald)" : "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                  title="Copy password"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Strength Score Meter */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Strength Rating</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 800, fontSize: "1.05rem", color: `var(--neon-${analysis.color})` }}>
                  {analysis.label}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  ({analysis.score}/100)
                </span>
              </div>
            </div>
            <ProgressBar progress={analysis.score} variant={analysis.color} height={10} />
          </div>

          {/* Metrics: Entropy & Estimated Crack Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "26px" }}>
            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-dim)", fontSize: "0.78rem", marginBottom: "4px" }}>
                <Clock size={14} color="var(--neon-cyan)" />
                <span>Estimated Crack Time</span>
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                {analysis.crackTime}
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-dim)", fontSize: "0.78rem", marginBottom: "4px" }}>
                <Binary size={14} color="var(--neon-purple)" />
                <span>Entropy Bits</span>
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                {analysis.entropy} <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 400 }}>bits</span>
              </div>
            </div>
          </div>

          {/* Warnings (if any) */}
          {analysis.warnings.length > 0 && (
            <div style={{ background: "rgba(244, 63, 94, 0.12)", border: "1px solid rgba(244, 63, 94, 0.3)", borderRadius: "var(--radius-md)", padding: "14px", marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fda4af", fontWeight: 700, fontSize: "0.85rem", marginBottom: "6px" }}>
                <AlertTriangle size={16} />
                <span>Vulnerability Warning</span>
              </div>
              {analysis.warnings.map((w, i) => (
                <div key={i} style={{ color: "#fecdd3", fontSize: "0.82rem", lineHeight: 1.4 }}>
                  • {w}
                </div>
              ))}
            </div>
          )}

          {/* Requirements Checklist */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
              Complexity Requirements
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {Object.entries(analysis.checks).map(([key, check]) => {
                const passed = check.passed;
                return (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.88rem", padding: "8px 12px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {passed ? (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-emerald)" }}>
                          <Check size={13} />
                        </div>
                      ) : (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)" }}>
                          <X size={13} />
                        </div>
                      )}
                      <span style={{ color: passed ? "var(--text-bright)" : "var(--text-muted)" }}>
                        {check.label}
                      </span>
                    </div>
                    {check.count > 0 && (
                      <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                        {check.count} found
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Password Generator & Safety Recommendations */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Built-in Cryptographic Password Generator */}
          <div className="glass-panel" style={{ padding: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={20} color="var(--neon-purple)" />
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}>
                  Generate Strong Password
                </h2>
              </div>
              <Badge variant="purple">Crypto-Random</Badge>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Password Length</span>
                <span style={{ fontWeight: 800, color: "var(--neon-purple)" }}>{genLength} characters</span>
              </div>
              <input
                type="range"
                min="10"
                max="32"
                value={genLength}
                onChange={(e) => setGenLength(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--neon-purple)", cursor: "pointer" }}
              />
            </div>

            {/* Toggles */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={genUpper}
                  onChange={(e) => setGenUpper(e.target.checked)}
                  style={{ accentColor: "var(--neon-purple)" }}
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={genNumbers}
                  onChange={(e) => setGenNumbers(e.target.checked)}
                  style={{ accentColor: "var(--neon-purple)" }}
                />
                <span>Numbers (0-9)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={genSymbols}
                  onChange={(e) => setGenSymbols(e.target.checked)}
                  style={{ accentColor: "var(--neon-purple)" }}
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>

            <button 
              className="btn-cyber-primary" 
              onClick={handleGenerate}
              style={{ width: "100%" }}
            >
              <RefreshCw size={16} />
              <span>Generate & Test Password</span>
            </button>
          </div>

          {/* Actionable Suggestions & Advice */}
          <div className="glass-panel" style={{ padding: "26px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Info size={18} color="var(--neon-cyan)" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                Recommendations & Safety Tips
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {analysis.suggestions.map((suggestion, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 14px",
                    fontSize: "0.85rem",
                    color: "var(--text-bright)",
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px"
                  }}
                >
                  <span style={{ color: "var(--neon-cyan)", fontWeight: 700 }}>•</span>
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>

            {/* Passphrase Pro Tip */}
            <div style={{ marginTop: "18px", padding: "14px", background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--neon-cyan)", marginBottom: "4px" }}>
                💡 Pro-Tip: The Passphrase Method
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Instead of trying to memorize <code style={{ color: "#fff", background: "rgba(0,0,0,0.3)", padding: "2px 4px", borderRadius: "3px" }}>Tr0ub4dor&3</code>, use four random memorable words separated by hyphens: <code style={{ color: "#fff", background: "rgba(0,0,0,0.3)", padding: "2px 4px", borderRadius: "3px" }}>Cosmic-Penguin-Guitar-99!</code>. It has higher entropy and takes millions of years to crack!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
