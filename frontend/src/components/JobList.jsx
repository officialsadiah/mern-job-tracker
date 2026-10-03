import JobCard from "./JobCard";

export default function JobList({ jobs, onUpdateStatus, onDelete }) {
  if (jobs.length === 0) {
    return <p className="empty-state">No jobs yet. Add your first application above! 🚀</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}