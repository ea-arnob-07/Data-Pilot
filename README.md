# DataPilot — Unified Data Workspace

A standalone, browser-based MVP for collecting, exploring, editing, visualizing, and exporting datasets. The interface includes a refined product-style visual system with a graphite navigation rail, restrained indigo accents, improved typography, clearer spacing, and responsive light/dark themes.

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser (Chrome, Edge, or Firefox).
3. The workspace opens with clearly labeled sample datasets so you can try the interface immediately.
4. Import a CSV, JSON, or Excel file, or connect a Supabase table / REST API from **Data sources**.

For best results, run it through a local web server instead of opening the file directly:

```bash
# From the extracted datapilot folder
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included in this MVP

- Refined responsive SaaS interface with a graphite sidebar, restrained color palette, improved typography, and light/dark themes.
- Sample datasets for trying the app before connecting real data.
- CSV, JSON, and XLSX import (XLSX uses SheetJS from a CDN).
- Supabase REST API connection using a publishable/anon key and a selected schema/table.
- Generic JSON REST API GET connection with optional bearer token, custom headers, and response path.
- First-page fetching and incremental 500-row pagination for Supabase.
- Dataset library and dynamic Data Explorer.
- Search, sorting, pagination, column visibility, add/delete columns, add/edit/duplicate/delete rows, bulk delete, and one-step undo.
- Workspace-only edits: the original remote database is never modified by table editing actions.
- CSV, JSON, and XLSX export; CSV is UTF-8 with BOM and protects spreadsheet formula-like text.
- Live chart previews, numerical summaries, missing-value and duplicate checks, trim whitespace, and duplicate removal.
- Browser-tab polling automation and local activity history.
- Local browser storage for datasets and preferences.

## Connection notes

### Supabase

- Use the project URL, a **publishable key or legacy anon key**, schema, and table/view name.
- Ensure Row Level Security (RLS) is enabled and the anon role has only the permissions it needs.
- Never use a `service_role` key in this browser application.
- The app reads through Supabase REST (`/rest/v1/...`) and requests 500 records per page. Use **Load next 500 rows** to continue.
- It does not write changes back to Supabase.

### REST API

- The endpoint should return a JSON array, or provide the path to the array (for example `data.records`).
- Optional bearer token and additional JSON headers are supported.
- The endpoint must allow browser CORS requests.
- The generic connector appends `limit` and `offset` query parameters; the endpoint should tolerate or support them.

## Important MVP limitations

This is a front-end MVP, not a production multi-user SaaS backend.

- Supabase and REST API credentials are kept in memory only and must be entered again after a page reload. They are not stored in localStorage.
- Datasets, edits, preferences, and activity logs are stored in the current browser's localStorage. Export a workspace backup regularly.
- Automatic sync runs only while this page is open. Background scheduling, reliable retries, and notifications need a server-side worker.
- MySQL and PostgreSQL require a secure backend connector. Do not connect to them directly from browser JavaScript.
- Authentication, team permissions, server-side audit logs, realtime subscriptions, server-side pagination, and large-file streaming exports are not included yet.
- XLSX import/export depends on the SheetJS CDN being reachable. CSV and JSON work without it.

## Recommended production next step

Add a Laravel API backend with authentication, encrypted source credentials, server-side Supabase/MySQL/PostgreSQL connectors, server-side pagination/filtering, queue jobs for imports/exports, and persisted audit logs. Keep this browser app as the Vue/TypeScript front end or port its UI into the existing application architecture.

## Sidebar layout update

The workspace switcher has been removed from the sidebar. The sidebar now has its own vertical scrolling behavior and a compact layout on shorter screens so the Workspace Status card and account controls do not get clipped.
