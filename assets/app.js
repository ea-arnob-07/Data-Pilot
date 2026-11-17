'use strict';

(() => {
  const STORAGE_KEY = 'datapilot.workspace.v1';
  const PAGE_TITLES = {
    overview: 'Overview', sources: 'Data sources', explorer: 'Data explorer', library: 'Dataset library',
    analytics: 'Live analytics', quality: 'Data quality', automations: 'Automations', exports: 'Export center',
    activity: 'Activity logs', settings: 'Settings'
  };
  const ICONS = {
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/>',
    upload: '<path d="M12 16V4m-4 4 4-4 4 4"/><path d="M4 16v4h16v-4"/>',
    download: '<path d="M12 4v12m-4-4 4 4 4-4"/><path d="M4 19h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/>',
    edit: '<path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z"/>',
    trash: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert: '<path d="M12 9v4m0 4h.01"/><circle cx="12" cy="12" r="9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.2 8 10 4.6-1.8 8-5 8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    zap: '<path d="m13 2-3 8h7l-6 12 2-9H6z"/>',
    rows: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m6-16v16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    pause: '<path d="M8 5h3v14H8zm5 0h3v14h-3z"/>',
    fileText: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7M8 14h8m-8 4h8"/>'
  };
  const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.file}</svg>`;
  const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const numberFormat = (value) => new Intl.NumberFormat('en-US').format(Number(value) || 0);
  const dateLabel = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value || '—') : date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  function demoDatasets() {
    const readings = [
      [24.2, 11, 32, 18], [24.5, 12, 34, 19], [24.8, 13, 35, 20], [25.1, 14, 36, 22],
      [24.9, 12, 34, 20], [25.4, 15, 38, 23], [25.7, 17, 40, 24], [25.2, 16, 39, 23],
      [24.7, 14, 36, 21], [24.4, 13, 35, 20], [24.8, 12, 34, 19], [25.3, 14, 37, 22],
      [25.8, 16, 41, 24], [26.1, 18, 43, 25], [25.6, 15, 39, 23], [25.2, 14, 37, 21]
    ];
    const now = Date.now();
    const waterRows = readings.map((r, i) => ({
      id: i + 1, device_id: 'esp32-01', temperature_c: r[0], turbidity_ntu: r[1], motor1_cmd: r[2], motor2_cmd: r[3],
      created_at: new Date(now - (readings.length - i - 1) * 60000).toISOString()
    }));
    const customerRows = [
      { id: 101, name: 'Ayesha Rahman', email: 'ayesha@example.com', city: 'Dhaka', status: 'Active', joined_at: '2026-10-04' },
      { id: 102, name: 'Tanvir Hasan', email: 'tanvir@example.com', city: 'Chattogram', status: 'Active', joined_at: '2026-10-08' },
      { id: 103, name: 'Nusrat Jahan', email: 'nusrat@example.com', city: 'Sylhet', status: 'Pending', joined_at: '2026-10-12' },
      { id: 104, name: 'Sabbir Ahmed', email: 'sabbir@example.com', city: 'Dhaka', status: 'Inactive', joined_at: '2026-10-14' },
      { id: 105, name: 'Maliha Islam', email: 'maliha@example.com', city: 'Rajshahi', status: 'Active', joined_at: '2026-10-18' },
      { id: 106, name: 'Rafiul Karim', email: 'rafiul@example.com', city: 'Khulna', status: 'Active', joined_at: '2026-10-21' },
      { id: 107, name: 'Sadia Akter', email: 'sadia@example.com', city: 'Dhaka', status: 'Pending', joined_at: '2026-10-25' },
      { id: 108, name: 'Fahim Chowdhury', email: 'fahim@example.com', city: 'Cumilla', status: 'Active', joined_at: '2026-10-28' }
    ];
    const salesRows = [
      { order_id: 'ORD-2401', customer: 'Ayesha Rahman', product: 'Analytics Pro', amount: 129, region: 'South Asia', ordered_at: '2026-11-01' },
      { order_id: 'ORD-2402', customer: 'Tanvir Hasan', product: 'Data Connector', amount: 79, region: 'South Asia', ordered_at: '2026-11-02' },
      { order_id: 'ORD-2403', customer: 'Nusrat Jahan', product: 'Analytics Pro', amount: 129, region: 'South Asia', ordered_at: '2026-11-03' },
      { order_id: 'ORD-2404', customer: 'Sabbir Ahmed', product: 'Starter Plan', amount: 29, region: 'South Asia', ordered_at: '2026-11-05' },
      { order_id: 'ORD-2405', customer: 'Maliha Islam', product: 'Data Connector', amount: 79, region: 'South Asia', ordered_at: '2026-11-07' },
      { order_id: 'ORD-2406', customer: 'Rafiul Karim', product: 'Analytics Pro', amount: 129, region: 'South Asia', ordered_at: '2026-11-09' }
    ];
    return [
      makeDataset('Water Monitoring', waterRows, 'demo', 'Live sensor readings and device telemetry.', 'water-monitoring'),
      makeDataset('Customer Records', customerRows, 'demo', 'Customer profile and account status records.', 'customer-records'),
      makeDataset('Sales Transactions', salesRows, 'demo', 'Recent orders and transaction details.', 'sales-transactions')
    ];
  }

  function inferType(value) {
    if (value === null || value === undefined || value === '') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number' || (!Number.isNaN(Number(value)) && String(value).trim() !== '')) return 'number';
    if (typeof value === 'string' && !Number.isNaN(Date.parse(value)) && /[-T/:]/.test(value)) return 'date';
    return 'string';
  }
  function makeDataset(name, rows, sourceType = 'file', description = '', id = uid()) {
    const normalized = rows.map((row, index) => ({ ...row, _rowId: row._rowId || uid() }));
    const keys = [...new Set(normalized.flatMap((row) => Object.keys(row).filter((key) => key !== '_rowId')))];
    return {
      id, name, description, sourceType, sourceId: null,
      columns: keys.map((key) => ({ key, label: key.replace(/_/g, ' '), type: inferType(normalized.find((row) => row[key] !== null && row[key] !== undefined)?.[key]), visible: true })),
      rows: normalized, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isDemo: sourceType === 'demo'
    };
  }

  function initialState() {
    return {
      datasets: demoDatasets(), sources: [], activity: [], selectedDatasetId: 'water-monitoring',
      theme: 'light', bannerDismissed: false, autoSync: false, syncInterval: 30, savedViews: []
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialState();
      const parsed = JSON.parse(raw);
      const base = initialState();
      const merged = { ...base, ...parsed };
      if (!Array.isArray(merged.datasets) || !merged.datasets.length) merged.datasets = base.datasets;
      merged.datasets.forEach((dataset) => {
        dataset.rows = Array.isArray(dataset.rows) ? dataset.rows : [];
        dataset.rows.forEach((row) => { if (!row._rowId) row._rowId = uid(); });
        dataset.columns = Array.isArray(dataset.columns) ? dataset.columns : [];
      });
      if (!merged.datasets.some((d) => d.id === merged.selectedDatasetId)) merged.selectedDatasetId = merged.datasets[0]?.id || null;
      return merged;
    } catch (_) { return initialState(); }
  }

  const state = loadState();
  const sourceSecrets = Object.create(null); // Secrets intentionally stay in memory only.
  const undoStack = [];
  let activePage = 'overview';
  let explorerSearch = '';
  let activeFilters = [];
  let explorerSort = { key: null, direction: 'asc' };
  let explorerPage = 1;
  let explorerPageSize = 10;
  let selectedRows = new Set();
  let showColumnMenu = false;
  let analyticsColumn = '';
  let analyticsChartType = 'line';
  let autoSyncTimer = null;
  let chartResizeTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const currentDataset = () => state.datasets.find((d) => d.id === state.selectedDatasetId) || state.datasets[0] || null;
  const getSource = (id) => state.sources.find((s) => s.id === id);
  const visibleColumns = (dataset) => (dataset?.columns || []).filter((column) => column.visible !== false);

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (error) { toast('Local storage is full. Export your data to keep a backup.', 'error'); }
    document.body.classList.toggle('theme-dark', state.theme === 'dark');
    $('#sourceCount').textContent = state.sources.length;
    $('#demoBanner').style.display = state.bannerDismissed || state.datasets.some((d) => !d.isDemo) ? 'none' : 'flex';
  }
  function addActivity(title, detail, type = 'info') {
    state.activity.unshift({ id: uid(), title, detail, type, at: new Date().toISOString() });
    state.activity = state.activity.slice(0, 80);
    persist();
  }
  function toast(message, type = 'success') {
    const node = document.createElement('div');
    node.className = `toast ${type === 'error' ? 'error' : ''}`;
    node.innerHTML = `${icon(type === 'error' ? 'alert' : 'check')}<span>${esc(message)}</span>`;
    $('#toastRegion').appendChild(node);
    setTimeout(() => node.remove(), 3600);
  }
  function setPage(page) {
    if (!PAGE_TITLES[page]) return;
    activePage = page;
    $$('.nav-item[data-page]').forEach((button) => button.classList.toggle('active', button.dataset.page === page));
    $('#breadcrumbCurrent').textContent = PAGE_TITLES[page];
    $('#sidebar').classList.remove('open');
    $('#sidebarOverlay').classList.remove('show');
    renderPage();
  }
  function heading(title, description, actions = '') {
    return `<div class="page-heading"><div><div class="eyebrow"><span class="eyebrow-mark"></span>WORKSPACE / ${esc(PAGE_TITLES[activePage].toUpperCase())}</div><h1>${title}</h1><p>${description}</p></div><div class="heading-actions">${actions}</div></div>`;
  }
  function emptyState(title, description, buttonLabel = 'Add data', action = 'import') {
    return `<div class="empty-state"><div class="empty-state-icon">${icon('database')}</div><h3>${esc(title)}</h3><p>${esc(description)}</p><button class="button button-primary" data-action="${action}">${icon('plus')}${esc(buttonLabel)}</button></div>`;
  }
  function statCard(label, value, sub, iconName, tone = '') {
    return `<div class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon ${tone}">${icon(iconName)}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${sub}</div></div>`;
  }
  function activityMarkup(limit = 5) {
    if (!state.activity.length) return '<div class="table-empty">No activity yet. Your data actions will appear here.</div>';
    return `<div class="activity-list">${state.activity.slice(0, limit).map((item) => `<div class="activity-row"><div class="activity-mark">${icon(item.type === 'error' ? 'alert' : item.type === 'sync' ? 'refresh' : item.type === 'export' ? 'download' : 'activity')}</div><div class="activity-info"><strong>${esc(item.title)}</strong><span>${esc(item.detail)} · ${dateLabel(item.at)}</span></div></div>`).join('')}</div>`;
  }
  function datasetSelect() {
    return `<select class="select-control" data-role="dataset-select" aria-label="Choose dataset">${state.datasets.map((d) => `<option value="${esc(d.id)}" ${d.id === state.selectedDatasetId ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select>`;
  }
  function renderOverview() {
    const totalRows = state.datasets.reduce((sum, d) => sum + d.rows.length, 0);
    const totalColumns = state.datasets.reduce((sum, d) => sum + d.columns.length, 0);
    const activeSources = state.sources.filter((s) => s.status === 'connected' && sourceSecrets[s.id]).length;
    const latest = state.sources.map((s) => s.lastSync).filter(Boolean).sort().at(-1);
    const actions = `<button class="button button-secondary" data-action="import">${icon('upload')}Import data</button><button class="button button-primary" data-action="add-source">${icon('plus')}Connect source</button>`;
    return `${heading('Workspace overview', 'A live snapshot of your data sources, datasets, and recent activity.', actions)}
      <div class="stats-grid">
        ${statCard('Total records', numberFormat(totalRows), 'Across all available datasets', 'rows')}
        ${statCard('Datasets', numberFormat(state.datasets.length), 'Files and connected tables', 'table', 'green')}
        ${statCard('Total columns', numberFormat(totalColumns), 'Fields available to explore', 'columns', 'amber')}
        ${statCard('Active sources', numberFormat(activeSources), activeSources ? 'Connected in this session' : 'Connect a source to begin', 'zap', 'green')}
      </div>
      <div class="section-title-row"><div><h2>Workspace activity</h2><p>Monitor your data collection and changes.</p></div><button class="section-link" data-go="activity">View activity →</button></div>
      <div class="content-grid">
        <div class="panel"><div class="panel-header"><div><h3>Data activity</h3><p>Recent records in the selected dataset</p></div><div class="panel-header-actions">${datasetSelect()}<span class="badge primary">Preview</span></div></div><div class="panel-body"><div class="chart-wrap"><canvas id="overviewChart"></canvas></div><div class="chart-legend"><span><i class="legend-dot"></i>Record values</span><span><i class="legend-dot secondary"></i>Recent trend</span></div></div></div>
        <div class="panel"><div class="panel-header"><div><h3>Data sources</h3><p>Your connected integrations</p></div><button class="section-link" data-go="sources">Manage →</button></div><div class="panel-body">${renderSourceList(4)}</div></div>
      </div>
      <div class="section-title-row"><div><h2>Recent datasets</h2><p>Pick up where you left off.</p></div><button class="section-link" data-go="library">Open library →</button></div>
      ${renderRecentDatasets()}
      <div class="section-title-row"><div><h2>Recent activity</h2><p>Latest operations in this workspace.</p></div><button class="section-link" data-go="activity">All activity →</button></div>
      <div class="panel"><div class="panel-body">${activityMarkup(4)}</div></div>`;
  }
  function renderSourceList(limit = 10) {
    if (!state.sources.length) return `<div class="empty-state" style="padding:24px 10px;border:0"><div class="empty-state-icon">${icon('database')}</div><h3>No sources connected</h3><p>Connect Supabase or a REST API to bring live data into your workspace.</p><button class="button button-secondary button-small" data-action="add-source">Connect a source</button></div>`;
    return `<div class="source-list">${state.sources.slice(0, limit).map((source) => `<div class="source-row"><div class="source-icon">${icon(source.type === 'supabase' ? 'database' : 'zap')}</div><div class="source-info"><strong>${esc(source.name)}</strong><span>${esc(source.type === 'supabase' ? 'Supabase' : 'REST API')} · ${esc(source.table || source.url || 'Source')}</span></div><span class="status-pill ${source.status === 'connected' && sourceSecrets[source.id] ? '' : source.status === 'error' ? 'danger' : 'offline'}">${source.status === 'connected' && sourceSecrets[source.id] ? 'Connected' : source.status === 'error' ? 'Error' : 'Reconnect'}</span></div>`).join('')}</div>`;
  }
  function renderRecentDatasets() {
    if (!state.datasets.length) return emptyState('Your dataset library is empty', 'Import a CSV, Excel, or JSON file to get started.');
    return `<div class="dataset-grid">${state.datasets.slice(0, 3).map((dataset) => `<article class="dataset-card"><div class="dataset-card-top"><div class="dataset-type-icon">${icon('table')}</div><span class="badge ${dataset.isDemo ? 'amber' : 'green'}">${dataset.isDemo ? 'Sample' : esc(dataset.sourceType || 'Imported')}</span></div><h3>${esc(dataset.name)}</h3><p>${esc(dataset.description || 'Dataset ready to explore.')}</p><div class="dataset-meta"><span>${numberFormat(dataset.rows.length)} records · ${dataset.columns.length} columns</span><button class="section-link" data-action="open-dataset" data-id="${esc(dataset.id)}">Open →</button></div></article>`).join('')}</div>`;
  }
  function renderSources() {
    const actions = `<button class="button button-primary" data-action="add-source">${icon('plus')}Add data source</button>`;
    const existing = state.sources.length ? `<div class="panel"><div class="panel-header"><div><h3>Configured sources</h3><p>Credentials are kept in memory for this browser session only.</p></div><span class="badge">${state.sources.length} sources</span></div><div class="panel-body"><div class="source-list">${state.sources.map((s) => `<div class="source-row"><div class="source-icon">${icon(s.type === 'supabase' ? 'database' : 'zap')}</div><div class="source-info"><strong>${esc(s.name)}</strong><span>${esc(s.type === 'supabase' ? `${s.url} · ${s.table}` : s.url)}${s.lastSync ? ` · Synced ${dateLabel(s.lastSync)}` : ''}</span></div><span class="status-pill ${s.status === 'connected' && sourceSecrets[s.id] ? '' : s.status === 'error' ? 'danger' : 'offline'}">${s.status === 'connected' && sourceSecrets[s.id] ? 'Connected' : s.status === 'error' ? 'Error' : 'Credentials needed'}</span><button class="button button-secondary button-small" data-action="sync-source" data-id="${esc(s.id)}">${icon('refresh')}Sync</button><button class="icon-button" data-action="delete-source" data-id="${esc(s.id)}" aria-label="Remove source">${icon('trash')}</button></div>`).join('')}</div></div></div>` : '';
    return `${heading('Bring your data together.', 'Connect external services or import files into one secure workspace.', actions)}
      <div class="inline-note" style="margin-bottom:18px">${icon('info')}<span>For browser-based connections, use a Supabase publishable/anon key with Row Level Security enabled, or a public/read-authorized REST endpoint. Private credentials and service-role keys must never be placed in this page.</span></div>
      <div class="section-title-row"><div><h2>Connect a source</h2><p>Choose how you want to bring data into DataPilot.</p></div></div>
      <div class="source-grid">
        <article class="source-card"><div class="source-card-head"><div class="integration-logo green">S</div><div><h3>Supabase</h3><span class="badge green">REST API</span></div></div><p>Connect a Supabase project and fetch rows from an exposed table or view using its REST API.</p><div class="source-card-actions"><button class="button button-primary button-small" data-action="add-source" data-type="supabase">Connect Supabase</button></div></article>
        <article class="source-card"><div class="source-card-head"><div class="integration-logo">API</div><div><h3>REST API</h3><span class="badge primary">HTTP GET</span></div></div><p>Fetch JSON records from an endpoint. Configure an optional bearer token and response data path.</p><div class="source-card-actions"><button class="button button-primary button-small" data-action="add-source" data-type="rest">Connect API</button></div></article>
        <article class="source-card"><div class="source-card-head"><div class="integration-logo orange">CSV</div><div><h3>CSV / Excel</h3><span class="badge amber">File import</span></div></div><p>Import CSV and XLSX spreadsheets. Review and edit the data in your local workspace.</p><div class="source-card-actions"><button class="button button-secondary button-small" data-action="import">Choose file</button></div></article>
        <article class="source-card"><div class="source-card-head"><div class="integration-logo dark">{ }</div><div><h3>JSON files</h3><span class="badge">File import</span></div></div><p>Import JSON arrays or objects containing arrays of records and detect their columns automatically.</p><div class="source-card-actions"><button class="button button-secondary button-small" data-action="import">Import JSON</button></div></article>
        <article class="source-card"><div class="source-card-head"><div class="integration-logo dark">SQL</div><div><h3>MySQL</h3><span class="badge">Backend required</span></div></div><p>Connect through a secure backend API. Direct database credentials must not be exposed in the browser.</p><div class="source-card-actions"><button class="button button-quiet button-small" disabled>Backend connector required</button></div></article>
        <article class="source-card"><div class="source-card-head"><div class="integration-logo dark">PG</div><div><h3>PostgreSQL</h3><span class="badge">Backend required</span></div></div><p>Use a server-side connector to securely query PostgreSQL and return paginated results to DataPilot.</p><div class="source-card-actions"><button class="button button-quiet button-small" disabled>Backend connector required</button></div></article>
      </div>
      <div class="section-title-row"><div><h2>Existing connections</h2><p>Connection health and synchronization controls.</p></div></div>
      ${existing || `<div class="panel"><div class="panel-body">${emptyState('No external connections yet', 'Your configured Supabase and REST API connections will appear here.', 'Add a connection', 'add-source')}</div></div>`}`;
  }
  function filteredRows(dataset) {
    if (!dataset) return [];
    let rows = dataset.rows.slice();
    const query = explorerSearch.trim().toLowerCase();
    if (query) rows = rows.filter((row) => dataset.columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(query)));
    if (activeFilters.length) rows = rows.filter((row) => activeFilters.every((filter) => {
      const raw = row[filter.key]; const value = String(raw ?? '').toLowerCase(); const target = String(filter.value ?? '').toLowerCase();
      if (filter.operator === 'empty') return raw === null || raw === undefined || raw === '';
      if (filter.operator === 'not_empty') return raw !== null && raw !== undefined && raw !== '';
      if (filter.operator === 'equals') return value === target;
      if (filter.operator === 'gt') return Number(raw) > Number(filter.value);
      if (filter.operator === 'lt') return Number(raw) < Number(filter.value);
      return value.includes(target);
    }));
    if (explorerSort.key) {
      const key = explorerSort.key;
      rows.sort((a, b) => {
        const av = a[key], bv = b[key];
        const an = Number(av), bn = Number(bv);
        let compare;
        if (av === null || av === undefined) compare = -1;
        else if (bv === null || bv === undefined) compare = 1;
        else if (av !== '' && bv !== '' && !Number.isNaN(an) && !Number.isNaN(bn)) compare = an - bn;
        else compare = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: 'base' });
        return explorerSort.direction === 'asc' ? compare : -compare;
      });
    }
    return rows;
  }
  function cellValue(value) {
    if (value === null || value === undefined || value === '') return '<span class="muted-cell">—</span>';
    if (typeof value === 'object') return esc(JSON.stringify(value));
    return esc(value);
  }
  function renderExplorer() {
    const dataset = currentDataset();
    const actions = `<button class="button button-secondary" data-action="import">${icon('upload')}Import</button><button class="button button-primary" data-action="add-row">${icon('plus')}Add row</button>`;
    if (!dataset) return `${heading('Explore your data.', 'Browse, edit, and organize your records.', actions)}${emptyState('No datasets available', 'Import a file or connect a data source to begin.')}`;
    const rows = filteredRows(dataset);
    const totalPages = Math.max(1, Math.ceil(rows.length / explorerPageSize));
    explorerPage = Math.min(explorerPage, totalPages);
    const start = (explorerPage - 1) * explorerPageSize;
    const pageRows = rows.slice(start, start + explorerPageSize);
    const columns = visibleColumns(dataset);
    const selectedCount = selectedRows.size;
    const source = dataset.sourceId ? getSource(dataset.sourceId) : null;
    const columnMenu = showColumnMenu ? `<div class="column-menu-pop">${dataset.columns.map((col) => `<label><input type="checkbox" class="table-checkbox" data-action="toggle-column" data-key="${esc(col.key)}" ${col.visible !== false ? 'checked' : ''}>${esc(col.label)}</label><div style="display:flex;gap:7px;padding:4px 6px 7px"><button class="section-link" data-action="rename-column" data-key="${esc(col.key)}">Rename</button><button class="section-link" data-action="delete-column" data-key="${esc(col.key)}">Delete</button></div><div style="height:1px;background:var(--line);margin:2px 0 5px"></div>`).join('')}</div>` : '';
    const filtersMarkup = activeFilters.length ? `<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:9px 14px;border-bottom:1px solid var(--line)"><span style="font-size:9px;color:var(--muted);font-weight:700">FILTERS</span>${activeFilters.map((filter, index) => `<span class="badge primary">${esc(dataset.columns.find((c) => c.key === filter.key)?.label || filter.key)} ${esc(filter.operator.replace('_',' '))}${filter.value ? ` ${esc(filter.value)}` : ''} <button style="border:0;background:none;color:inherit;padding:0 0 0 5px;cursor:pointer" data-action="remove-filter" data-index="${index}">×</button></span>`).join('')}<button class="section-link" data-action="clear-filters">Clear all</button></div>` : ''; 
    const table = columns.length ? `<div class="dataset-table-wrap"><table class="data-table"><thead><tr><th style="width:32px"><input type="checkbox" class="table-checkbox" data-action="select-page" ${pageRows.length && pageRows.every((r) => selectedRows.has(r._rowId)) ? 'checked' : ''}></th><th>#</th>${columns.map((col) => `<th class="sortable" data-sort="${esc(col.key)}">${esc(col.label)} ${explorerSort.key === col.key ? (explorerSort.direction === 'asc' ? '↑' : '↓') : '↕'}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${pageRows.length ? pageRows.map((row, index) => `<tr><td><input type="checkbox" class="table-checkbox" data-action="select-row" data-id="${esc(row._rowId)}" ${selectedRows.has(row._rowId) ? 'checked' : ''}></td><td class="row-number">${start + index + 1}</td>${columns.map((col) => `<td title="${esc(typeof row[col.key] === 'object' ? JSON.stringify(row[col.key]) : row[col.key] ?? '')}">${cellValue(row[col.key])}</td>`).join('')}<td><div class="action-cell"><button data-action="edit-row" data-id="${esc(row._rowId)}" title="Edit">${icon('edit')}</button><button data-action="duplicate-row" data-id="${esc(row._rowId)}" title="Duplicate">${icon('copy')}</button><button data-action="delete-row" data-id="${esc(row._rowId)}" title="Delete">${icon('trash')}</button></div></td></tr>`).join('') : `<tr><td colspan="${columns.length + 3}"><div class="table-empty"><strong>No matching records</strong>Try changing your search or filter.</div></td></tr>`}</tbody></table></div>` : `<div class="table-empty"><strong>No visible columns</strong>Use the Columns menu to show fields or add a new column.</div>`;
    return `${heading('Data explorer', 'Work with a safe workspace copy of your data. Changes here do not modify the original source.', actions)}
      <div class="inline-note" style="margin-bottom:14px">${icon('shield')}<span><strong>Workspace copy:</strong> row and column edits are saved locally in this browser. They are not written back to the connected database.</span></div>
      <div class="panel"><div class="panel-header"><div><h3>${esc(dataset.name)}</h3><p>${numberFormat(dataset.rows.length)} records · ${dataset.columns.length} columns · Updated ${dateLabel(dataset.updatedAt)}</p></div><div class="panel-header-actions">${datasetSelect()}<span class="badge ${dataset.isDemo ? 'amber' : 'green'}">${dataset.isDemo ? 'Sample data' : esc(dataset.sourceType || 'Local')}</span></div></div>
        <div class="table-toolbar"><div class="toolbar-left"><div class="table-search">${icon('search')}<input id="tableSearch" type="search" value="${esc(explorerSearch)}" placeholder="Search all columns..."></div><button class="button button-secondary button-small" data-action="add-filter">${icon('filter')}Filter${activeFilters.length ? ` (${activeFilters.length})` : ''}</button><button class="button button-secondary button-small" data-action="add-column">${icon('plus')}Column</button><div class="column-menu"><button class="button button-secondary button-small" data-action="toggle-column-menu">${icon('columns')}Columns</button>${columnMenu}</div>${selectedCount ? `<button class="button button-danger button-small" data-action="bulk-delete">${icon('trash')}Delete ${selectedCount}</button>` : ''}</div><div class="toolbar-right"><button class="button button-secondary button-small" data-action="undo" ${undoStack.length ? '' : 'disabled'}>Undo</button><button class="button button-secondary button-small" data-action="export-csv">${icon('download')}Download CSV</button></div></div>
        ${filtersMarkup}${table}
        <div class="table-footer"><span>Showing ${rows.length ? start + 1 : 0}–${Math.min(start + explorerPageSize, rows.length)} of ${numberFormat(rows.length)} records${source?.type === 'supabase' && dataset.rows.length >= 500 ? ' · More records may be available' : ''}</span><div class="pagination"><button data-action="page-prev" ${explorerPage <= 1 ? 'disabled' : ''}>‹</button><span>Page ${explorerPage} of ${totalPages}</span><button data-action="page-next" ${explorerPage >= totalPages ? 'disabled' : ''}>›</button></div></div>
      </div>
      ${source?.type === 'supabase' ? `<div class="section-title-row"><div><h2>Remote data</h2><p>Fetch the next page from the connected Supabase table.</p></div><button class="button button-secondary button-small" data-action="load-more" data-id="${esc(source.id)}">${icon('download')}Load next 500 rows</button></div>` : ''}`;
  }
  function renderLibrary() {
    const actions = `<button class="button button-secondary" data-action="import">${icon('upload')}Import dataset</button><button class="button button-primary" data-action="create-dataset">${icon('plus')}New dataset</button>`;
    const cards = state.datasets.map((dataset) => `<article class="dataset-card"><div class="dataset-card-top"><div class="dataset-type-icon">${icon('table')}</div><button class="card-menu" data-action="dataset-menu" data-id="${esc(dataset.id)}" aria-label="Dataset actions">${icon('more')}</button></div><h3>${esc(dataset.name)}</h3><p>${esc(dataset.description || 'No description added yet.')}</p><div class="dataset-meta"><span>${numberFormat(dataset.rows.length)} rows · ${dataset.columns.length} fields</span><span class="badge ${dataset.isDemo ? 'amber' : 'green'}">${dataset.isDemo ? 'Sample' : esc(dataset.sourceType || 'Imported')}</span></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px"><span style="font-size:9px;color:var(--muted)">Updated ${dateLabel(dataset.updatedAt)}</span><button class="button button-secondary button-small" data-action="open-dataset" data-id="${esc(dataset.id)}">Open dataset</button></div></article>`).join('');
    return `${heading('Dataset library', 'A central home for every file, table, and dataset in your workspace.', actions)}<div class="section-title-row"><div><h2>All datasets</h2><p>${state.datasets.length} datasets available</p></div><div class="table-search">${icon('search')}<input id="librarySearch" type="search" placeholder="Find a dataset..."></div></div><div class="dataset-grid" id="libraryGrid">${cards || emptyState('No datasets yet', 'Import your first dataset to start exploring.')}</div>`;
  }
  function numericColumns(dataset) {
    return (dataset?.columns || []).filter((col) => col.key !== 'id' && !/_id$/i.test(col.key) && (col.type === 'number' || dataset.rows.some((row) => row[col.key] !== '' && row[col.key] !== null && row[col.key] !== undefined && !Number.isNaN(Number(row[col.key])))));
  }
  function renderAnalytics() {
    const dataset = currentDataset();
    const nums = numericColumns(dataset);
    if (!dataset) return `${heading('Live analytics', 'Explore trends and patterns in your connected data.')}${emptyState('No dataset to analyze', 'Import or connect data to generate analytics.')}`;
    const defaultColumn = analyticsColumn && nums.some((c) => c.key === analyticsColumn) ? analyticsColumn : nums[0]?.key || '';
    analyticsColumn = defaultColumn;
    return `${heading('Live analytics', 'Visualize numerical fields and understand how your data changes over time.', `<button class="button button-secondary" data-action="refresh-chart">${icon('refresh')}Refresh chart</button>`)}
      <div class="panel"><div class="panel-header"><div><h3>Dataset analysis</h3><p>Choose a dataset, field, and visualization.</p></div><div class="panel-header-actions">${datasetSelect()}</div></div><div class="panel-body"><div class="form-grid" style="margin-bottom:15px"><div class="form-field"><label>Numerical field</label><select class="select-control" style="width:100%;height:35px" data-role="analytics-column">${nums.map((col) => `<option value="${esc(col.key)}" ${col.key === defaultColumn ? 'selected' : ''}>${esc(col.label)}</option>`).join('') || '<option value="">No numerical fields found</option>'}</select></div><div class="form-field"><label>Chart type</label><select class="select-control" style="width:100%;height:35px" data-role="chart-type"><option value="line" ${analyticsChartType === 'line' ? 'selected' : ''}>Line chart</option><option value="bar" ${analyticsChartType === 'bar' ? 'selected' : ''}>Bar chart</option></select></div></div><div class="chart-wrap" style="height:310px"><canvas id="analyticsChart"></canvas></div><div class="chart-legend"><span><i class="legend-dot"></i>${esc(nums.find((c) => c.key === defaultColumn)?.label || 'No numeric data')}</span><span>Based on ${numberFormat(dataset.rows.length)} available records</span></div></div></div>
      <div class="section-title-row"><div><h2>Field summary</h2><p>Quick statistics for numerical fields.</p></div></div><div class="metric-grid">${nums.map((col) => { const values = dataset.rows.map((r) => r[col.key]).filter((v) => v !== null && v !== undefined && v !== '').map(Number).filter((n) => Number.isFinite(n)); const sum = values.reduce((a,b) => a+b,0); const avg = values.length ? sum / values.length : 0; return `<div class="metric-card"><span>${esc(col.label)}</span><strong>${avg.toLocaleString(undefined,{maximumFractionDigits:2})}</strong><small>Average · Min ${Math.min(...values).toLocaleString()} · Max ${Math.max(...values).toLocaleString()}</small></div>`; }).join('') || '<div class="panel"><div class="panel-body">No numerical columns available in this dataset.</div></div>'}</div>`;
  }
  function qualityStats(dataset) {
    if (!dataset) return { total: 0, missing: 0, duplicates: 0, completeness: 100, byColumn: [] };
    let missing = 0;
    const byColumn = dataset.columns.map((col) => {
      const count = dataset.rows.filter((row) => row[col.key] === null || row[col.key] === undefined || row[col.key] === '').length;
      missing += count;
      return { key: col.key, label: col.label, missing: count, completeness: dataset.rows.length ? 100 * (dataset.rows.length - count) / dataset.rows.length : 100 };
    });
    const seen = new Set(); let duplicates = 0;
    dataset.rows.forEach((row) => { const signature = JSON.stringify(dataset.columns.map((col) => row[col.key])); if (seen.has(signature)) duplicates++; else seen.add(signature); });
    const total = dataset.rows.length * dataset.columns.length;
    return { total, missing, duplicates, completeness: total ? 100 * (total - missing) / total : 100, byColumn };
  }
  function renderQuality() {
    const dataset = currentDataset();
    if (!dataset) return `${heading('Data quality', 'Find missing values and duplicate records before they become a problem.')}${emptyState('No dataset to inspect', 'Import or connect a dataset to run a quality check.')}`;
    const stats = qualityStats(dataset);
    return `${heading('Data quality', 'Review completeness and spot common data issues in your workspace copy.', `<button class="button button-secondary" data-action="quality-refresh">${icon('refresh')}Run checks</button>`)}
      <div class="panel"><div class="panel-header"><div><h3>Dataset health</h3><p>Quality report for ${esc(dataset.name)}</p></div><div class="panel-header-actions">${datasetSelect()}<span class="badge ${stats.completeness > 95 ? 'green' : stats.completeness > 80 ? 'amber' : 'primary'}">${stats.completeness.toFixed(1)}% complete</span></div></div><div class="panel-body"><div class="metric-grid"> <div class="metric-card"><span>Data completeness</span><strong>${stats.completeness.toFixed(1)}%</strong><small>${numberFormat(stats.total - stats.missing)} populated cells</small></div><div class="metric-card"><span>Missing values</span><strong>${numberFormat(stats.missing)}</strong><small>Blank or null cells</small></div><div class="metric-card"><span>Duplicate rows</span><strong>${numberFormat(stats.duplicates)}</strong><small>Matching field values</small></div></div><div style="margin-top:22px"><div class="section-title-row" style="margin-top:0"><div><h2>Column completeness</h2><p>Missing values by field</p></div></div>${stats.byColumn.map((col) => `<div style="margin:13px 0"><div style="display:flex;justify-content:space-between;gap:10px;font-size:10px;color:#657188"><strong>${esc(col.label)}</strong><span>${col.completeness.toFixed(0)}% · ${col.missing} missing</span></div><div class="quality-bar"><span style="width:${col.completeness}%;background:${col.completeness > 95 ? '#20a47c' : col.completeness > 80 ? '#d6a14f' : '#d96a72'}"></span></div></div>`).join('')}</div></div></div>
      <div class="section-title-row"><div><h2>Cleaning actions</h2><p>Preview before changing your workspace data.</p></div></div><div class="content-grid"><div class="panel"><div class="panel-header"><h3>Remove duplicate rows</h3><span class="badge amber">${stats.duplicates} found</span></div><div class="panel-body"><p style="font-size:10px;color:var(--muted)">Keep the first occurrence of each identical row and remove subsequent duplicates from this local dataset.</p><button class="button button-secondary button-small" data-action="remove-duplicates" ${stats.duplicates ? '' : 'disabled'}>Preview and remove duplicates</button></div></div><div class="panel"><div class="panel-header"><h3>Trim text whitespace</h3></div><div class="panel-body"><p style="font-size:10px;color:var(--muted)">Remove leading and trailing spaces from text values in all columns.</p><button class="button button-secondary button-small" data-action="trim-whitespace">Trim text values</button></div></div></div>`;
  }
  function renderAutomations() {
    const connected = state.sources.filter((s) => s.status === 'connected' && sourceSecrets[s.id]);
    return `${heading('Automations', 'Keep connected datasets up to date with lightweight browser-based synchronization.')}
      <div class="inline-note warning" style="margin-bottom:16px">${icon('alert')}<span>Automatic sync runs only while this DataPilot page remains open. Reliable scheduled jobs, background retries, and notifications require a backend worker.</span></div>
      <div class="panel"><div class="panel-header"><div><h3>Automatic source sync</h3><p>Poll connected sources at a fixed interval.</p></div><button class="switch ${state.autoSync ? 'on' : ''}" data-action="toggle-autosync" aria-label="Toggle automatic sync" aria-pressed="${state.autoSync}"></button></div><div class="panel-body"><div class="form-grid"><div class="form-field"><label>Refresh interval</label><select class="select-control" style="width:100%;height:35px" data-role="sync-interval"><option value="15" ${state.syncInterval === 15 ? 'selected' : ''}>Every 15 seconds</option><option value="30" ${state.syncInterval === 30 ? 'selected' : ''}>Every 30 seconds</option><option value="60" ${state.syncInterval === 60 ? 'selected' : ''}>Every minute</option><option value="300" ${state.syncInterval === 300 ? 'selected' : ''}>Every 5 minutes</option></select></div><div class="form-field"><label>Sources available for sync</label><div class="input-control" style="display:flex;align-items:center">${connected.length} authenticated source${connected.length === 1 ? '' : 's'}</div></div></div><div class="form-actions" style="justify-content:flex-start"><button class="button button-primary button-small" data-action="sync-all">${icon('refresh')}Sync all now</button></div></div></div>
      <div class="section-title-row"><div><h2>Source schedules</h2><p>Current connection status and last successful sync.</p></div></div><div class="panel"><div class="panel-body">${state.sources.length ? renderSourceList(20) : '<div class="table-empty">Connect a data source to configure synchronization.</div>'}</div></div>`;
  }
  function renderExports() {
    const dataset = currentDataset();
    if (!dataset) return `${heading('Export center', 'Download clean copies of your data in the format you need.')}${emptyState('No datasets to export', 'Import or connect a dataset first.')}`;
    return `${heading('Export center', 'Download full datasets or a filtered selection in a few clicks.')}
      <div class="panel"><div class="panel-header"><div><h3>Choose what to export</h3><p>Export uses the current workspace version of your data.</p></div><div class="panel-header-actions">${datasetSelect()}</div></div><div class="panel-body"><div class="form-grid"><div class="form-field"><label>Dataset</label><div class="input-control" style="display:flex;align-items:center">${esc(dataset.name)}</div></div><div class="form-field"><label>Available records</label><div class="input-control" style="display:flex;align-items:center">${numberFormat(dataset.rows.length)} rows · ${dataset.columns.length} columns</div></div></div><div class="section-title-row"><div><h2>Export format</h2><p>Select the format that fits your workflow.</p></div></div><div class="source-grid"><article class="source-card"><div class="source-card-head"><div class="integration-logo green">CSV</div><div><h3>CSV file</h3><span class="badge green">Recommended</span></div></div><p>UTF-8 encoded CSV with headers. Opens in Excel, Google Sheets, and most data tools.</p><button class="button button-primary button-small" data-action="export-csv">${icon('download')}Download CSV</button></article><article class="source-card"><div class="source-card-head"><div class="integration-logo">XLSX</div><div><h3>Excel workbook</h3><span class="badge">Spreadsheet</span></div></div><p>Download a formatted spreadsheet for further analysis and sharing.</p><button class="button button-secondary button-small" data-action="export-xlsx">${icon('download')}Download Excel</button></article><article class="source-card"><div class="source-card-head"><div class="integration-logo dark">{ }</div><div><h3>JSON file</h3><span class="badge">Developer friendly</span></div></div><p>Export structured records as JSON, preserving nested values and data types.</p><button class="button button-secondary button-small" data-action="export-json">${icon('download')}Download JSON</button></article></div><div class="inline-note" style="margin-top:17px">${icon('info')}<span>From Data Explorer, you can export selected rows or the currently searched result set. The export is generated in your browser for this MVP.</span></div></div></div>`;
  }
  function renderActivity() {
    return `${heading('Activity logs', 'A chronological record of imports, syncs, edits, and exports.', `<button class="button button-secondary" data-action="clear-activity">Clear history</button>`)}<div class="panel"><div class="panel-header"><div><h3>Workspace history</h3><p>${state.activity.length} recent events retained in this browser</p></div><span class="badge">Latest first</span></div><div class="panel-body">${activityMarkup(80)}</div></div>`;
  }
  function renderSettings() {
    return `${heading('Settings', 'Manage your local workspace preferences and data.')}
      <div class="content-grid"><div class="panel"><div class="panel-header"><div><h3>Appearance</h3><p>Choose how DataPilot looks on this device.</p></div></div><div class="panel-body"><div class="toggle-row"><div class="toggle-copy"><strong>Dark theme</strong><span>Use a darker workspace interface.</span></div><button class="switch ${state.theme === 'dark' ? 'on' : ''}" data-action="toggle-theme" aria-pressed="${state.theme === 'dark'}"></button></div><div class="toggle-row"><div class="toggle-copy"><strong>Show demo banner</strong><span>Display the sample data notice when demo datasets are present.</span></div><button class="switch ${!state.bannerDismissed ? 'on' : ''}" data-action="toggle-banner" aria-pressed="${!state.bannerDismissed}"></button></div></div></div><div class="panel"><div class="panel-header"><div><h3>Workspace data</h3><p>Manage data stored in this browser.</p></div></div><div class="panel-body"><p style="color:var(--muted);font-size:10px">Datasets and activity logs are saved in local browser storage. External API credentials are not persisted.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button button-secondary button-small" data-action="export-backup">${icon('download')}Export workspace backup</button><button class="button button-danger button-small" data-action="reset-demo">Reset demo workspace</button></div></div></div></div>
      <div class="section-title-row"><div><h2>Security and limitations</h2><p>Important information before connecting production databases.</p></div></div><div class="panel"><div class="panel-body"><div class="inline-note warning">${icon('shield')}<span>This standalone browser MVP is intended for local workspace use. Do not enter Supabase service-role keys, database passwords, or other privileged secrets. For production use, add authentication, a secure backend, server-side database connectors, role-based permissions, audit persistence, and background workers.</span></div></div></div>`;
  }
  function renderPage() {
    const content = {
      overview: renderOverview, sources: renderSources, explorer: renderExplorer, library: renderLibrary,
      analytics: renderAnalytics, quality: renderQuality, automations: renderAutomations, exports: renderExports,
      activity: renderActivity, settings: renderSettings
    }[activePage]();
    $('#pageContent').innerHTML = content;
    persist();
    requestAnimationFrame(() => drawPageCharts());
  }

  function drawCanvasChart(canvas, dataset, key, type = 'line') {
    if (!canvas || !dataset || !key) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(280, rect.width || 600);
    const height = Math.max(180, rect.height || 230);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    const styles = getComputedStyle(document.body);
    const textColor = styles.getPropertyValue('--muted').trim() || '#7c879b';
    const lineColor = styles.getPropertyValue('--line').trim() || '#e8edf4';
    const primary = styles.getPropertyValue('--primary').trim() || '#5267e8';
    const values = dataset.rows.map((row) => row[key]).filter((value) => value !== null && value !== undefined && value !== '').map(Number).filter((value) => Number.isFinite(value));
    ctx.clearRect(0, 0, width, height);
    if (!values.length) {
      ctx.fillStyle = textColor; ctx.font = '11px DM Sans'; ctx.textAlign = 'center';
      ctx.fillText('No numerical values available for this field.', width / 2, height / 2); return;
    }
    const pad = { left: 38, right: 14, top: 14, bottom: 28 };
    const chartW = width - pad.left - pad.right; const chartH = height - pad.top - pad.bottom;
    const min = Math.min(0, ...values); const max = Math.max(...values); const range = max - min || 1;
    ctx.strokeStyle = lineColor; ctx.lineWidth = 1;
    ctx.fillStyle = textColor; ctx.font = '9px DM Sans'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
      const val = max - (range / 4) * i; ctx.fillText(Number(val.toFixed(1)).toLocaleString(), pad.left - 8, y + 3);
    }
    const count = values.length;
    const xAt = (i) => pad.left + (count === 1 ? chartW / 2 : (chartW / (count - 1)) * i);
    const yAt = (v) => pad.top + chartH - ((v - min) / range) * chartH;
    if (type === 'bar') {
      const step = chartW / count; const barW = Math.max(4, step * .56);
      values.forEach((value, i) => {
        const y = yAt(value); const h = Math.max(1, pad.top + chartH - y);
        ctx.fillStyle = i === count - 1 ? primary : 'rgba(82,103,232,.48)';
        ctx.beginPath(); ctx.roundRect(xAt(i) - barW / 2, y, barW, h, 3); ctx.fill();
      });
    } else {
      const gradient = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
      gradient.addColorStop(0, 'rgba(82,103,232,.18)'); gradient.addColorStop(1, 'rgba(82,103,232,0)');
      ctx.beginPath(); values.forEach((value, i) => { const x = xAt(i), y = yAt(value); if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.lineTo(xAt(count - 1), pad.top + chartH); ctx.lineTo(xAt(0), pad.top + chartH); ctx.closePath(); ctx.fillStyle = gradient; ctx.fill();
      ctx.beginPath(); values.forEach((value, i) => { const x = xAt(i), y = yAt(value); if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.strokeStyle = primary; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
      values.forEach((value, i) => { ctx.beginPath(); ctx.arc(xAt(i), yAt(value), i === count - 1 ? 3.6 : 2, 0, Math.PI * 2); ctx.fillStyle = primary; ctx.fill(); });
    }
    ctx.fillStyle = textColor; ctx.textAlign = 'center';
    const labels = [0, Math.floor((count - 1) / 2), count - 1].filter((v, i, a) => a.indexOf(v) === i);
    labels.forEach((i) => ctx.fillText(`#${i + 1}`, xAt(i), height - 8));
  }
  function drawPageCharts() {
    const dataset = currentDataset();
    if (!dataset) return;
    const nums = numericColumns(dataset);
    const key = nums[0]?.key;
    drawCanvasChart($('#overviewChart'), dataset, key, 'line');
    drawCanvasChart($('#analyticsChart'), dataset, analyticsColumn, analyticsChartType);
  }

  function openModal(title, description, body, onReady) {
    $('#modalRoot').innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><div><h2>${title}</h2><p>${description}</p></div><button class="icon-button modal-close" data-action="close-modal" aria-label="Close">${icon('x')}</button></div><div class="modal-body">${body}</div></div></div>`;
    if (onReady) onReady($('#modalRoot'));
  }
  function closeModal() { $('#modalRoot').innerHTML = ''; }
  function openSourceModal(type = 'supabase') {
    const defaultName = type === 'supabase' ? 'Supabase connection' : 'REST API connection';
    openModal('Connect a data source', 'Configure a read-only connection. Credentials are used in memory and are not saved.', `<form id="sourceForm"><div class="form-grid">
      <div class="form-field full"><label>Connection name</label><input name="name" required value="${defaultName}" placeholder="e.g. Production analytics"></div>
      <div class="form-field"><label>Source type</label><select name="type" id="sourceType"><option value="supabase" ${type === 'supabase' ? 'selected' : ''}>Supabase</option><option value="rest" ${type === 'rest' ? 'selected' : ''}>REST API</option></select></div>
      <div class="form-field"><label id="urlLabel">${type === 'supabase' ? 'Supabase project URL' : 'API endpoint URL'}</label><input name="url" required type="url" placeholder="https://your-project.supabase.co"></div>
      <div class="form-field full"><label id="keyLabel">${type === 'supabase' ? 'Publishable / anon key' : 'Bearer token (optional)'}</label><input name="secret" type="password" autocomplete="off" placeholder="${type === 'supabase' ? 'sb_publishable_...' : 'Token (kept in memory only)'}"><span class="hint">Never use a service_role key or privileged database password in the browser.</span></div>
      <div class="form-field supabase-only" style="${type === 'supabase' ? '' : 'display:none'}"><label>Schema</label><input name="schema" value="public" placeholder="public"></div>
      <div class="form-field supabase-only" style="${type === 'supabase' ? '' : 'display:none'}"><label>Table or view</label><input name="table" placeholder="e.g. sensor_readings"></div>
      <div class="form-field rest-only full" style="${type === 'rest' ? '' : 'display:none'}"><label>Response array path (optional)</label><input name="responsePath" placeholder="e.g. data.records"><span class="hint">Leave blank if the endpoint returns a JSON array directly.</span></div>
      <div class="form-field rest-only full" style="${type === 'rest' ? '' : 'display:none'}"><label>Additional headers (JSON, optional)</label><textarea name="headers" placeholder='{"x-api-key":"your-key"}'></textarea></div>
    </div><div class="inline-note" style="margin-top:14px">${icon('info')}<span>Data is fetched into a local workspace copy. Editing rows here will not write changes back to your remote database.</span></div><div class="form-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">Test & connect</button></div></form>`, (root) => {
      $('#sourceType', root).addEventListener('change', (event) => {
        const isSupabase = event.target.value === 'supabase';
        $$('.supabase-only', root).forEach((el) => el.style.display = isSupabase ? '' : 'none');
        $$('.rest-only', root).forEach((el) => el.style.display = isSupabase ? 'none' : '');
        $('#urlLabel', root).textContent = isSupabase ? 'Supabase project URL' : 'API endpoint URL';
        $('#keyLabel', root).textContent = isSupabase ? 'Publishable / anon key' : 'Bearer token (optional)';
      });
      $('#sourceForm', root).addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const source = {
          id: uid(), name: String(form.get('name')).trim(), type: String(form.get('type')),
          url: String(form.get('url')).trim(), schema: String(form.get('schema') || 'public').trim() || 'public',
          table: String(form.get('table') || '').trim(), responsePath: String(form.get('responsePath') || '').trim(),
          status: 'pending', lastSync: null, datasetId: null, nextOffset: 0
        };
        const headersText = String(form.get('headers') || '').trim();
        if (!source.name || !source.url) { toast('Please complete the required fields.', 'error'); return; }
        if (source.type === 'supabase' && !source.table) { toast('Enter a Supabase table or view name.', 'error'); return; }
        try { if (headersText) JSON.parse(headersText); } catch (_) { toast('Additional headers must be valid JSON.', 'error'); return; }
        sourceSecrets[source.id] = { secret: String(form.get('secret') || ''), headersText };
        state.sources.push(source);
        const submit = $('button[type="submit"]', root); submit.disabled = true; submit.textContent = 'Connecting...';
        try {
          await syncSource(source.id, true);
          closeModal(); setPage('sources'); toast('Source connected and data fetched.');
        } catch (error) {
          source.status = 'error'; persist(); submit.disabled = false; submit.textContent = 'Test & connect';
          toast(`Connection failed: ${error.message}`, 'error');
          addActivity('Source connection failed', `${source.name}: ${error.message}`, 'error');
        }
      });
    });
  }
  async function fetchSourcePage(source, offset = 0, limit = 500) {
    const secret = sourceSecrets[source.id] || {};
    let url = source.url;
    const headers = { Accept: 'application/json' };
    if (source.type === 'supabase') {
      url = `${source.url.replace(/\/+$/, '')}/rest/v1/${encodeURIComponent(source.table)}?select=*`;
      headers.apikey = secret.secret || '';
      headers.Authorization = `Bearer ${secret.secret || ''}`;
      headers['Accept-Profile'] = source.schema || 'public';
      headers['Content-Profile'] = source.schema || 'public';
      headers.Prefer = 'count=exact';
      headers.Range = `${offset}-${offset + limit - 1}`;
      headers['Range-Unit'] = 'items';
    } else {
      if (secret.secret) headers.Authorization = `Bearer ${secret.secret}`;
      if (secret.headersText) Object.assign(headers, JSON.parse(secret.headersText));
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}limit=${limit}&offset=${offset}`;
    }
    const response = await fetch(url, { method: 'GET', headers });
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 220) || response.statusText}`);
    let payload;
    try { payload = text ? JSON.parse(text) : []; } catch (_) { throw new Error('The endpoint did not return valid JSON.'); }
    if (source.type === 'rest' && source.responsePath) {
      payload = source.responsePath.split('.').filter(Boolean).reduce((value, key) => value?.[key], payload);
    }
    if (!Array.isArray(payload)) throw new Error('Expected an array of records. Set the response array path if your API wraps the records in an object.');
    return payload;
  }
  async function syncSource(sourceId, initial = false) {
    const source = getSource(sourceId);
    if (!source) throw new Error('Source not found.');
    if (!sourceSecrets[sourceId]) throw new Error('Credentials are not available. Reconnect this source to fetch data.');
    source.status = 'syncing'; persist();
    const rows = await fetchSourcePage(source, 0, 500);
    let dataset = state.datasets.find((d) => d.id === source.datasetId);
    if (!dataset) {
      dataset = makeDataset(source.table || source.name, rows, source.type, `Fetched from ${source.name}.`);
      dataset.sourceId = source.id; dataset.sourceType = source.type; dataset.isDemo = false;
      state.datasets.unshift(dataset); source.datasetId = dataset.id;
      state.selectedDatasetId = dataset.id;
    } else {
      const previousIds = new Set(dataset.rows.map((row) => JSON.stringify(dataset.columns.map((col) => row[col.key]))));
      const normalized = rows.map((row) => ({ ...row, _rowId: uid() }));
      dataset.rows = normalized;
      dataset.columns = [...new Set(normalized.flatMap((row) => Object.keys(row).filter((key) => key !== '_rowId')))].map((key) => ({ key, label: key.replace(/_/g, ' '), type: inferType(normalized.find((r) => r[key] !== null && r[key] !== undefined)?.[key]), visible: dataset.columns.find((c) => c.key === key)?.visible !== false }));
      dataset.updatedAt = new Date().toISOString();
      source.newRecords = normalized.filter((row) => !previousIds.has(JSON.stringify(dataset.columns.map((col) => row[col.key])))).length;
    }
    source.status = 'connected'; source.lastSync = new Date().toISOString(); source.nextOffset = rows.length;
    persist(); addActivity(initial ? 'Data source connected' : 'Dataset synchronized', `${source.name}: ${numberFormat(rows.length)} records fetched`, 'sync');
    if (activePage === 'overview' || activePage === 'sources' || activePage === 'explorer' || activePage === 'analytics') renderPage();
    return rows.length;
  }
  async function loadMore(sourceId) {
    const source = getSource(sourceId);
    if (!source || source.type !== 'supabase') return;
    if (!sourceSecrets[sourceId]) return toast('Reconnect this source to fetch more records.', 'error');
    try {
      const rows = await fetchSourcePage(source, source.nextOffset || 0, 500);
      const dataset = state.datasets.find((d) => d.id === source.datasetId);
      if (!dataset) return;
      const existing = new Set(dataset.rows.map((r) => JSON.stringify(dataset.columns.map((c) => r[c.key]))));
      const fresh = rows.filter((r) => !existing.has(JSON.stringify(dataset.columns.map((c) => r[c.key])))).map((r) => ({ ...r, _rowId: uid() }));
      dataset.rows.push(...fresh); dataset.updatedAt = new Date().toISOString(); source.nextOffset += rows.length;
      persist(); renderPage(); toast(`${fresh.length} additional records loaded.`);
      addActivity('More records fetched', `${source.name}: ${fresh.length} records appended`, 'sync');
    } catch (error) { toast(`Could not load more: ${error.message}`, 'error'); }
  }

  function pushUndo() {
    const dataset = currentDataset();
    if (!dataset) return;
    undoStack.push(clone(dataset));
    if (undoStack.length > 20) undoStack.shift();
  }
  function undoLast() {
    const previous = undoStack.pop();
    if (!previous) return toast('There is no recent change to undo.', 'error');
    const index = state.datasets.findIndex((d) => d.id === previous.id);
    if (index >= 0) state.datasets[index] = previous;
    persist(); renderPage(); toast('Last workspace change undone.');
  }
  function openRowModal(rowId = null) {
    const dataset = currentDataset(); if (!dataset) return;
    const existing = rowId ? dataset.rows.find((r) => r._rowId === rowId) : null;
    const fields = dataset.columns.map((col) => `<div class="form-field"><label>${esc(col.label)} <span class="badge">${esc(col.type)}</span></label><input name="${esc(col.key)}" value="${esc(existing?.[col.key] ?? '')}" placeholder="Enter ${esc(col.label)}"></div>`).join('');
    openModal(existing ? 'Edit record' : 'Add a record', existing ? 'Update values in your local workspace copy.' : 'Create a new row in this dataset.', `<form id="rowForm"><div class="form-grid">${fields || '<p>No columns yet. Add a column first.</p>'}</div><div class="form-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">${existing ? 'Save changes' : 'Add record'}</button></div></form>`, (root) => {
      $('#rowForm', root).addEventListener('submit', (event) => {
        event.preventDefault(); const form = new FormData(event.currentTarget); const next = {};
        dataset.columns.forEach((col) => { next[col.key] = parseFieldValue(form.get(col.key), col.type); });
        pushUndo();
        if (existing) Object.assign(existing, next); else dataset.rows.unshift({ ...next, _rowId: uid() });
        dataset.updatedAt = new Date().toISOString(); persist(); closeModal(); renderPage();
        addActivity(existing ? 'Record updated' : 'Record created', `${dataset.name}: ${existing ? 'record edited' : 'new row added'}`);
        toast(existing ? 'Record updated.' : 'Record added.');
      });
    });
  }
  function parseFieldValue(value, type) {
    const raw = String(value ?? '').trim();
    if (raw === '') return null;
    if (type === 'number') { const n = Number(raw); return Number.isFinite(n) ? n : raw; }
    if (type === 'boolean') return raw.toLowerCase() === 'true' || raw === '1' || raw.toLowerCase() === 'yes';
    return raw;
  }
  function openFilterModal() {
    const dataset = currentDataset(); if (!dataset?.columns.length) return toast('Add a column before creating a filter.', 'error');
    openModal('Add a filter', 'Narrow the visible records using a column condition.', `<form id="filterForm"><div class="form-grid"><div class="form-field"><label>Column</label><select name="key" required>${dataset.columns.map((col) => `<option value="${esc(col.key)}">${esc(col.label)}</option>`).join('')}</select></div><div class="form-field"><label>Condition</label><select name="operator"><option value="contains">Contains</option><option value="equals">Equals</option><option value="gt">Greater than</option><option value="lt">Less than</option><option value="empty">Is empty</option><option value="not_empty">Is not empty</option></select></div><div class="form-field full"><label>Value</label><input name="value" placeholder="Value to match"></div></div><div class="form-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">Apply filter</button></div></form>`, (root) => {
      $('#filterForm', root).addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const operator = String(form.get('operator')); const value = String(form.get('value') || '').trim(); if (!['empty','not_empty'].includes(operator) && !value) return toast('Enter a value for this filter.', 'error'); activeFilters.push({ key: String(form.get('key')), operator, value }); explorerPage = 1; closeModal(); renderPage(); toast('Filter applied.'); });
    });
  }
  function openColumnModal() {
    openModal('Add a column', 'Add a new field to this workspace dataset.', `<form id="columnForm"><div class="form-grid"><div class="form-field"><label>Column name</label><input name="label" required placeholder="e.g. department"></div><div class="form-field"><label>Data type</label><select name="type"><option value="string">Text</option><option value="number">Number</option><option value="date">Date</option><option value="boolean">Boolean</option></select></div><div class="form-field full"><label>Default value (optional)</label><input name="defaultValue" placeholder="Leave blank for empty cells"></div></div><div class="form-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">Add column</button></div></form>`, (root) => {
      $('#columnForm', root).addEventListener('submit', (event) => {
        event.preventDefault(); const dataset = currentDataset(); const form = new FormData(event.currentTarget);
        const label = String(form.get('label')).trim(); const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        if (!key || dataset.columns.some((c) => c.key === key)) return toast('A column with this name already exists or the name is invalid.', 'error');
        pushUndo(); const type = String(form.get('type')); const value = parseFieldValue(form.get('defaultValue'), type);
        dataset.columns.push({ key, label, type, visible: true }); dataset.rows.forEach((row) => { row[key] = value; }); dataset.updatedAt = new Date().toISOString();
        persist(); closeModal(); renderPage(); addActivity('Column added', `${dataset.name}: ${label}`); toast('Column added.');
      });
    });
  }
  function renameColumn(key) {
    const dataset = currentDataset(); const col = dataset?.columns.find((c) => c.key === key); if (!col) return;
    const label = prompt('New column display name:', col.label); if (!label?.trim()) return;
    pushUndo(); col.label = label.trim(); dataset.updatedAt = new Date().toISOString(); persist(); renderPage(); addActivity('Column renamed', `${dataset.name}: ${key} → ${col.label}`); toast('Column display name updated.');
  }
  function deleteColumn(key) {
    const dataset = currentDataset(); const col = dataset?.columns.find((c) => c.key === key); if (!col) return;
    if (!confirm(`Delete the "${col.label}" column from this workspace copy?`)) return;
    pushUndo(); dataset.columns = dataset.columns.filter((c) => c.key !== key); dataset.rows.forEach((row) => delete row[key]); dataset.updatedAt = new Date().toISOString();
    showColumnMenu = false; persist(); renderPage(); addActivity('Column deleted', `${dataset.name}: ${col.label}`); toast('Column deleted from workspace copy.');
  }
  function deleteRow(rowId) {
    const dataset = currentDataset(); if (!dataset || !confirm('Delete this row from the workspace copy?')) return;
    pushUndo(); dataset.rows = dataset.rows.filter((row) => row._rowId !== rowId); selectedRows.delete(rowId); dataset.updatedAt = new Date().toISOString();
    persist(); renderPage(); addActivity('Record deleted', `${dataset.name}: one row removed`); toast('Row deleted.');
  }
  function duplicateRow(rowId) {
    const dataset = currentDataset(); const row = dataset?.rows.find((r) => r._rowId === rowId); if (!row) return;
    pushUndo(); dataset.rows.unshift({ ...clone(row), _rowId: uid() }); dataset.updatedAt = new Date().toISOString(); persist(); renderPage();
    addActivity('Record duplicated', `${dataset.name}: row copied`); toast('Row duplicated.');
  }
  function bulkDelete() {
    const dataset = currentDataset(); if (!dataset || !selectedRows.size) return;
    if (!confirm(`Delete ${selectedRows.size} selected rows from this workspace copy?`)) return;
    pushUndo(); const count = selectedRows.size; dataset.rows = dataset.rows.filter((row) => !selectedRows.has(row._rowId)); selectedRows.clear();
    dataset.updatedAt = new Date().toISOString(); persist(); renderPage(); addActivity('Bulk delete', `${dataset.name}: ${count} rows removed`); toast(`${count} rows deleted.`);
  }

  function parseCSV(text) {
    const rows = []; let row = []; let field = ''; let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (char === '"') quoted = false;
        else field += char;
      } else if (char === '"') quoted = true;
      else if (char === ',') { row.push(field); field = ''; }
      else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
      else field += char;
    }
    if (field.length || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
    const filtered = rows.filter((r) => r.some((v) => String(v).trim() !== ''));
    if (!filtered.length) return [];
    const headers = filtered.shift().map((h, i) => String(h || `column_${i + 1}`).replace(/^\uFEFF/, '').trim());
    return filtered.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
  }
  function importRows(name, rows, sourceType) {
    if (!Array.isArray(rows) || !rows.length || typeof rows[0] !== 'object') throw new Error('The file does not contain an array of records.');
    const dataset = makeDataset(name.replace(/\.[^.]+$/, ''), rows, sourceType, `Imported from ${name}.`);
    dataset.isDemo = false; state.datasets.unshift(dataset); state.selectedDatasetId = dataset.id; explorerSearch = ''; activeFilters = []; selectedRows.clear();
    persist(); addActivity('Dataset imported', `${dataset.name}: ${numberFormat(dataset.rows.length)} records`, 'info'); setPage('explorer'); toast(`${dataset.name} imported successfully.`);
  }
  async function handleFiles(files) {
    for (const file of files) {
      try {
        const ext = file.name.split('.').pop().toLowerCase(); let rows;
        if (ext === 'csv') rows = parseCSV(await file.text());
        else if (ext === 'json') {
          const payload = JSON.parse(await file.text());
          rows = Array.isArray(payload) ? payload : Array.isArray(payload.data) ? payload.data : Array.isArray(payload.records) ? payload.records : null;
        } else if (ext === 'xlsx' || ext === 'xls') {
          if (!window.XLSX) throw new Error('Excel reader could not load. Check your internet connection and try again, or save the sheet as CSV.');
          const buffer = await file.arrayBuffer(); const workbook = XLSX.read(buffer, { type: 'array' });
          rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' });
        } else throw new Error('Unsupported file type.');
        importRows(file.name, rows, ext === 'json' ? 'json' : ext === 'csv' ? 'csv' : 'excel');
      } catch (error) { toast(`${file.name}: ${error.message}`, 'error'); }
    }
    $('#fileInput').value = '';
  }
  function triggerImport() { $('#fileInput').click(); }

  function csvEscape(value) {
    let text = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1200);
  }
  function exportRows(format = 'csv', mode = 'all') {
    const dataset = currentDataset(); if (!dataset) return toast('No dataset selected.', 'error');
    let rows = mode === 'selected' ? dataset.rows.filter((row) => selectedRows.has(row._rowId)) : mode === 'filtered' ? filteredRows(dataset) : dataset.rows;
    if (!rows.length) return toast('There are no records to export.', 'error');
    const columns = visibleColumns(dataset);
    const base = dataset.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'dataset';
    if (format === 'csv') {
      const lines = [columns.map((col) => csvEscape(col.label)).join(','), ...rows.map((row) => columns.map((col) => csvEscape(row[col.key])).join(','))];
      downloadBlob(new Blob(['\ufeff', lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' }), `${base}.csv`);
    } else if (format === 'json') {
      const clean = rows.map((row) => Object.fromEntries(columns.map((col) => [col.key, row[col.key] ?? null])));
      downloadBlob(new Blob([JSON.stringify(clean, null, 2)], { type: 'application/json;charset=utf-8;' }), `${base}.json`);
    } else if (format === 'xlsx') {
      if (!window.XLSX) return toast('Excel export library is unavailable. Use CSV or reconnect to the internet.', 'error');
      const clean = rows.map((row) => Object.fromEntries(columns.map((col) => [col.label, row[col.key] ?? null])));
      const sheet = XLSX.utils.json_to_sheet(clean); const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Data'); XLSX.writeFile(book, `${base}.xlsx`);
    }
    addActivity('Data exported', `${dataset.name}: ${rows.length} records as ${format.toUpperCase()}`, 'export'); toast(`${rows.length} records exported as ${format.toUpperCase()}.`);
  }
  function exportBackup() {
    const backup = { exportedAt: new Date().toISOString(), app: 'DataPilot', version: 1, datasets: state.datasets, sources: state.sources.map(({ id, name, type, url, schema, table, status, lastSync }) => ({ id, name, type, url, schema, table, status, lastSync })), activity: state.activity };
    downloadBlob(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }), 'datapilot-workspace-backup.json');
    toast('Workspace backup downloaded.');
  }

  function toggleAutoSync(enabled) {
    state.autoSync = enabled; persist();
    if (autoSyncTimer) clearInterval(autoSyncTimer);
    autoSyncTimer = null;
    if (enabled) {
      if (!state.sources.some((s) => sourceSecrets[s.id])) { state.autoSync = false; persist(); renderPage(); return toast('Connect a source in this browser session before enabling automatic sync.', 'error'); }
      autoSyncTimer = setInterval(async () => {
        for (const source of state.sources.filter((s) => sourceSecrets[s.id])) {
          try { await syncSource(source.id); } catch (error) { source.status = 'error'; addActivity('Automatic sync failed', `${source.name}: ${error.message}`, 'error'); }
        }
      }, Math.max(15, Number(state.syncInterval) || 30) * 1000);
      addActivity('Automatic sync enabled', `Refresh every ${state.syncInterval} seconds`, 'sync'); toast('Automatic sync enabled for this open tab.');
    } else { addActivity('Automatic sync paused', 'Automatic refresh has been turned off'); toast('Automatic sync paused.'); }
    if (activePage === 'automations') renderPage();
  }
  async function syncAll() {
    const sources = state.sources.filter((s) => sourceSecrets[s.id]);
    if (!sources.length) return toast('No authenticated sources are available in this session.', 'error');
    let success = 0;
    for (const source of sources) { try { await syncSource(source.id); success++; } catch (error) { source.status = 'error'; toast(`${source.name}: ${error.message}`, 'error'); } }
    toast(`${success} of ${sources.length} sources synchronized.`);
  }
  function removeDuplicates() {
    const dataset = currentDataset(); if (!dataset) return;
    const seen = new Set(); const unique = [];
    dataset.rows.forEach((row) => { const signature = JSON.stringify(dataset.columns.map((col) => row[col.key])); if (!seen.has(signature)) { seen.add(signature); unique.push(row); } });
    const removed = dataset.rows.length - unique.length;
    if (!removed) return toast('No duplicate rows were found.');
    if (!confirm(`Remove ${removed} duplicate rows from this workspace copy?`)) return;
    pushUndo(); dataset.rows = unique; dataset.updatedAt = new Date().toISOString(); persist(); renderPage(); addActivity('Duplicate rows removed', `${dataset.name}: ${removed} rows removed`); toast(`${removed} duplicate rows removed.`);
  }
  function trimWhitespace() {
    const dataset = currentDataset(); if (!dataset) return;
    pushUndo(); let changed = 0;
    dataset.rows.forEach((row) => dataset.columns.forEach((col) => { if (typeof row[col.key] === 'string') { const next = row[col.key].trim(); if (next !== row[col.key]) { row[col.key] = next; changed++; } } }));
    dataset.updatedAt = new Date().toISOString(); persist(); renderPage(); addActivity('Text whitespace trimmed', `${dataset.name}: ${changed} values cleaned`); toast(`${changed} text values cleaned.`);
  }
  function createDatasetModal() {
    openModal('Create a dataset', 'Start with an empty table and define its fields.', `<form id="datasetForm"><div class="form-field"><label>Dataset name</label><input name="name" required placeholder="e.g. Project inventory"></div><div class="form-field" style="margin-top:12px"><label>Description</label><textarea name="description" placeholder="What does this dataset contain?"></textarea></div><div class="form-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">Create dataset</button></div></form>`, (root) => {
      $('#datasetForm', root).addEventListener('submit', (event) => {
        event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name')).trim();
        const dataset = makeDataset(name, [], 'local', String(form.get('description') || ''));
        dataset.columns = [{ key: 'name', label: 'Name', type: 'string', visible: true }]; state.datasets.unshift(dataset); state.selectedDatasetId = dataset.id;
        persist(); closeModal(); setPage('explorer'); addActivity('Dataset created', `${name}: empty dataset created`); toast('Dataset created.');
      });
    });
  }
  function datasetMenu(id) {
    const dataset = state.datasets.find((d) => d.id === id); if (!dataset) return;
    const choice = prompt(`Dataset: ${dataset.name}\nType R to rename or D to delete this dataset.`, 'R');
    if (!choice) return;
    if (choice.toLowerCase() === 'r') {
      const name = prompt('New dataset name:', dataset.name); if (name?.trim()) { dataset.name = name.trim(); persist(); renderPage(); addActivity('Dataset renamed', dataset.name); toast('Dataset renamed.'); }
    } else if (choice.toLowerCase() === 'd') {
      if (!confirm(`Delete dataset "${dataset.name}" from this workspace?`)) return;
      state.datasets = state.datasets.filter((d) => d.id !== id); if (state.selectedDatasetId === id) state.selectedDatasetId = state.datasets[0]?.id || null;
      persist(); renderPage(); addActivity('Dataset deleted', dataset.name); toast('Dataset removed from workspace.');
    }
  }

  document.addEventListener('click', async (event) => {
    const nav = event.target.closest('[data-page]');
    if (nav) { setPage(nav.dataset.page); return; }
    const go = event.target.closest('[data-go]');
    if (go) { setPage(go.dataset.go); return; }
    const sort = event.target.closest('[data-sort]');
    if (sort) { const key = sort.dataset.sort; explorerSort = { key, direction: explorerSort.key === key && explorerSort.direction === 'asc' ? 'desc' : 'asc' }; renderPage(); return; }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'close-modal') closeModal();
    else if (action === 'backdrop-close' && event.target === button) closeModal();
    else if (action === 'import') triggerImport();
    else if (action === 'add-source') openSourceModal(button.dataset.type || 'supabase');
    else if (action === 'add-row') openRowModal();
    else if (action === 'edit-row') openRowModal(button.dataset.id);
    else if (action === 'add-column') openColumnModal();
    else if (action === 'add-filter') openFilterModal();
    else if (action === 'clear-filters') { activeFilters = []; explorerPage = 1; renderPage(); }
    else if (action === 'remove-filter') { activeFilters.splice(Number(button.dataset.index), 1); explorerPage = 1; renderPage(); }
    else if (action === 'rename-column') renameColumn(button.dataset.key);
    else if (action === 'delete-column') deleteColumn(button.dataset.key);
    else if (action === 'delete-row') deleteRow(button.dataset.id);
    else if (action === 'duplicate-row') duplicateRow(button.dataset.id);
    else if (action === 'bulk-delete') bulkDelete();
    else if (action === 'undo') undoLast();
    else if (action === 'toggle-column-menu') { showColumnMenu = !showColumnMenu; renderPage(); }
    else if (action === 'page-prev') { explorerPage = Math.max(1, explorerPage - 1); renderPage(); }
    else if (action === 'page-next') { explorerPage += 1; renderPage(); }
    else if (action === 'export-csv') exportRows('csv', selectedRows.size ? 'selected' : activePage === 'explorer' && (explorerSearch || activeFilters.length) ? 'filtered' : 'all');
    else if (action === 'export-json') exportRows('json');
    else if (action === 'export-xlsx') exportRows('xlsx');
    else if (action === 'export-backup') exportBackup();
    else if (action === 'sync-source') { try { await syncSource(button.dataset.id); toast('Source synchronized.'); } catch (error) { toast(error.message, 'error'); } }
    else if (action === 'delete-source') {
      const source = getSource(button.dataset.id); if (!source || !confirm(`Remove connection "${source.name}"? Its imported dataset will remain in your workspace.`)) return;
      state.sources = state.sources.filter((s) => s.id !== source.id); delete sourceSecrets[source.id]; persist(); renderPage(); addActivity('Data source removed', source.name); toast('Source removed.');
    }
    else if (action === 'load-more') await loadMore(button.dataset.id);
    else if (action === 'refresh-chart') drawPageCharts();
    else if (action === 'quality-refresh') { renderPage(); toast('Quality checks completed.'); }
    else if (action === 'remove-duplicates') removeDuplicates();
    else if (action === 'trim-whitespace') trimWhitespace();
    else if (action === 'toggle-autosync') toggleAutoSync(!state.autoSync);
    else if (action === 'sync-all') await syncAll();
    else if (action === 'toggle-theme') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; persist(); renderPage(); }
    else if (action === 'toggle-banner') { state.bannerDismissed = !state.bannerDismissed; persist(); renderPage(); }
    else if (action === 'clear-activity') { if (confirm('Clear all activity history?')) { state.activity = []; persist(); renderPage(); } }
    else if (action === 'reset-demo') { if (confirm('Reset this browser workspace to the original sample datasets? All locally imported and edited datasets will be removed.')) { localStorage.removeItem(STORAGE_KEY); location.reload(); } }
    else if (action === 'create-dataset') createDatasetModal();
    else if (action === 'open-dataset') { state.selectedDatasetId = button.dataset.id; explorerSearch = ''; activeFilters = []; selectedRows.clear(); setPage('explorer'); }
    else if (action === 'dataset-menu') datasetMenu(button.dataset.id);
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('[data-role="dataset-select"]')) {
      state.selectedDatasetId = target.value; explorerPage = 1; selectedRows.clear(); activeFilters = []; explorerSearch = ''; persist(); renderPage();
    } else if (target.matches('[data-role="analytics-column"]')) { analyticsColumn = target.value; drawPageCharts(); }
    else if (target.matches('[data-role="chart-type"]')) { analyticsChartType = target.value; drawPageCharts(); }
    else if (target.matches('[data-role="sync-interval"]')) { state.syncInterval = Number(target.value); persist(); if (state.autoSync) toggleAutoSync(true); }
    else if (target.matches('[data-action="select-row"]')) {
      if (target.checked) selectedRows.add(target.dataset.id); else selectedRows.delete(target.dataset.id);
      renderPage();
    } else if (target.matches('[data-action="select-page"]')) {
      const dataset = currentDataset(); const rows = filteredRows(dataset).slice((explorerPage - 1) * explorerPageSize, explorerPage * explorerPageSize);
      rows.forEach((row) => target.checked ? selectedRows.add(row._rowId) : selectedRows.delete(row._rowId)); renderPage();
    } else if (target.matches('[data-action="toggle-column"]')) {
      const col = currentDataset()?.columns.find((c) => c.key === target.dataset.key); if (col) { col.visible = target.checked; persist(); renderPage(); }
    }
  });
  document.addEventListener('input', (event) => {
    if (event.target.id === 'tableSearch') { explorerSearch = event.target.value; explorerPage = 1; const pos = event.target.selectionStart; renderPage(); const input = $('#tableSearch'); input?.focus(); input?.setSelectionRange(pos, pos); }
    if (event.target.id === 'librarySearch') {
      const query = event.target.value.toLowerCase();
      $$('#libraryGrid .dataset-card').forEach((card) => { card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none'; });
    }
  });
  $('#fileInput').addEventListener('change', (event) => handleFiles([...event.target.files]));
  $('#topAddSource').addEventListener('click', () => openSourceModal('supabase'));
  $('#bannerImport').addEventListener('click', triggerImport);
  $('#dismissBanner').addEventListener('click', () => { state.bannerDismissed = true; persist(); });
  $('#themeToggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; persist(); renderPage(); });
  $('#profileMenu').addEventListener('click', () => { toast('Profile and team accounts are planned for the authenticated backend version.'); });
  $('#mobileMenu').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#sidebarOverlay').classList.add('show'); });
  $('#sidebarClose').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#sidebarOverlay').classList.remove('show'); });
  $('#sidebarOverlay').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#sidebarOverlay').classList.remove('show'); });
  $('#globalSearch').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { explorerSearch = event.target.value; activeFilters = []; setPage('explorer'); const input = $('#tableSearch'); if (input) input.value = explorerSearch; }
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#globalSearch').focus(); }
    if (event.key === 'Escape') closeModal();
  });
  window.addEventListener('resize', () => { clearTimeout(chartResizeTimer); chartResizeTimer = setTimeout(drawPageCharts, 100); });

  // Session-only credentials cannot be restored after reload, so stop any persisted auto-sync flag.
  state.autoSync = false;
  // Restore the selected page's data, but never restore source secrets from storage.
  persist();
  setPage('overview');
})();
