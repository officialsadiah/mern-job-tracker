# 🎯 Job Tracker — MERN

A full-stack job application tracker. Track, update, and manage your job pipeline.

## Tech Stack
- **MongoDB** (Atlas) — database
- **Express** — REST API
- **React** (Vite) — frontend
- **Node.js** — runtime

## Features
- ✅ Add job applications (company, role, salary, location, notes)
- ✅ Update status: Applied → Interview → Offer → Rejected → Withdrawn
- ✅ Filter by status & search by company
- ✅ Delete entries
- ✅ CRUD API with Mongoose + validation

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | List all (supports ?status= & ?search=) |
| POST | /api/jobs | Create |
| PUT | /api/jobs/:id | Update |
| DELETE | /api/jobs/:id | Delete |

## Deployed
- **Frontend:** https://mern-job-tracker-94q1pt64m-sadiah.vercel.app/
- **Backend:** https://mern-job-tracker-0lbo.onrender.com

## Run Locally
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev