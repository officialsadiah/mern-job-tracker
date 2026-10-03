import StatusBadge from "./StatusBadge";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"];

export default function JobCard({ job, onUpdateStatus, onDelete }) {
  const handleStatusChange = (e) => {
    onUpdateStatus(job._id, e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${job.company} — ${job.role}"?`)) {
      onDelete(job._id);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-company">{job.company}</h3>
          <p className="job-role">{job.role}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="job-card-meta">
        <span>📅 Applied: {formatDate(job.appliedAt)}</span>
        {job.location && <span>📍 {job.location}</span>}
        {job.salary && <span>💰 {job.salary}</span>}
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}

      {job.link && (
        <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
          View posting →
        </a>
      )}

      <div className="job-card-actions">
        <select
          className="status-select"
          value={job.status}
          onChange={handleStatusChange}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}