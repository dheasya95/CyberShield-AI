import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  Settings, 
  CheckCircle2, 
  User, 
  ChevronRight, 
  X
} from "lucide-react";
import { askCyberAssistant } from "../services/aiService.js";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";

const SUGGESTED_PROMPTS = [
  "How do I spot phishing emails?",
  "What is Two-Factor Authentication (2FA)?",
  "Why do I need a password manager?",
  "Is public Wi-Fi safe?",
  "What is an OTP and why shouldn't I share it?",
  "What is credential stuffing?",
  "How to protect my social media privacy?"
];

export default function Assistant() {
  const { progress, setCustomApiKey } = useUserProgress();

  const [messages, setMessages] = useState([
    {
      id: "msg-welcome",
      sender: "bot",
      text: `Hello! I am your **CyberShield AI Educational Assistant** 🛡️.

I can help you understand online privacy, identify phishing scams, create resilient passwords, and explain cybersecurity fundamentals in plain, beginner-friendly terms.

Feel free to type your question below or click on any of the suggested topics to get started!`,
      relatedPrompts: [
        "How do I spot phishing emails?",
        "What is Two-Factor Authentication (2FA)?",
        "Why do I need a password manager?"
      ],
      time: "Just now"
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(progress.customApiKey || "");
  const [savedKeyNotice, setSavedKeyNotice] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputQuestion).trim();
    if (!query || isLoading) return;

    setInputQuestion("");

    // Add user message to thread
    const userMsg = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await askCyberAssistant(query, {
        apiKey: progress.customApiKey,
        provider: "gemini"
      });

      const botMsg = {
        id: "msg-" + (Date.now() + 1),
        sender: "bot",
        text: response.text,
        relatedPrompts: response.relatedPrompts || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: "msg-" + (Date.now() + 1),
          sender: "bot",
          text: "I encountered an error answering your question. Please try asking again or select one of the suggested topics!",
          relatedPrompts: SUGGESTED_PROMPTS.slice(0, 3),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "msg-welcome-reset",
        sender: "bot",
        text: "Chat cleared! What cybersecurity topic would you like to explore next?",
        relatedPrompts: SUGGESTED_PROMPTS.slice(0, 3),
        time: "Just now"
      }
    ]);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setCustomApiKey(apiKeyInput.trim());
    setSavedKeyNotice(true);
    setTimeout(() => {
      setSavedKeyNotice(false);
      setShowSettingsModal(false);
    }, 1200);
  };

  // Helper to render simple markdown formatting (bold, headers, bullets, code)
  const formatMessageText = (content) => {
    const lines = content.split("\n");
    return lines.map((line, lIdx) => {
      // Headings
      if (line.startsWith("### ")) {
        return (
          <h4 key={lIdx} style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--neon-cyan)", margin: "14px 0 6px" }}>
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={lIdx} style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", margin: "16px 0 8px" }}>
            {line.replace("## ", "")}
          </h3>
        );
      }
      // Bullet list items
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().substring(2);
        return (
          <div key={lIdx} style={{ display: "flex", gap: "8px", margin: "4px 0", paddingLeft: "8px" }}>
            <span style={{ color: "var(--neon-purple)" }}>•</span>
            <span>{renderInlineMarkdown(itemText)}</span>
          </div>
        );
      }
      // Numbered list items
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={lIdx} style={{ display: "flex", gap: "8px", margin: "4px 0", paddingLeft: "8px" }}>
            <span style={{ color: "var(--neon-cyan)", fontWeight: 700, minWidth: "18px" }}>{numMatch[1]}.</span>
            <span>{renderInlineMarkdown(numMatch[2])}</span>
          </div>
        );
      }
      // Regular line
      if (!line.trim()) {
        return <div key={lIdx} style={{ height: "8px" }} />;
      }
      return (
        <p key={lIdx} style={{ margin: "4px 0", lineHeight: 1.6 }}>
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text) => {
    // Regex for bold **text** and code `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} style={{ color: "#fff" }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} style={{ 
            background: "rgba(255, 255, 255, 0.08)", 
            padding: "2px 6px", 
            borderRadius: "4px", 
            fontSize: "0.88em", 
            color: "var(--neon-cyan)",
            fontFamily: "var(--font-mono)" 
          }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-cyan)" }}>
            <Bot size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>
              Cyber Learning Assistant
            </h1>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Interactive educational tutor for beginner cybersecurity questions
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            className="btn-cyber-outline"
            onClick={handleClearChat}
            style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            title="Clear Chat History"
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>

          <button 
            className="btn-cyber-outline"
            onClick={() => setShowSettingsModal(true)}
            style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            title="Configure Custom AI Key (Optional)"
          >
            <Settings size={15} />
            <span>{progress.customApiKey ? "API Connected" : "API Config"}</span>
          </button>
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div style={{ 
        background: "rgba(139, 92, 246, 0.08)", 
        border: "1px solid rgba(139, 92, 246, 0.25)", 
        borderRadius: "var(--radius-md)", 
        padding: "10px 16px", 
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.82rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={16} color="var(--neon-purple)" />
          <span>
            <strong style={{ color: "#fff" }}>Built-in Educational Demo: </strong> 
            Answers are curated offline for safe learning. No account or paid AI API required.
          </span>
        </div>
        <Badge variant="purple">Demo AI</Badge>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "12px" }}>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="btn-cyber-outline"
            style={{ 
              padding: "5px 12px", 
              fontSize: "0.78rem", 
              borderRadius: "var(--radius-full)", 
              whiteSpace: "nowrap",
              background: "rgba(255, 255, 255, 0.02)"
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div 
        className="glass-panel"
        style={{ 
          flex: 1, 
          overflowY: "auto", 
          padding: "24px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "18px",
          marginBottom: "16px"
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div 
              key={msg.id}
              style={{ 
                display: "flex", 
                justifyContent: isUser ? "flex-end" : "flex-start",
                gap: "12px",
                maxWidth: "100%"
              }}
            >
              {!isUser && (
                <div style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "50%", 
                  background: "var(--grad-cyber)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff",
                  flexShrink: 0,
                  boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)"
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{ maxWidth: isUser ? "75%" : "82%" }}>
                <div 
                  style={{ 
                    padding: "16px 20px", 
                    borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: isUser ? "linear-gradient(135deg, #06b6d4, #3b82f6)" : "rgba(14, 23, 47, 0.8)",
                    border: isUser ? "none" : "1px solid rgba(255, 255, 255, 0.09)",
                    color: isUser ? "#ffffff" : "var(--text-bright)",
                    fontSize: "0.93rem",
                    boxShadow: isUser ? "0 4px 15px rgba(6, 182, 212, 0.3)" : "0 4px 20px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {isUser ? msg.text : formatMessageText(msg.text)}

                  {/* Follow-up Prompts if present */}
                  {!isUser && msg.relatedPrompts && msg.relatedPrompts.length > 0 && (
                    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--neon-cyan)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                        Suggested Follow-ups:
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {msg.relatedPrompts.map((rel, rIdx) => (
                          <button
                            key={rIdx}
                            onClick={() => handleSendMessage(rel)}
                            disabled={isLoading}
                            style={{ 
                              background: "rgba(255, 255, 255, 0.04)", 
                              border: "1px solid var(--border-subtle)", 
                              color: "var(--text-bright)", 
                              padding: "6px 12px", 
                              borderRadius: "6px",
                              fontSize: "0.82rem",
                              textAlign: "left",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              transition: "all 0.2s ease"
                            }}
                          >
                            <span>{rel}</span>
                            <ChevronRight size={14} color="var(--neon-cyan)" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px", display: "block", textAlign: isUser ? "right" : "left", padding: "0 4px" }}>
                  {msg.time}
                </span>
              </div>

              {isUser && (
                <div style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "50%", 
                  background: "rgba(255, 255, 255, 0.1)", 
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff",
                  flexShrink: 0
                }}>
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "50%", 
              background: "var(--grad-cyber)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#fff",
              flexShrink: 0 
            }}>
              <Bot size={18} />
            </div>
            <div style={{ 
              background: "rgba(14, 23, 47, 0.8)", 
              border: "1px solid rgba(255, 255, 255, 0.09)", 
              borderRadius: "18px 18px 18px 4px", 
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Assistant is researching...</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <span className="typing-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--neon-cyan)", animation: "pulse 1s infinite alternate" }} />
                <span className="typing-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--neon-purple)", animation: "pulse 1s infinite alternate 0.2s" }} />
                <span className="typing-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--neon-pink)", animation: "pulse 1s infinite alternate 0.4s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input 
          ref={inputRef}
          type="text" 
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about cybersecurity (e.g., 'How to avoid phishing?')..."
          className="cyber-input"
          style={{ flex: 1, padding: "14px 18px", fontSize: "0.95rem" }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={!inputQuestion.trim() || isLoading}
          className="btn-cyber-primary"
          style={{ padding: "14px 22px", borderRadius: "var(--radius-md)" }}
        >
          <Send size={18} />
        </button>
      </form>

      {/* Settings Modal (For future live AI integration) */}
      {showSettingsModal && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          background: "rgba(0, 0, 0, 0.75)", 
          backdropFilter: "blur(6px)", 
          zIndex: 99, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "20px"
        }}>
          <div className="glass-panel" style={{ maxWidth: "520px", width: "100%", padding: "32px", position: "relative" }}>
            <button 
              onClick={() => setShowSettingsModal(false)}
              style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Settings size={22} color="var(--neon-cyan)" />
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>
                AI Assistant Configuration
              </h2>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
              By default, CyberShield AI runs on a rich offline educational knowledge base that requires <strong>no API keys or external calls</strong>.
              <br /><br />
              If you wish to experiment with live model responses (e.g., Google Gemini), you can save your personal key here. It remains strictly in your browser&apos;s LocalStorage.
            </p>

            <form onSubmit={handleSaveApiKey}>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-bright)", marginBottom: "8px" }}>
                  Optional Gemini API Key
                </label>
                <input 
                  type="password" 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..." 
                  className="cyber-input"
                />
              </div>

              {savedKeyNotice && (
                <div style={{ color: "var(--neon-emerald)", fontSize: "0.85rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} /> Key settings updated successfully!
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {progress.customApiKey ? (
                  <button 
                    type="button" 
                    onClick={() => {
                      setApiKeyInput("");
                      setCustomApiKey("");
                    }}
                    style={{ background: "transparent", border: "none", color: "var(--neon-rose)", cursor: "pointer", fontSize: "0.82rem" }}
                  >
                    Remove Saved Key
                  </button>
                ) : <div />}

                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    type="button" 
                    className="btn-cyber-outline"
                    onClick={() => setShowSettingsModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-cyber-primary">
                    Save Preference
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
