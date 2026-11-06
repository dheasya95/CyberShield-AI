import { useState, useMemo } from "react";
import { 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  XCircle, 
  Info, 
  RotateCcw,
  Sparkles,
  Lock
} from "lucide-react";
import { analyzePhishing, SAMPLE_PHISHING_CASES } from "../services/phishingAnalyzer.js";
import Badge from "../components/common/Badge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";

export default function PhishingChecker() {
  const [inputText, setInputText] = useState("");

  // Analysis result
  const result = useMemo(() => {
    if (!inputText.trim()) return null;
    return analyzePhishing(inputText);
  }, [inputText]);

  const handleScan = (e) => {
    e.preventDefault();
  };

  const handleLoadSample = (sample) => {
    setInputText(sample.text);
  };

  const handleReset = () => {
    setInputText("");
  };

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div style={{ marginBottom: "26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(244, 63, 94, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-rose)" }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
              Phishing Awareness & URL Scanner
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Evaluate suspicious SMS messages, deceptive emails, and lookalike domains using defensive heuristics.
            </p>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "10px 16px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "#fcd34d" }}>
          <Info size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>Educational Heuristic Notice:</strong> This tool analyzes pattern heuristics in text and links locally in your browser to build awareness. It is <em>not</em> an automated antivirus scanner and cannot guarantee that an unflagged link is 100% safe. <strong>Never click or open links you do not fully trust.</strong>
          </div>
        </div>
      </div>

      {/* Quick Test Sample Cases */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <Sparkles size={16} color="var(--neon-cyan)" />
          <span>Quick Test with Preloaded Scenarios:</span>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {SAMPLE_PHISHING_CASES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className="btn-cyber-secondary"
              style={{ fontSize: "0.82rem", padding: "6px 14px" }}
            >
              <Badge variant={sample.type === "URL" ? "purple" : sample.id.includes("safe") ? "emerald" : "rose"}>
                {sample.type}
              </Badge>
              <span>{sample.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
        
        {/* Left Box: Input and Controls */}
        <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleScan} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Paste Suspicious Text or URL
              </label>
              {inputText && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{ background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setAnalyzed(true);
              }}
              placeholder="Paste an email body, text message, WhatsApp forward, or suspicious URL here to analyze threat indicators..."
              className="cyber-input cyber-textarea"
              style={{ flex: 1, minHeight: "180px", marginBottom: "18px", fontSize: "0.92rem" }}
            />

            <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                {inputText.length} characters entered
              </div>
              <button 
                type="submit" 
                className="btn-cyber-primary"
                disabled={!inputText.trim()}
                style={{ opacity: inputText.trim() ? 1 : 0.6 }}
              >
                <Search size={16} />
                <span>Run Heuristic Scan</span>
              </button>
            </div>
          </form>

          {/* Privacy Note */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-dim)" }}>
            <Lock size={14} color="var(--neon-cyan)" />
            <span>100% In-Browser. Links are never requested or fetched over the network.</span>
          </div>
        </div>

        {/* Right Box: Results & Threat Breakdown */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          {!result ? (
            <div style={{ textAlign: "center", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-dim)" }}>
              <Search size={48} style={{ opacity: 0.3, marginBottom: "16px" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}>
                Ready to Analyze
              </h3>
              <p style={{ fontSize: "0.85rem", maxWidth: "340px", lineHeight: 1.5 }}>
                Paste a suspicious message or choose one of the preloaded example cases above to evaluate threat risk.
              </p>
            </div>
          ) : (
            <div>
              {/* Risk Level Header Card */}
              <div style={{ background: `rgba(${result.color === "rose" ? "244, 63, 94" : result.color === "amber" ? "245, 158, 11" : "16, 185, 129"}, 0.12)`, border: `1px solid var(--neon-${result.color})`, borderRadius: "var(--radius-md)", padding: "18px 20px", marginBottom: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {result.color === "rose" ? (
                      <XCircle size={22} color="var(--neon-rose)" />
                    ) : result.color === "amber" ? (
                      <AlertTriangle size={22} color="var(--neon-amber)" />
                    ) : (
                      <CheckCircle size={22} color="var(--neon-emerald)" />
                    )}
                    <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                      {result.label}
                    </span>
                  </div>
                  <Badge variant={result.color}>Score: {result.riskScore}/100</Badge>
                </div>

                <p style={{ fontSize: "0.88rem", color: "var(--text-bright)", lineHeight: 1.5 }}>
                  {result.verdict}
                </p>

                <div style={{ marginTop: "12px" }}>
                  <ProgressBar progress={result.riskScore} variant={result.color} height={6} />
                </div>
              </div>

              {/* Detected Indicators List */}
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                Analysis Findings ({result.flagsCount} flags detected)
              </h3>

              {result.flags.length === 0 ? (
                <div style={{ padding: "16px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "var(--radius-md)", color: "#a7f3d0", fontSize: "0.85rem" }}>
                  ✓ No high-urgency keywords, fake domains, or sensitive credential requests found in this sample.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                  {result.flags.map((flag, idx) => (
                    <div 
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-sm)",
                        padding: "12px 14px",
                        borderLeft: `3px solid var(--neon-${flag.severity === "high" ? "rose" : flag.severity === "medium" ? "amber" : "cyan"})`
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff" }}>
                          {flag.title}
                        </span>
                        <Badge variant={flag.severity === "high" ? "rose" : flag.severity === "medium" ? "amber" : "cyan"}>
                          {flag.category}
                        </Badge>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
                        {flag.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Safe Action Advice */}
              <div style={{ marginTop: "20px", padding: "14px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--neon-cyan)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Recommended Action:
                </span>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.5 }}>
                  {result.riskScore > 30 
                    ? "Do not click any link, call unverified phone numbers, or provide OTP codes. Instead, open the official app or website directly from your browser bookmark or search."
                    : "Even if this message looks safe, verify the sender's identity if they request financial transfers or password updates."
                  }
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
