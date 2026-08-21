(() => {
  "use strict";

  const ICON_PATHS = {
    water: "M12 2.5C12 2.5 5.5 11 5.5 15.5a6.5 6.5 0 0 0 13 0C18.5 11 12 2.5 12 2.5Z",
    teeth: "M8.5 4c-1.8 0-3 2-3 5.2 0 2.8.7 5.3 1.2 7.6.3 1.3.9 2.2 1.6 2.2.7 0 1-.7 1.3-2 .4-1.9 1-3.5 1.9-3.5.9 0 1.5 1.6 1.9 3.5.3 1.3.6 2 1.3 2 .7 0 1.3-.9 1.6-2.2.5-2.3 1.2-4.8 1.2-7.6 0-3.2-1.2-5.2-3-5.2-1 0-1.9.6-2.6 1.4C10.4 4.6 9.5 4 8.5 4Z",
    floss: "M4 6c4.5 4.5 4.5 7.5 8 7.5S16.5 10.5 21 6M4 18c4.5-4.5 4.5-7.5 8-7.5S16.5 13.5 21 18",
    dumbbell: "M4 9v6M20 9v6M6.5 6.5v11M17.5 6.5v11M6.5 12h11",
    book: "M3 5.2C5.2 4 8.3 3.8 12 5v14c-3.7-1.2-6.8-1-9-.2ZM21 5.2C18.8 4 15.7 3.8 12 5v14c3.7-1.2 6.8-1 9-.2Z",
    leaf: "M4.5 19.5C4.5 11 9.5 5 20 3c1 9-3.5 15.5-11 16.5-1.7.2-3.3.1-4.5 0Z",
    pencil: "M4 20l0.9-3.8L15.6 5.4l3 3L7.9 19.1 4 20Z M13.5 7.4l3 3",
    moon: "M20 14.2A8.3 8.3 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2Z",
    stretch: "M12 3.5v3.7M8.7 6.2l3.3 2 3.3-2M5 9.7l7 3.6 7-3.6M5 20l7-9 7 9M8.7 20h6.6",
    phoneSlash: "M6.5 3.5h9a2 2 0 0 1 2 2v3M17.5 16.5v3a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-15a2 2 0 0 1 1.2-1.83M3 3l18 18M10.5 17h2"
  };

  const HABITS = [
    { id: "water", name: "Drink water", icon: "water", freq: "8x / day",
      fact: "Even 1–2% fluid loss measurably impairs attention, working memory and mood.",
      mechanism: "The brain is roughly 75% water; mild dehydration lowers blood volume, reducing oxygen and glucose delivery to neural tissue.",
      citation: "J. Nutr., 2012",
      tips: ["Keep a bottle in sight — visibility beats willpower.", "Pair a glass with an existing habit, like each meal."],
      week: [1,1,0,1,1,1,1], time: "9:00 AM" },
    { id: "teeth", name: "Brush teeth", icon: "teeth", freq: "3x / day",
      fact: "Brushing roughly every 8 hours resets the plaque biofilm before it matures and turns acidic.",
      mechanism: "Plaque bacteria start producing enamel-eroding acid within minutes of eating; frequent brushing disrupts the colony before it thickens.",
      citation: "J. Clin. Periodontol.",
      tips: ["Brush right after breakfast, lunch and before bed.", "Leave the brush somewhere you'll see it each time."],
      week: [1,1,1,1,1,0,1], time: "7:30 AM" },
    { id: "floss", name: "Floss", icon: "floss", freq: "1x / day",
      fact: "Floss reaches the roughly 40% of tooth surface bristles can't touch, cutting gum inflammation within two weeks.",
      mechanism: "Interdental plaque left undisturbed hardens into tartar that brushing alone can't remove.",
      citation: "Cochrane Oral Health Review",
      tips: ["Pre-cut floss picks remove the setup step.", "Do it right before brushing, not after."],
      week: [1,0,0,1,0,1,0], time: "9:30 PM" },
    { id: "gym", name: "Gym", icon: "dumbbell", freq: "4x / week",
      fact: "Regular training raises BDNF, a protein that supports new neuron growth and mood regulation.",
      mechanism: "Contracting muscle releases signaling proteins (myokines) that cross the blood-brain barrier.",
      citation: "Neurosci. Biobehav. Rev.",
      tips: ["Schedule it like a meeting, not a maybe.", "Lay out gym clothes the night before."],
      week: [1,0,1,0,1,0,0], time: "6:00 PM" },
    { id: "reading", name: "Reading", icon: "book", freq: "20 min / day",
      fact: "Deep reading builds cortical connectivity that measurably persists for days afterward.",
      mechanism: "Sustained narrative attention appears to leave a short-term 'echo' in language and somatosensory regions.",
      citation: "Berns et al., Brain Connectivity, 2013",
      tips: ["Keep the book more visible than your phone.", "Start with 10 minutes — consistency beats duration."],
      week: [1,1,1,0,1,1,1], time: "9:00 PM" },
    { id: "mindfulness", name: "Mindfulness", icon: "leaf", freq: "10 min / day",
      fact: "Eight weeks of practice is enough to increase grey-matter density in the hippocampus and shrink amygdala reactivity.",
      mechanism: "A calmer amygdala means a lower baseline stress response to the same trigger.",
      citation: "Hölzel et al., Psychiatry Research, 2011",
      tips: ["Same time, same spot, every day.", "Start at 3 minutes; extend once it's automatic."],
      week: [0,1,1,1,1,1,1], time: "7:00 AM" },
    { id: "journaling", name: "Journaling", icon: "pencil", freq: "1x / day",
      fact: "Writing about stressors reduces intrusive thoughts and blunts cortisol response to them.",
      mechanism: "Turning raw emotion into language recruits the prefrontal cortex, which helps regulate the amygdala's alarm signal.",
      citation: "Pennebaker & Beall",
      tips: ["Write before checking your phone, not after.", "One line still counts as a streak."],
      week: [1,1,0,1,1,0,1], time: "10:00 PM" },
    { id: "sleep", name: "Sleep on time", icon: "moon", freq: "Nightly",
      fact: "A fixed sleep time predicts better glucose control and cognition than sleep duration alone.",
      mechanism: "The suprachiasmatic nucleus times hormone release to a stable clock; shifting bedtimes blunts that signal.",
      citation: "Sleep Health cohort research",
      tips: ["Set a bedtime alarm, not just a wake alarm.", "Keep the same time on weekends too."],
      week: [1,1,1,1,0,0,1], time: "10:30 PM" },
    { id: "stretch", name: "Stretching", icon: "stretch", freq: "1x / day",
      fact: "Regular stretching adds sarcomeres to muscle fibers, permanently increasing flexible range.",
      mechanism: "Sustained tension signals muscle to grow in series, not just to lengthen under load.",
      citation: "J. Appl. Physiol.",
      tips: ["Stretch right after a shower — muscles are warmer.", "Hold each position 30 seconds, no bouncing."],
      week: [0,1,1,0,1,1,0], time: "7:15 AM" },
    { id: "nophone", name: "No phone before bed", icon: "phoneSlash", freq: "Nightly",
      fact: "Screen light in the hour before bed delays melatonin release and pushes sleep onset later.",
      mechanism: "Blue wavelengths stimulate melanopsin cells in the retina that tell the brain's clock it's still daytime.",
      citation: "Chang et al., PNAS, 2015",
      tips: ["Charge your phone outside the bedroom.", "Swap in a book or dim lamp as the wind-down cue."],
      week: [1,0,1,1,0,1,1], time: "10:00 PM" }
  ];

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
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${ICON_PATHS[key]}"/></svg>`;
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
