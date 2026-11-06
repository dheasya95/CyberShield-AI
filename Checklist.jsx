import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { 
  CheckSquare, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Wrench, 
  Check
} from "lucide-react";
import { CHECKLIST_ITEMS } from "../data/checklistData.js";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";

export default function Checklist() {
  const { 
    progress, 
    toggleChecklistItem, 
    completedChecklistCount, 
    totalChecklistItems, 
    checklistPercentage 
  } = useUserProgress();

  const [expandedItems, setExpandedItems] = useState({
    "check-passwords": true // Expand first item by default for intuitive discovery
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'completed', 'pending'

  const categories = useMemo(() => {
    const cats = new Set(CHECKLIST_ITEMS.map(i => i.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter(item => {
      const isDone = !!progress.checklistCompleted[item.id];
      if (statusFilter === "completed" && !isDone) return false;
      if (statusFilter === "pending" && isDone) return false;
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      return true;
    });
  }, [categoryFilter, statusFilter, progress.checklistCompleted]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleItem = (id) => {
    const willBeCompleted = !progress.checklistCompleted[id];
    toggleChecklistItem(id);

    // If this item was the last uncompleted one, celebrate with confetti
    if (willBeCompleted && completedChecklistCount === totalChecklistItems - 1) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-emerald)" }}>
            <CheckSquare size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
              Personal Security Hygiene Checklist
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Essential proactive defenses to lock down your accounts, devices, and personal identity.
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Defense Score Impact Card */}
      <div className="glass-panel" style={{ padding: "26px 30px", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <ShieldCheck size={18} color="var(--neon-emerald)" />
              <span style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, color: "var(--neon-emerald)", letterSpacing: "0.5px" }}>
                Defense Readiness
              </span>
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff" }}>
              {completedChecklistCount} of {totalChecklistItems} Security Safeguards Active ({checklistPercentage}%)
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Badge variant={checklistPercentage === 100 ? "emerald" : checklistPercentage >= 60 ? "cyan" : "amber"}>
              {checklistPercentage === 100 ? "Perimeter Fortified!" : `${totalChecklistItems - completedChecklistCount} Recommended Action${totalChecklistItems - completedChecklistCount === 1 ? "" : "s"}`}
            </Badge>
          </div>
        </div>

        <ProgressBar progress={checklistPercentage} variant={checklistPercentage === 100 ? "emerald" : "cyber"} height={9} />

        <div style={{ marginTop: "14px", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span>Checklist progress directly determines 45% of your total Defense Security Score.</span>
          <span style={{ color: "var(--neon-cyan)" }}>Locally saved in your browser</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
        {/* Category Filters */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={categoryFilter === cat ? "btn-cyber-primary" : "btn-cyber-outline"}
              style={{ padding: "6px 14px", fontSize: "0.82rem", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255, 255, 255, 0.04)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
          <button
            onClick={() => setStatusFilter("all")}
            style={{ 
              background: statusFilter === "all" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              border: "none",
              color: statusFilter === "all" ? "#fff" : "var(--text-muted)",
              padding: "5px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            All ({CHECKLIST_ITEMS.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            style={{ 
              background: statusFilter === "pending" ? "rgba(244, 63, 94, 0.15)" : "transparent",
              border: "none",
              color: statusFilter === "pending" ? "var(--neon-rose)" : "var(--text-muted)",
              padding: "5px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Pending ({totalChecklistItems - completedChecklistCount})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            style={{ 
              background: statusFilter === "completed" ? "rgba(16, 185, 129, 0.15)" : "transparent",
              border: "none",
              color: statusFilter === "completed" ? "var(--neon-emerald)" : "var(--text-muted)",
              padding: "5px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Completed ({completedChecklistCount})
          </button>
        </div>
      </div>

      {/* Checklist Items Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredItems.map((item) => {
          const isDone = !!progress.checklistCompleted[item.id];
          const isExpanded = !!expandedItems[item.id];

          return (
            <div 
              key={item.id}
              className="glass-panel"
              style={{ 
                border: isDone ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-subtle)",
                background: isDone ? "rgba(16, 185, 129, 0.04)" : "var(--bg-card)",
                transition: "all 0.2s ease",
                overflow: "hidden"
              }}
            >
              {/* Main Summary Header Row */}
              <div 
                style={{ 
                  padding: "20px 24px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer"
                }}
                onClick={() => toggleExpand(item.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                  {/* Interactive Checkbox Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleItem(item.id);
                    }}
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "8px", 
                      border: isDone ? "2px solid var(--neon-emerald)" : "2px solid rgba(255, 255, 255, 0.3)",
                      background: isDone ? "var(--neon-emerald)" : "rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#050814",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      boxShadow: isDone ? "0 0 12px rgba(16, 185, 129, 0.4)" : "none"
                    }}
                    aria-label={`Toggle ${item.title}`}
                  >
                    {isDone && <Check size={20} strokeWidth={3} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px", flexWrap: "wrap" }}>
                      <Badge variant={item.difficulty === "Critical" ? "rose" : item.difficulty === "Essential" ? "cyan" : "purple"}>
                        {item.difficulty}
                      </Badge>
                      <Badge variant="blue">{item.category}</Badge>
                      <span style={{ fontSize: "0.75rem", color: "var(--neon-amber)", fontWeight: 600 }}>
                        +{item.points} pts
                      </span>
                    </div>

                    <h3 style={{ 
                      fontSize: "1.1rem", 
                      fontWeight: 700, 
                      color: isDone ? "#a7f3d0" : "#ffffff", 
                      textDecoration: isDone ? "line-through" : "none",
                      lineHeight: 1.35
                    }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Accordion Expand Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-dim)", fontSize: "0.82rem" }}>
                  <span style={{ display: window.innerWidth > 640 ? "inline" : "none" }}>{isExpanded ? "Hide Guide" : "View Steps"}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Expandable Step-by-Step Guide */}
              {isExpanded && (
                <div style={{ padding: "0 24px 24px 72px", borderTop: "1px solid var(--border-subtle)", paddingTop: "18px" }}>
                  
                  {/* Why it Matters Callout */}
                  <div style={{ 
                    background: "rgba(139, 92, 246, 0.08)", 
                    borderLeft: "3px solid var(--neon-purple)", 
                    padding: "12px 16px", 
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    marginBottom: "18px"
                  }}>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--neon-purple)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px" }}>
                      Why This Safeguard Matters
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-bright)", lineHeight: 1.55 }}>
                      {item.whyItMatters}
                    </p>
                  </div>

                  {/* Concrete Action Steps */}
                  <div style={{ marginBottom: "18px" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
                      Action Steps:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {item.actionSteps.map((step, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                          <span style={{ 
                            width: "20px", 
                            height: "20px", 
                            borderRadius: "50%", 
                            background: "rgba(255, 255, 255, 0.08)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            fontSize: "0.75rem", 
                            fontWeight: 700, 
                            color: "var(--neon-cyan)",
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </span>
                          <span style={{ lineHeight: 1.5 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Tools */}
                  {item.recommendedTools && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "0.82rem" }}>
                      <span style={{ color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Wrench size={14} /> Recommended Tools:
                      </span>
                      {item.recommendedTools.map((tool, idx) => (
                        <span 
                          key={idx}
                          style={{ 
                            background: "rgba(255, 255, 255, 0.04)", 
                            border: "1px solid var(--border-subtle)", 
                            padding: "3px 8px", 
                            borderRadius: "6px",
                            color: "var(--text-bright)"
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Toggle status button inside accordion */}
                  <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end" }}>
                    <button 
                      className={isDone ? "btn-cyber-outline" : "btn-cyber-primary"}
                      onClick={() => handleToggleItem(item.id)}
                      style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                    >
                      {isDone ? "Mark as Incomplete" : "Mark as Implemented"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
