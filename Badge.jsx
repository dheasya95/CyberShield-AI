export default function Badge({ variant = "cyan", children, className = "" }) {
  const badgeClass = `badge-pill badge-${variant} ${className}`;
  return (
    <span className={badgeClass}>
      {children}
    </span>
  );
}
