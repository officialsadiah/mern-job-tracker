import { useState, useEffect, useCallback } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const STATUSES = ["All", "Applied", "Interview", "Offer", "Rejected", "Withdrawn"];

  // ── Fetch jobs from API ─────────────────────────────────
  const fetchJobs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "All") params.append("status", filter);
      if (search) params.append("search", search);

      const res = await fetch(`${API_URL}/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ── Add a new job ───────────────────────────────────────
  const handleAdd = async (formData) => {
    const res = await fetch(`${API_URL}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    await res.json();
    fetchJobs();
  };

  // ── Update job status ───────────────────────────────────
  const handleUpdateStatus = async (id, newStatus) => {
    await fetch(`${API_URL}/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchJobs();
  };

  // ── Delete a job ────────────────────────────────────────
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Job Tracker</h1>
        <p>Track your applications, stay on top of the pipeline</p>
      </header>

      <main className="app-main">
        <JobForm onAdd={handleAdd} />

        <div className="filters">
          <div className="filter-tabs">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={filter === s ? "tab active" : "tab"}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <p className="empty-state">Loading...</p>
        ) : (
          <JobList
            jobs={jobs}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}