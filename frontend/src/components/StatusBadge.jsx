export default function StatusBadge({ status }) {
  const colorMap = {
    Applied: "#3b82f6",
    Interview: "#f59e0b",
    Offer: "#10b981",
    Rejected: "#ef4444",
    Withdrawn: "#6b7280",
  };

  return (
    <span
      className="status-badge"
      style={{ backgroundColor: colorMap[status] || "#6b7280" }}
    >
      {status}
    </span>
  );
}