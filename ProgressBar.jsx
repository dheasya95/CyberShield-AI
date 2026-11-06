export default function ProgressBar({
  progress = 0,
  variant = "cyan",
  height = 8,
  showLabel = false,
  className = ""
}) {
  const clamped = Math.min(100, Math.max(0, progress));

  const variantGradients = {
    cyan: "linear-gradient(90deg, #06b6d4, #3b82f6)",
    purple: "linear-gradient(90deg, #8b5cf6, #ec4899)",
    emerald: "linear-gradient(90deg, #10b981, #06b6d4)",
    amber: "linear-gradient(90deg, #f59e0b, #ef4444)",
    rose: "linear-gradient(90deg, #f43f5e, #ec4899)",
    cyber: "linear-gradient(90deg, #06b6d4, #3b82f6 50%, #8b5cf6 100%)"
  };

  const fillStyle = {
    width: `${clamped}%`,
    background: variantGradients[variant] || variantGradients.cyan
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: "var(--text-bright)" }}>{clamped}%</span>
        </div>
      )}
      <div className="progress-bar-bg" style={{ height: `${height}px` }}>
        <div className="progress-bar-fill" style={fillStyle} />
      </div>
    </div>
  );
}
