(() => {
  "use strict";

  // ICON_PATHS and HABITS (the science-backed fact/mechanism/citation/tips
  // per habit) live in habits.js, loaded before this file.
  const FALLBACK_ICON = "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z";

  const DEFAULT_SELECTED = ["water", "teeth", "gym", "reading", "mindfulness", "journaling"];
  const WEEKLY_GOAL_DAYS = 5;

  const state = {
    screen: "onboarding", // onboarding | detail | tabs
    tab: "today", // today | stats | reminders
    selected: DEFAULT_SELECTED.slice(),
    activeId: null,
    checkins: {},
    reminders: HABITS.reduce((acc, h) => { acc[h.id] = true; return acc; }, {})
  };

  function icon(key, size) {
    const s = size || 18;
    const d = ICON_PATHS[key] || FALLBACK_ICON;
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
  }

  function computeStreak(week) {
    let s = 0;
    for (let i = week.length - 1; i >= 0; i--) { if (week[i]) s++; else break; }
    return s;
  }

  function selectedHabits() {
    return HABITS.filter(h => state.selected.includes(h.id));
  }

  // ---- screen visibility ----
  const el = {
    onboarding: document.getElementById("screen-onboarding"),
    detail: document.getElementById("screen-detail"),
    tabs: document.getElementById("screen-tabs"),
    chipGrid: document.getElementById("chip-grid"),
    selectedCount: document.getElementById("selected-count"),
    btnFinish: document.getElementById("btn-finish"),
    btnBack: document.getElementById("btn-back"),
    detailBody: document.getElementById("detail-body"),
    tabToday: document.getElementById("tab-today"),
    tabStats: document.getElementById("tab-stats"),
    tabReminders: document.getElementById("tab-reminders")
  };

  function render() {
    el.onboarding.classList.toggle("hidden", state.screen !== "onboarding");
    el.detail.classList.toggle("hidden", state.screen !== "detail");
    el.tabs.classList.toggle("hidden", state.screen !== "tabs");

    if (state.screen === "onboarding") renderOnboarding();
    if (state.screen === "detail") renderDetail();
    if (state.screen === "tabs") renderTabs();
  }

  function renderOnboarding() {
    el.chipGrid.innerHTML = HABITS.map(h => {
      const isSelected = state.selected.includes(h.id);
      return `
        <div class="chip${isSelected ? " selected" : ""}" data-id="${h.id}">
          <span class="chip-icon">${icon(h.icon, 20)}</span>
          <span class="chip-name">${h.name}</span>
          <span class="chip-freq">${h.freq}</span>
        </div>`;
    }).join("");

    el.chipGrid.querySelectorAll(".chip").forEach(node => {
      node.addEventListener("click", () => {
        const id = node.dataset.id;
        const has = state.selected.includes(id);
        state.selected = has ? state.selected.filter(x => x !== id) : [...state.selected, id];
        render();
      });
    });

    el.selectedCount.textContent = `${state.selected.length} selected`;
    el.btnFinish.disabled = state.selected.length === 0;
  }

  el.btnFinish.addEventListener("click", () => {
    if (state.selected.length === 0) return;
    state.screen = "tabs";
    state.tab = "today";
    render();
  });

  el.btnBack.addEventListener("click", () => {
    state.screen = "tabs";
    render();
  });

  function openDetail(id) {
    state.activeId = id;
    state.screen = "detail";
    render();
  }

  function toggleCheckin(id, e) {
    if (e) e.stopPropagation();
    state.checkins[id] = !state.checkins[id];
    render();
  }

  function renderDetail() {
    const active = HABITS.find(h => h.id === state.activeId);
    if (!active) return;
    const done = !!state.checkins[active.id];
    const streak = computeStreak(active.week);

    el.detailBody.innerHTML = `
      <div class="detail-head-row">
        <div class="detail-icon">${icon(active.icon, 26)}</div>
        <div>
          <div class="detail-name">${active.name}</div>
          <div class="detail-freq">${active.freq}</div>
        </div>
      </div>
      <div class="detail-actions">
        <button type="button" class="btn btn-primary" id="btn-log" style="flex:1;">
          ${done ? "Logged today ✓" : "Log today"}
        </button>
        <div class="streak-tag">
          <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M170.83,118.13c-6.53,7.51-19,20.7-19,38.87a24,24,0,0,0,48,0C199.83,138.83,187.36,125.64,170.83,118.13Z"/></svg>
          ${streak} day streak
        </div>
      </div>
      <div class="section-label">Why it works</div>
      <div class="card">
        <div class="card-fact">${active.fact}</div>
        <div class="card-mechanism">${active.mechanism}</div>
        <div class="card-citation">${active.citation}</div>
      </div>
      <div class="section-label">Tips</div>
      ${active.tips.map(t => `<div class="tip-row"><span class="tip-dash">—</span>${t}</div>`).join("")}
    `;

    document.getElementById("btn-log").addEventListener("click", (e) => toggleCheckin(active.id, e));
  }

  function switchTab(tab) {
    state.tab = tab;
    render();
  }

  document.querySelectorAll(".tabbtn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  function renderTabs() {
    el.tabToday.classList.toggle("hidden", state.tab !== "today");
    el.tabStats.classList.toggle("hidden", state.tab !== "stats");
    el.tabReminders.classList.toggle("hidden", state.tab !== "reminders");

    document.querySelectorAll(".tabbtn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === state.tab);
    });

    if (state.tab === "today") renderToday();
    if (state.tab === "stats") renderStats();
    if (state.tab === "reminders") renderReminders();
  }

  function renderToday() {
    const habits = selectedHabits();
    const doneCount = habits.filter(h => state.checkins[h.id]).length;
    const totalCount = habits.length || 1;
    const pct = Math.round((doneCount / totalCount) * 100);
    const todayDate = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

    el.tabToday.innerHTML = `
      <div class="eyebrow">${todayDate}</div>
      <h2 class="title-lg" style="margin-bottom:18px;">Today</h2>
      <div class="progress-row">
        <div class="ring" style="background: conic-gradient(var(--accent-strong) ${pct * 3.6}deg, var(--accent-track) 0deg);">
          <div class="ring-inner">${pct}%</div>
        </div>
        <div>
          <div class="progress-meta-title">${doneCount} of ${totalCount} done</div>
          <div class="progress-meta-sub">Keep your streaks alive</div>
        </div>
      </div>
      <div id="habit-rows"></div>
    `;

    const rowsEl = document.getElementById("habit-rows");
    rowsEl.innerHTML = habits.map(h => {
      const isDone = !!state.checkins[h.id];
      return `
        <div class="habit-row" data-id="${h.id}">
          <div class="habit-icon">${icon(h.icon, 18)}</div>
          <div class="habit-main">
            <div class="habit-name">${h.name}</div>
            <div class="habit-sub">${h.freq} · ${computeStreak(h.week)} day streak</div>
          </div>
          <div class="chk${isDone ? " done" : ""}" data-chk="${h.id}">
            ${isDone ? '<svg width="14" height="14" viewBox="0 0 256 256" fill="#fff"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,1,1,11.32-11.32L96,182.34,218.34,60.02a8,8,0,1,1,11.32,11.32Z"/></svg>' : ""}
          </div>
        </div>`;
    }).join("");

    rowsEl.querySelectorAll(".habit-row").forEach(row => {
      row.addEventListener("click", () => openDetail(row.dataset.id));
    });
    rowsEl.querySelectorAll("[data-chk]").forEach(chk => {
      chk.addEventListener("click", (e) => toggleCheckin(chk.dataset.chk, e));
    });
  }

  function renderStats() {
    const habits = selectedHabits();
    el.tabStats.innerHTML = `
      <h2 class="title-lg" style="margin-bottom:4px;">Consistency</h2>
      <div class="subtitle">Goal: ${WEEKLY_GOAL_DAYS} of 7 days per habit</div>
      ${habits.map(h => {
        const streak = computeStreak(h.week);
        const cells = h.week.map((d, i) => {
          let bg = "var(--border)";
          if (d) bg = (i >= 7 - WEEKLY_GOAL_DAYS) ? "var(--accent-strong)" : "var(--accent-soft)";
          return `<div class="week-cell" style="background:${bg};"></div>`;
        }).join("");
        return `
          <div class="stat-block">
            <div class="stat-head">
              <div class="stat-head-left">${icon(h.icon, 16)}<span class="stat-name">${h.name}</span></div>
              <span class="tag-outline">${streak}d streak</span>
            </div>
            <div class="week-cells">${cells}</div>
          </div>`;
      }).join("")}
    `;
  }

  function renderReminders() {
    const habits = selectedHabits();
    el.tabReminders.innerHTML = `
      <h2 class="title-lg" style="margin-bottom:4px;">Reminders</h2>
      <div class="subtitle">Gentle nudges, not alarms.</div>
      ${habits.map(h => `
        <div class="reminder-row">
          <div class="reminder-icon">${icon(h.icon, 16)}</div>
          <div style="flex:1;">
            <div class="reminder-name">${h.name}</div>
            <div class="reminder-time">${h.time}</div>
          </div>
          <label class="switch">
            <input type="checkbox" data-reminder="${h.id}" ${state.reminders[h.id] ? "checked" : ""}>
            <span class="switch-track"></span>
          </label>
        </div>`).join("")}
    `;

    el.tabReminders.querySelectorAll("[data-reminder]").forEach(input => {
      input.addEventListener("change", () => {
        state.reminders[input.dataset.reminder] = input.checked;
      });
    });
  }

  render();
})();
