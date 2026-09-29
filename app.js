
const APP_VERSION = "0.1.0";
const STORAGE_KEY = "rby-companion-save";

let state = loadState();

function makeInitialState(gameVersion) {
  return {
    appVersion: APP_VERSION,
    gameVersion,

    badges: Object.fromEntries(
      PROGRESSION_DATA.badges.map(badge => [badge.id, false])
    ),

    hms: Object.fromEntries(
      PROGRESSION_DATA.hms.map(hm => [hm.id, false])
    ),

    keyItems: Object.fromEntries(
      PROGRESSION_DATA.keyItems.map(item => [item.id, false])
    ),

    dex: {},
    party: [null, null, null, null, null, null],
    journey: {},

    activeView: "main"
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Could not load save:", error);
    return null;
  }
}

function saveState() {
  if (!state) return;

  state.appVersion = APP_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setVersion(version) {
  state = makeInitialState(version);
  saveState();
  render();
}

function setView(view) {
  state.activeView = view;
  saveState();
  render();
}

function toggleFlag(group, id) {
  state[group][id] = !state[group][id];
  saveState();
  render();
}

function resetSave() {
  const confirmed = window.confirm(
    "Start a new game? This will erase the current local save."
  );

  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  state = null;
  render();
}

function exportSave() {
  if (!state) return;

  const now = new Date();

  const pad = number => String(number).padStart(2, "0");

  const timestamp =
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes());

  const filename = `${timestamp}v${APP_VERSION}.json`;

  const blob = new Blob(
    [JSON.stringify(state, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function importSave(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = event => {
    try {
      const importedState = JSON.parse(event.target.result);

      if (
        !["red", "blue", "yellow"].includes(importedState.gameVersion)
      ) {
        throw new Error("Invalid game version.");
      }

      state = importedState;

      if (!state.activeView) {
        state.activeView = "main";
      }

      saveState();
      render();
    } catch (error) {
      window.alert(
        `Could not import save: ${error.message}`
      );
    }
  };

  reader.readAsText(file);
}

function renderSplash() {
  return `
    <main class="splash">
      <section class="splash-card">
        <h1>RBY Version Companion</h1>

        <label for="version-select">
          Select Version
        </label>

        <select id="version-select">
          <option value="">Choose...</option>
          <option value="red">Pokémon Red</option>
          <option value="blue">Pokémon Blue</option>
          <option value="yellow">Pokémon Yellow</option>
        </select>

        <p class="brand">
          Khorrzh Kustom
        </p>
      </section>
    </main>
  `;
}

function renderHeader() {
  const badgeButtons = PROGRESSION_DATA.badges
    .map(
      badge => `
        <button
          class="badge-button ${
            state.badges[badge.id] ? "obtained" : ""
          }"
          data-badge="${badge.id}"
          title="${badge.name}"
        >
          ${badge.name.replace(" Badge", "")}
        </button>
      `
    )
    .join("");

  return `
    <header class="app-header">

      <div class="title-row">

        <div>
          <h1>RBY Companion</h1>

          <p class="version-label">
            Pokémon ${capitalize(state.gameVersion)}
            ·
            v${APP_VERSION}
          </p>
        </div>

        <div class="save-actions">

          <button id="export-save">
            Export
          </button>

          <label class="button-label">
            Import

            <input
              id="import-save"
              type="file"
              accept=".json,application/json"
            >
          </label>

          <button
            id="reset-save"
            class="danger"
          >
            New Game
          </button>

        </div>

      </div>

      <div class="badge-strip">
        ${badgeButtons}
      </div>

      <nav class="nav-tabs">
        ${navButton("main", "Main")}
        ${navButton("journey", "Journey")}
        ${navButton("dex", "Dex")}
      </nav>

    </header>
  `;
}

function navButton(view, label) {
  return `
    <button
      class="nav-button ${
        state.activeView === view ? "active" : ""
      }"
      data-view="${view}"
    >
      ${label}
    </button>
  `;
}

function renderMain() {
  return `
    <section class="page-grid">

      <article class="panel">
        <h2>Party</h2>

        <p class="muted">
          Party selection will populate from Pokémon
          marked Obtained in the Dex.
        </p>

        <div class="party-grid">
          ${state.party
            .map(
              (_, index) => `
                <div class="party-slot">
                  <strong>
                    Slot ${index + 1}
                  </strong>

                  <span>
                    Empty
                  </span>
                </div>
              `
            )
            .join("")}
        </div>
      </article>

      <article class="panel">
        <h2>Party Evaluation</h2>

        <p class="muted">
          Typing coverage will appear here once
          Pokémon data and party selection are wired in.
        </p>
      </article>

      <article class="panel">
        <h2>Current Journey Objectives</h2>

        <p class="muted">
          No verified Journey data loaded yet.
        </p>
      </article>

      <article class="panel">
        <h2>HMs</h2>

        <div class="check-grid">
          ${PROGRESSION_DATA.hms
            .map(item => flagControl("hms", item))
            .join("")}
        </div>
      </article>

      <article class="panel wide">
        <h2>Key Items</h2>

        <div class="check-grid">
          ${PROGRESSION_DATA.keyItems
            .map(item => flagControl("keyItems", item))
            .join("")}
        </div>
      </article>

    </section>
  `;
}

function flagControl(group, item) {
  return `
    <label class="flag-control">

      <input
        type="checkbox"
        data-flag-group="${group}"
        data-flag-id="${item.id}"
        ${state[group][item.id] ? "checked" : ""}
      >

      <span>
        ${item.name}
      </span>

    </label>
  `;
}

function renderJourney() {
  return `
    <section class="panel">

      <div class="section-heading">

        <div>
          <h2>Journey</h2>

          <p class="muted">
            Only progression-significant locations
            and discrete optional actions belong here.
          </p>
        </div>

      </div>

      <div class="empty-state">

        <strong>
          Journey database not populated yet.
        </strong>

        <p>
          Progression and Optional sections will appear
          dynamically as verified RBY data is added.
        </p>

      </div>

    </section>
  `;
}

function renderDex() {
  return `
    <section class="panel">

      <div class="section-heading">

        <div>
          <h2>Pokédex</h2>

          <p class="muted">
            Wild availability, evolution methods,
            version availability, Obtained state,
            and Hall of Fame tracking will live here.
          </p>
        </div>

      </div>

      <div class="filter-row">

        <button class="filter-button active">
          All
        </button>

        <button class="filter-button">
          Obtained
        </button>

        <button class="filter-button">
          Not Obtained
        </button>

        <button class="filter-button">
          Hall of Fame
        </button>

        <button class="filter-button">
          Unobtainable
        </button>

      </div>

      <div class="empty-state">

        <strong>
          Pokédex database not populated yet.
        </strong>

        <p>
          We will add the 151 Pokémon from
          verified Red/Blue/Yellow source data.
        </p>

      </div>

    </section>
  `;
}

function renderApp() {
  let pageContent = renderMain();

  if (state.activeView === "journey") {
    pageContent = renderJourney();
  }

  if (state.activeView === "dex") {
    pageContent = renderDex();
  }

  return `
    <div class="app-shell">

      ${renderHeader()}

      <main class="content">
        ${pageContent}
      </main>

    </div>
  `;
}

function render() {
  const root = document.getElementById("app");

  root.innerHTML = state
    ? renderApp()
    : renderSplash();

  bindEvents();
}

function bindEvents() {
  const versionSelect =
    document.getElementById("version-select");

  if (versionSelect) {
    versionSelect.addEventListener(
      "change",
      event => {
        if (event.target.value) {
          setVersion(event.target.value);
        }
      }
    );
  }

  document
    .querySelectorAll("[data-view]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          setView(button.dataset.view);
        }
      );
    });

  document
    .querySelectorAll("[data-badge]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          toggleFlag(
            "badges",
            button.dataset.badge
          );
        }
      );
    });

  document
    .querySelectorAll("[data-flag-group]")
    .forEach(input => {
      input.addEventListener(
        "change",
        () => {
          toggleFlag(
            input.dataset.flagGroup,
            input.dataset.flagId
          );
        }
      );
    });

  document
    .getElementById("export-save")
    ?.addEventListener(
      "click",
      exportSave
    );

  document
    .getElementById("reset-save")
    ?.addEventListener(
      "click",
      resetSave
    );

  document
    .getElementById("import-save")
    ?.addEventListener(
      "change",
      event => {
        importSave(
          event.target.files[0]
        );

        event.target.value = "";
      }
    );
}

function capitalize(value) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

render();
