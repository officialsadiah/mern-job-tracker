import { useState } from "react";

export default function JobForm({ onAdd }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    link: "",
    location: "",
    salary: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;

    await onAdd(form);
    setForm({
      company: "",
      role: "",
      link: "",
      location: "",
      salary: "",
      notes: "",
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Add a Job Application</h2>

      <div className="form-row">
        <input
          type="text"
          name="company"
          placeholder="Company *"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role / Title *"
          value={form.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <input
          type="url"
          name="link"
          placeholder="Job posting URL (optional)"
          value={form.link}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Copenhagen, Remote)"
          value={form.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          name="salary"
          placeholder="Salary (e.g. 150 DKK/hr)"
          value={form.salary}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        rows={2}
        value={form.notes}
        onChange={handleChange}
      />

      <button type="submit" className="btn-add">
        + Add Job
      </button>
    </form>
  );
}