# Shinkei

Web app for exploring **call graphs** and related code: enter a repo URL and entry function, then inspect nodes on an interactive graph and read highlighted source with optional summaries.

## Repository layout

| Directory   | Stack                         | Role |
|------------|-------------------------------|------|
| `frontend` | React 19, Vite 8, Tailwind 4  | UI: hero, workspace form, graph view, code panel |
| `backend`  | Node.js, Express, Babel       | AST parsing, repo analysis API (port **5000**) |

## Prerequisites

- **Node.js** 18+ (recommended)

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite serves the app (default **http://localhost:5173**). Build for production with `npm run build`; preview the build with `npm run preview`.

The graph flow currently uses **mock data** keyed by demo inputs (see `frontend/src/constants/mockFlows.js`). Wiring `handleAnalyze` in `App.jsx` to the backend will switch analysis to live results.

## Backend

```bash
cd backend
npm install
npm run dev
```

Uses **nodemon** for reload. The HTTP server listens on **5000** (`src/server.js`).

## Configuration

- **Graph depth:** the workspace form’s **Steps** field (1–100) limits how far the graph expands from the root when viewing the graph.
- **CORS:** adjust `backend/src/config/cors.js` if the frontend runs on a different origin.
