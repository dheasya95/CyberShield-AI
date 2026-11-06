import { useState, useMemo } from "react";
import { 
  Sparkles, 
  KeyRound, 
  Share2, 
  Mail, 
  Smartphone, 
  Wifi, 
  Copy, 
  Check, 
  Bookmark, 
  Search, 
  AlertCircle, 
  Lightbulb
} from "lucide-react";
import { SECURITY_TIPS, TIPS_CATEGORIES } from "../data/tipsData.js";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";

const CATEGORY_ICONS = {
  Sparkles: Sparkles,
  KeyRound: KeyRound,
  Share2: Share2,
  Mail: Mail,
  Smartphone: Smartphone,
  Wifi: Wifi
};

export default function SecurityTips() {
  const { progress, toggleBookmarkTip } = useUserProgress();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [featuredDay] = useState(() => new Date().getDate());

  // Daily featured tip is determined deterministically by day of month
  const featuredTipIndex = useMemo(() => {
    return featuredDay % SECURITY_TIPS.length;
  }, [featuredDay]);
  const featuredTip = SECURITY_TIPS[featuredTipIndex];

  // Filtering
  const filteredTips = useMemo(() => {
    return SECURITY_TIPS.filter(tip => {
      // Category check
      if (activeCategory !== "all" && tip.category !== activeCategory) {
        return false;
      }
      // Bookmark check
      if (onlyBookmarked && !progress.bookmarkedTips.includes(tip.id)) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tip.title.toLowerCase().includes(q);
        const matchesSummary = tip.summary.toLowerCase().includes(q);
        const matchesExample = tip.example.toLowerCase().includes(q);
        const matchesTag = tip.tag.toLowerCase().includes(q);
        return matchesTitle || matchesSummary || matchesExample || matchesTag;
      }
      return true;
    });
  }, [activeCategory, onlyBookmarked, searchQuery, progress.bookmarkedTips]);

  const handleCopyTip = (tip) => {
    navigator.clipboard.writeText(`CyberShield AI Safety Tip: ${tip.title}\n\n${tip.summary}\nExample: ${tip.example}`);
    setCopiedId(tip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(236, 72, 153, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-pink)" }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
              Daily Security Tips & Best Practices
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Actionable, high-impact security habits to protect your privacy, accounts, and mobile devices every day.
            </p>
          </div>
        </div>
      </div>

      {/* Featured "Tip of the Day" Hero Card */}
      {featuredTip && !onlyBookmarked && !searchQuery && (
        <div 
          className="hero-banner" 
          style={{ 
            marginBottom: "32px", 
            border: "1px solid rgba(236, 72, 153, 0.35)",
            background: "linear-gradient(135deg, rgba(20, 15, 45, 0.9) 0%, rgba(35, 15, 50, 0.8) 100%)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Badge variant="pink">Tip of the Day</Badge>
              <Badge variant="cyan">{featuredTip.impact}</Badge>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                className="btn-cyber-outline" 
                onClick={() => toggleBookmarkTip(featuredTip.id)}
                style={{ padding: "6px 12px", fontSize: "0.82rem" }}
              >
                <Bookmark 
                  size={15} 
                  fill={progress.bookmarkedTips.includes(featuredTip.id) ? "var(--neon-cyan)" : "transparent"} 
                  color="var(--neon-cyan)" 
                />
                <span>{progress.bookmarkedTips.includes(featuredTip.id) ? "Bookmarked" : "Bookmark"}</span>
              </button>

              <button 
                className="btn-cyber-outline" 
                onClick={() => handleCopyTip(featuredTip)}
                style={{ padding: "6px 12px", fontSize: "0.82rem" }}
              >
                {copiedId === featuredTip.id ? <Check size={15} color="var(--neon-emerald)" /> : <Copy size={15} />}
                <span>{copiedId === featuredTip.id ? "Copied!" : "Copy Tip"}</span>
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
            {featuredTip.title}
          </h2>

          <p style={{ fontSize: "1.05rem", color: "var(--text-bright)", lineHeight: 1.6, marginBottom: "16px", maxWidth: "850px" }}>
            {featuredTip.summary}
          </p>

          <div style={{ 
            background: "rgba(255, 255, 255, 0.04)", 
            borderRadius: "var(--radius-md)", 
            padding: "14px 18px", 
            borderLeft: "3px solid var(--neon-pink)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem",
            color: "var(--text-muted)"
          }}>
            <Lightbulb size={18} color="var(--neon-pink)" style={{ flexShrink: 0 }} />
            <span><strong style={{ color: "#fff" }}>Example: </strong>{featuredTip.example}</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        
        {/* Category Filter Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px" }}>
          {TIPS_CATEGORIES.map(cat => {
            const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOnlyBookmarked(false);
                }}
                className={isActive && !onlyBookmarked ? "btn-cyber-primary" : "btn-cyber-outline"}
                style={{ 
                  padding: "7px 14px", 
                  fontSize: "0.82rem", 
                  borderRadius: "var(--radius-full)", 
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Bookmarks Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          
          <div style={{ position: "relative", minWidth: "220px" }}>
            <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
            <input 
              type="text" 
              placeholder="Search tips..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cyber-input"
              style={{ paddingLeft: "36px", fontSize: "0.85rem", padding: "8px 12px 8px 36px" }}
            />
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={onlyBookmarked ? "btn-cyber-secondary" : "btn-cyber-outline"}
            style={{ padding: "8px 14px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Bookmark size={15} fill={onlyBookmarked ? "var(--neon-purple)" : "transparent"} />
            <span>Saved ({progress.bookmarkedTips.length})</span>
          </button>
        </div>
      </div>

      {/* Tips Cards Grid */}
      {filteredTips.length === 0 ? (
        <div className="glass-panel" style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
          <AlertCircle size={36} color="var(--text-dim)" style={{ margin: "0 auto 12px" }} />
          <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "6px" }}>No tips found</h3>
          <p style={{ fontSize: "0.9rem" }}>
            {onlyBookmarked 
              ? "You haven't bookmarked any tips yet. Click the bookmark icon on any card to save it for quick access."
              : "Try adjusting your search query or selecting a different category."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {filteredTips.map((tip) => {
            const isBookmarked = progress.bookmarkedTips.includes(tip.id);
            const isCopied = copiedId === tip.id;

            return (
              <div 
                key={tip.id}
                className="glass-panel"
                style={{ 
                  padding: "24px", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  transition: "all 0.2s ease"
                }}
              >
                <div>
                  {/* Top Row: Category & Badges */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <Badge variant={tip.impact === "Critical" ? "rose" : tip.impact === "Essential" ? "cyan" : "purple"}>
                        {tip.impact}
                      </Badge>
                      <Badge variant="blue">{tip.tag}</Badge>
                    </div>

                    <button 
                      onClick={() => toggleBookmarkTip(tip.id)}
                      style={{ 
                        background: "transparent", 
                        border: "none", 
                        cursor: "pointer", 
                        color: isBookmarked ? "var(--neon-pink)" : "var(--text-dim)",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center"
                      }}
                      title={isBookmarked ? "Remove Bookmark" : "Save Tip"}
                    >
                      <Bookmark size={18} fill={isBookmarked ? "var(--neon-pink)" : "transparent"} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#fff", marginBottom: "10px", lineHeight: 1.35 }}>
                    {tip.title}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "var(--text-bright)", lineHeight: 1.55, marginBottom: "16px" }}>
                    {tip.summary}
                  </p>

                  <div style={{ 
                    background: "rgba(255, 255, 255, 0.02)", 
                    border: "1px solid var(--border-subtle)", 
                    borderRadius: "var(--radius-sm)", 
                    padding: "10px 14px", 
                    fontSize: "0.82rem", 
                    color: "var(--text-muted)",
                    marginBottom: "18px"
                  }}>
                    <strong style={{ color: "var(--neon-cyan)" }}>Action Example: </strong>
                    {tip.example}
                  </div>
                </div>

                {/* Footer with Copy */}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  paddingTop: "14px", 
                  borderTop: "1px solid var(--border-subtle)" 
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "capitalize" }}>
                    Category: {tip.category}
                  </span>

                  <button 
                    onClick={() => handleCopyTip(tip)}
                    className="btn-cyber-outline"
                    style={{ padding: "5px 12px", fontSize: "0.78rem" }}
                  >
                    {isCopied ? <Check size={13} color="var(--neon-emerald)" /> : <Copy size={13} />}
                    <span>{isCopied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
