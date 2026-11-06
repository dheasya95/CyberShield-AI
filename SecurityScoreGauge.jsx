export default function SecurityScoreGauge({ score = 0, size = 160, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = "#06b6d4";
  if (score >= 80) strokeColor = "#10b981";
  else if (score >= 60) strokeColor = "#06b6d4";
  else if (score >= 40) strokeColor = "#f59e0b";
  else strokeColor = "#f43f5e";

  return (
    <div style={{ position: "relative", width: `${size}px`, height: `${size}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease",
            filter: `drop-shadow(0 0 10px ${strokeColor})`
          }}
        />
      </svg>
      {/* Center text */}
      <div style={{ position: "absolute", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ fontSize: `${size * 0.26}px`, fontWeight: 800, color: "#ffffff", lineHeight: 1, letterSpacing: "-1px" }}>
          {score}
        </span>
        <span style={{ fontSize: `${Math.max(10, size * 0.08)}px`, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>
          Security Score
        </span>
      </div>
    </div>
  );
}
