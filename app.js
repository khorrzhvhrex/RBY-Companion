// ============================================================
// APP CONFIG
// ============================================================

const APP_VERSION = "0.1.0";

const STORAGE_KEY = "rby-companion-save";
const ENCOUNTER_CACHE_KEY = "rby-companion-encounter-cache-v1";

const VALID_VERSIONS = ["red", "blue", "yellow"];

const DEX_FILTERS = [
  "all",
  "obtained",
  "not-obtained",
  "hall-of-fame",
  "unobtainable"
];


// ============================================================
// STATE
// ============================================================

let state = loadState();

ensureStateShape();


// ============================================================
// INITIAL STATE
// ============================================================

function makeInitialState(gameVersion) {
  return {
    appVersion: APP_VERSION,
    gameVersion,

    badges: Object.fromEntries(
      PROGRESSION_DATA.badges.map(badge => [
        badge.id,
        false
      ])
    ),

    hms: Object.fromEntries(
      PROGRESSION_DATA.hms.map(hm => [
        hm.id,
        false
      ])
    ),

    keyItems: Object.fromEntries(
      PROGRESSION_DATA.keyItems.map(item => [
        item.id,
        false
      ])
    ),

    dex: {},

    party: [
      null,
      null,
      null,
      null,
      null,
      null
    ],

    journey: {},

    storyFlags: {},
    
    exclusiveChoices: {
      eeveeEvolution: null
    },
    
    activeView: "main",

    dexFilter: "all"
  };
}


// ============================================================
// STATE MIGRATION / SHAPE CHECK
// ============================================================

function ensureStateShape() {
  if (!state) {
    return;
  }

  state.appVersion = APP_VERSION;

  state.badges ||= {};
  state.hms ||= {};
  state.keyItems ||= {};
  state.dex ||= {};
  state.journey ||= {};
  state.storyFlags ||= {};
  state.exclusiveChoices ||= {};
  
  if (
    !Object.prototype.hasOwnProperty.call(
      state.exclusiveChoices,
      "eeveeEvolution"
    )
  ) {
    state.exclusiveChoices.eeveeEvolution = null;
  }

  if (!Array.isArray(state.party)) {
    state.party = [
      null,
      null,
      null,
      null,
      null,
      null
    ];
  }

  while (state.party.length < 6) {
    state.party.push(null);
  }

  state.party = state.party.slice(0, 6);

  state.activeView ||= "main";

  if (!DEX_FILTERS.includes(state.dexFilter)) {
    state.dexFilter = "all";
  }

  for (const badge of PROGRESSION_DATA.badges) {
    if (typeof state.badges[badge.id] !== "boolean") {
      state.badges[badge.id] = false;
    }
  }

  for (const hm of PROGRESSION_DATA.hms) {
    if (typeof state.hms[hm.id] !== "boolean") {
      state.hms[hm.id] = false;
    }
  }

  for (const item of PROGRESSION_DATA.keyItems) {
    if (
      typeof state.keyItems[item.id] !== "boolean"
    ) {
      state.keyItems[item.id] = false;
    }
  }

  saveState();
}


// ============================================================
// LOCAL STORAGE
// ============================================================

function loadState() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    return raw
      ? JSON.parse(raw)
      : null;
  } catch (error) {
    console.error(
      "Could not load save:",
      error
    );

    return null;
  }
}


function saveState() {
  if (!state) {
    return;
  }

  state.appVersion = APP_VERSION;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}


// ============================================================
// VERSION / VIEW CONTROL
// ============================================================

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


// ============================================================
// GENERIC FLAGS
// ============================================================

function toggleFlag(group, id) {
  state[group][id] =
    !state[group][id];

  saveState();

  render();
}


// ============================================================
// SAVE RESET
// ============================================================

function resetSave() {
  const confirmed =
    window.confirm(
      "Start a new game? This will erase the current local save."
    );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(
    STORAGE_KEY
  );

  state = null;

  render();
}


// ============================================================
// SAVE EXPORT
// ============================================================

function exportSave() {
  if (!state) {
    return;
  }

  const now = new Date();

  const pad = number =>
    String(number).padStart(2, "0");

  const timestamp =
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes());

  const filename =
    `${timestamp}v${APP_VERSION}.json`;

  const blob =
    new Blob(
      [
        JSON.stringify(
          state,
          null,
          2
        )
      ],
      {
        type: "application/json"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}


// ============================================================
// SAVE IMPORT
// ============================================================

function importSave(file) {
  if (!file) {
    return;
  }

  const reader =
    new FileReader();

  reader.onload = event => {
    try {
      const importedState =
        JSON.parse(
          event.target.result
        );

      if (
        !VALID_VERSIONS.includes(
          importedState.gameVersion
        )
      ) {
        throw new Error(
          "Invalid game version."
        );
      }

      state =
        importedState;

      ensureStateShape();

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


// ============================================================
// SPLASH
// ============================================================

function renderSplash() {
  return `
    <main class="splash">

      <section class="splash-card">

        <h1>
          RBY Version Companion
        </h1>

        <label for="version-select">
          Select Version
        </label>

        <select id="version-select">

          <option value="">
            Choose...
          </option>

          <option value="red">
            Pokémon Red
          </option>

          <option value="blue">
            Pokémon Blue
          </option>

          <option value="yellow">
            Pokémon Yellow
          </option>

        </select>

        <p class="brand">
          Khorrzh Kustom
        </p>

      </section>

    </main>
  `;
}


// ============================================================
// HEADER
// ============================================================

function renderHeader() {
  const badgeButtons =
    PROGRESSION_DATA.badges
      .map(
        badge => `
          <button
            class="badge-button ${
              state.badges[badge.id]
                ? "obtained"
                : ""
            }"
            data-badge="${badge.id}"
            title="${badge.name}"
            aria-label="${badge.name}"
          >
            <img
              src="assets/badges/${badge.id}.png"
              alt="${badge.name}"
              class="badge-icon"
            >
          </button>
        `
      )
      .join("");

  return `
    <header class="app-header">

      <div class="title-row">

        <div>

          <h1>
            RBY Companion
          </h1>

          <p class="version-label">
            Pokémon ${capitalize(
              state.gameVersion
            )}
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

        ${navButton(
          "main",
          "Main"
        )}

        ${navButton(
          "journey",
          "Journey"
        )}

        ${navButton(
          "dex",
          "Dex"
        )}

      </nav>

    </header>
  `;
}


function navButton(view, label) {
  return `
    <button
      class="nav-button ${
        state.activeView === view
          ? "active"
          : ""
      }"
      data-view="${view}"
    >
      ${label}
    </button>
  `;
}


// ============================================================
// MAIN PAGE
// ============================================================

// ============================================================
// PARTY
// ============================================================

function getObtainedPokemon() {
  return POKEMON_DATA.filter(
    pokemon =>
      getDexEntry(
        pokemon.id
      ).obtained
  );
}


// ------------------------------------------------------------
// PARTY SLOT STATE
// ------------------------------------------------------------

function getPartyPokemon(slotIndex) {
  const pokemonId =
    state.party[slotIndex];

  if (!pokemonId) {
    return null;
  }

  return (
    POKEMON_BY_ID[pokemonId] ||
    null
  );
}


function setPartyPokemon(
  slotIndex,
  pokemonId
) {
  if (
    slotIndex < 0 ||
    slotIndex > 5
  ) {
    return;
  }

  if (!pokemonId) {
    state.party[slotIndex] = null;

    saveState();
    render();

    return;
  }

  const pokemon =
    POKEMON_BY_ID[pokemonId];

  if (!pokemon) {
    return;
  }

  if (
    !getDexEntry(
      pokemonId
    ).obtained
  ) {
    return;
  }

  state.party[slotIndex] =
    pokemonId;

  saveState();
  render();
}


// ------------------------------------------------------------
// PARTY VALIDATION
// ------------------------------------------------------------

function validateParty() {
  state.party =
    state.party.map(
      pokemonId => {
        if (!pokemonId) {
          return null;
        }

        const pokemon =
          POKEMON_BY_ID[
            pokemonId
          ];

        if (!pokemon) {
          return null;
        }

        if (
          !getDexEntry(
            pokemonId
          ).obtained
        ) {
          return null;
        }

        return pokemonId;
      }
    );
}


// ------------------------------------------------------------
// PARTY EVOLUTION
// ------------------------------------------------------------

function evolvePartyPokemon(
  slotIndex,
  targetPokemonId
) {
  const pokemon =
    getPartyPokemon(
      slotIndex
    );

  if (!pokemon) {
    return;
  }

  const evolution =
    pokemon.evolvesTo.find(
      option =>
        option.target ===
        targetPokemonId
    );

  if (!evolution) {
    return;
  }

  const evolvedPokemon =
    POKEMON_BY_ID[
      targetPokemonId
    ];

  if (!evolvedPokemon) {
    return;
  }


  // ------------------------------------------------------------
  // RECORD EEVEE EVOLUTION CHOICE
  // ------------------------------------------------------------

  if (
    pokemon.id === 133 &&
    !state.exclusiveChoices
      .eeveeEvolution
  ) {
    const eeveeChoices = {
      134: "vaporeon",
      135: "jolteon",
      136: "flareon"
    };

    state.exclusiveChoices
      .eeveeEvolution =
        eeveeChoices[
          targetPokemonId
        ] || null;
  }


  // ------------------------------------------------------------
  // REPLACE PARTY MEMBER
  // ------------------------------------------------------------

  state.party[
    slotIndex
  ] = targetPokemonId;


  // ------------------------------------------------------------
  // MARK EVOLUTION OBTAINED
  // ------------------------------------------------------------

  const dexEntry =
    ensureDexEntry(
      targetPokemonId
    );

  dexEntry.obtained = true;


  // ------------------------------------------------------------
  // SAVE AND REFRESH
  // ------------------------------------------------------------

  saveState();

  render();
}


// ------------------------------------------------------------
// PARTY EVOLUTION DISPLAY
// ------------------------------------------------------------

function renderPartyEvolutionControls(
  pokemon,
  slotIndex
) {
  if (
    !pokemon.evolvesTo.length
  ) {
    return "";
  }

  return `
    <div class="party-evolution">

      <div class="party-evolution-label">
        Evolution
      </div>

      <div class="party-evolution-options">

        ${pokemon.evolvesTo
          .map(
            evolution => {
              const target =
                POKEMON_BY_ID[
                  evolution.target
                ];

              if (!target) {
                return "";
              }

              return `
                <button
                  type="button"
                  class="party-evolve-button"
                  data-party-evolve-slot="${slotIndex}"
                  data-party-evolve-target="${target.id}"
                >
                  <span>
                    Evolve → ${target.name}
                  </span>

                  <small>
                    ${evolution.condition}
                  </small>
                </button>
              `;
            }
          )
          .join("")}

      </div>

    </div>
  `;
}


// ------------------------------------------------------------
// PARTY SLOT RENDERING
// ------------------------------------------------------------

function renderPartySlot(
  slotIndex
) {
  const pokemon =
    getPartyPokemon(
      slotIndex
    );

  const obtainedPokemon =
    getObtainedPokemon();

  return `
    <div class="party-slot">

      <div class="party-slot-heading">

        <strong>
          Slot ${slotIndex + 1}
        </strong>

        ${
          pokemon
            ? `
              <button
                type="button"
                class="party-clear-button"
                data-party-clear="${slotIndex}"
                title="Clear Slot ${slotIndex + 1}"
                aria-label="Clear Slot ${slotIndex + 1}"
              >
                ×
              </button>
            `
            : ""
        }

      </div>

      <select
        class="party-select"
        data-party-slot="${slotIndex}"
      >

        <option value="">
          Empty
        </option>

        ${obtainedPokemon
          .map(
            optionPokemon => `
              <option
                value="${optionPokemon.id}"
                ${
                  pokemon?.id ===
                  optionPokemon.id
                    ? "selected"
                    : ""
                }
              >
                #${String(
                  optionPokemon.id
                ).padStart(
                  3,
                  "0"
                )}
                ${optionPokemon.name}
              </option>
            `
          )
          .join("")}

      </select>

      ${
        pokemon
          ? `
            <div class="party-pokemon-display">

              <img
                class="party-sprite"
                src="${getSpriteUrl(
                  pokemon.id,
                  state.gameVersion
                )}"
                alt="${pokemon.name}"
              >

              <div class="party-pokemon-info">

                <strong>
                  ${pokemon.name}
                </strong>

                <div class="type-row">

                  ${pokemon.types
                    .map(
                      type => `
                        <span
                          class="type-chip type-${type.toLowerCase()}"
                        >
                          ${type}
                        </span>
                      `
                    )
                    .join("")}

                </div>

              </div>

            </div>

            ${renderPartyEvolutionControls(
              pokemon,
              slotIndex
            )}
          `
          : `
            <div class="party-empty-state">
              No Pokémon selected.
            </div>
          `
      }

    </div>
  `;
}

function renderMain() {
  return `
    <section class="page-grid">

      <article class="panel wide">

        <h2>
          Party
        </h2>

        <p class="muted">
          Party selections are limited to Pokémon
          currently marked Obtained in the Dex.
        </p>

        <div class="party-grid">

          ${state.party
            .map(
              (_, index) =>
                renderPartySlot(
                  index
                )
            )
            .join("")}
        
        </div>

      </article>

      <article class="panel">

        <h2>
          Party Evaluation
        </h2>

        <p class="muted">
          Typing coverage will appear here
          when the Party module is built.
        </p>

      </article>

      <article class="panel">

        <h2>
          Current Journey Objectives
        </h2>
      
        ${renderMainJourneyObjectives()}
      
      </article>

      <article class="panel">

        <h2>
          HMs
        </h2>

        <div class="check-grid">

          ${PROGRESSION_DATA.hms
            .map(
              item =>
                flagControl(
                  "hms",
                  item
                )
            )
            .join("")}

        </div>

      </article>

      <article class="panel">

        <h2>
          Key Items
        </h2>

        <div class="check-grid">

          ${PROGRESSION_DATA.keyItems
            .map(
              item =>
                flagControl(
                  "keyItems",
                  item
                )
            )
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
        ${
          state[group][item.id]
            ? "checked"
            : ""
        }
      >

      <span>
        ${item.name}
      </span>

    </label>
  `;
}


// ============================================================
// JOURNEY STATE
// ============================================================

function getJourneyState(objectiveId) {
  return (
    state.journey[objectiveId] || {
      completed: false,
      choice: null
    }
  );
}


function isJourneyObjectiveComplete(objectiveId) {
  return Boolean(
    state.journey[objectiveId]?.completed
  );
}


// ============================================================
// JOURNEY REQUIREMENTS
// ============================================================

function meetsJourneyRequirement(requirement) {
  switch (requirement.type) {

    case "objective":
      return isJourneyObjectiveComplete(
        requirement.id
      );


    case "storyFlag":
      return Boolean(
        state.storyFlags[
          requirement.id
        ]
      );


    case "badge":
      return Boolean(
        state.badges[
          requirement.id
        ]
      );


    case "badgeCount": {
      const excluded =
        new Set(
          requirement.exclude || []
        );

      const count =
        PROGRESSION_DATA.badges
          .filter(
            badge =>
              !excluded.has(
                badge.id
              )
          )
          .filter(
            badge =>
              state.badges[
                badge.id
              ]
          )
          .length;

      return (
        count >=
        requirement.count
      );
    }


    case "hm":
      return Boolean(
        state.hms[
          requirement.id
        ]
      );


    case "keyItem":
      return Boolean(
        state.keyItems[
          requirement.id
        ]
      );

    case "pokemonObtained":
      return getDexEntry(
        requirement.pokemonId
      ).obtained;

    case "dexCount": {
      const count =
        POKEMON_DATA.filter(
          pokemon =>
            getDexEntry(
              pokemon.id
            ).obtained
        ).length;

      return (
        count >=
        requirement.count
      );
    }


    case "hallOfFame":
      return Boolean(
        state.storyFlags.champion
      );


    case "any":
      return (
        requirement.requirements || []
      ).some(
        meetsJourneyRequirement
      );


    default:
      return true;
  }
}


function isJourneyObjectiveAvailable(objective) {
  if (
    objective.versions &&
    !objective.versions.includes(
      state.gameVersion
    )
  ) {
    return false;
  }

  return (
    objective.requires || []
  ).every(
    meetsJourneyRequirement
  );
}


// ============================================================
// JOURNEY EFFECTS
// ============================================================

function applyJourneyEffect(effect) {
  switch (effect.type) {

    case "badge":
      state.badges[
        effect.id
      ] = true;
      break;


    case "hm":
      state.hms[
        effect.id
      ] = true;
      break;


    case "keyItem":
      state.keyItems[
        effect.id
      ] = true;
      break;


    case "storyFlag":
      state.storyFlags[
        effect.id
      ] = true;
      break;


    case "dexObtained": {
      const entry =
        ensureDexEntry(
          effect.pokemonId
        );

      entry.obtained = true;
      break;
    }
  }
}


function applyJourneyEffects(effects = []) {
  for (
    const effect of effects
  ) {
    applyJourneyEffect(
      effect
    );
  }
}


// ============================================================
// JOURNEY OBJECTIVE UPDATES
// ============================================================

function setJourneyCheck(
  objective,
  completed
) {
  state.journey[
    objective.id
  ] ||= {
    completed: false,
    choice: null
  };

  state.journey[
    objective.id
  ].completed = completed;

  if (completed) {
    applyJourneyEffects(
      objective.effects
    );
  }

  saveState();

  render();
}


function setJourneyChoice(
  objective,
  choiceId
) {
  state.journey[
    objective.id
  ] ||= {
    completed: false,
    choice: null
  };

  if (!choiceId) {
    state.journey[
      objective.id
    ] = {
      completed: false,
      choice: null
    };

    saveState();

    render();

    return;
  }

  const choice =
    objective.choices.find(
      option =>
        option.id ===
        choiceId
    );

  if (!choice) {
    return;
  }

  state.journey[
    objective.id
  ] = {
    completed: true,
    choice: choiceId
  };

  applyJourneyEffects(
    choice.effects
  );

  applyJourneyEffects(
    objective.effects
  );

  saveState();

  render();
}


// ============================================================
// JOURNEY LOOKUPS
// ============================================================

function getAvailableJourneyLocations() {
  return JOURNEY_DATA
    .map((location, index) => {
      const objectives =
        location.objectives.filter(
          objective =>
            isJourneyObjectiveAvailable(
              objective
            )
        );

      const incomplete =
        objectives.filter(
          objective =>
            !isJourneyObjectiveComplete(
              objective.id
            )
        );

      const hasProgression =
        incomplete.some(
          objective =>
            objective.section ===
            "progression"
        );

      return {
        ...location,
        objectives,
        incomplete,

        // Preserve the original Journey-data order
        // inside each priority group.
        journeyOrder: index,

        // Locations with active progression
        // objectives always float to the top.
        hasProgression
      };
    })

    .filter(
      location =>
        location.incomplete.length
    )

    .sort((a, b) => {
      // ------------------------------------------------------------
      // PROGRESSION LOCATIONS FIRST
      // ------------------------------------------------------------

      if (
        a.hasProgression !==
        b.hasProgression
      ) {
        return a.hasProgression
          ? -1
          : 1;
      }


      // ------------------------------------------------------------
      // OTHERWISE PRESERVE JOURNEY DATA ORDER
      // ------------------------------------------------------------

      return (
        a.journeyOrder -
        b.journeyOrder
      );
    });
}


function findJourneyObjective(
  objectiveId
) {
  for (
    const location of
    JOURNEY_DATA
  ) {
    const objective =
      location.objectives.find(
        item =>
          item.id ===
          objectiveId
      );

    if (objective) {
      return objective;
    }
  }

  return null;
}


// ============================================================
// JOURNEY OBJECTIVE DISPLAY
// ============================================================

function renderJourneyObjective(
  objective
) {
  const objectiveState =
    getJourneyState(
      objective.id
    );

  if (
    objective.type ===
    "choice"
  ) {
    return `
      <div class="journey-objective">

        <label
          class="journey-choice-label"
          for="journey-choice-${objective.id}"
        >
          ${objective.label}
        </label>

        <select
          id="journey-choice-${objective.id}"
          data-journey-choice="${objective.id}"
        >

          <option value="">
            Not completed
          </option>

          ${objective.choices
            .map(
              choice => `
                <option
                  value="${choice.id}"
                  ${
                    objectiveState.choice ===
                    choice.id
                      ? "selected"
                      : ""
                  }
                >
                  ${choice.label}
                </option>
              `
            )
            .join("")}

        </select>

        ${
          objective.note
            ? `
              <div class="journey-note">
                ${objective.note}
              </div>
            `
            : ""
        }

      </div>
    `;
  }


  return `
    <label class="journey-objective">

      <span class="journey-check-line">

        <input
          type="checkbox"
          data-journey-check="${objective.id}"
          ${
            objectiveState.completed
              ? "checked"
              : ""
          }
        >

        <span>
          ${objective.label}
        </span>

      </span>

      ${
        objective.note
          ? `
            <span class="journey-note">
              ${objective.note}
            </span>
          `
          : ""
      }

    </label>
  `;
}


// ============================================================
// JOURNEY LOCATION DISPLAY
// ============================================================

function renderJourneyLocation(location) {
  const progression =
    location.objectives.filter(
      objective =>
        objective.section ===
        "progression" &&
        isJourneyObjectiveAvailable(
          objective
        ) &&
        !isJourneyObjectiveComplete(
          objective.id
        )
    );

  const optional =
    location.objectives.filter(
      objective =>
        objective.section ===
        "optional" &&
        isJourneyObjectiveAvailable(
          objective
        ) &&
        !isJourneyObjectiveComplete(
          objective.id
        )
    );

  if (
    !progression.length &&
    !optional.length
  ) {
    return "";
  }


  return `
    <article class="journey-location">

      <h3>
        ${location.name}
      </h3>

      ${
        progression.length
          ? `
            <section class="journey-section">

              <h4>
                Progression
              </h4>

              ${progression
                .map(
                  renderJourneyObjective
                )
                .join("")}

            </section>
          `
          : ""
      }

      ${
        optional.length
          ? `
            <section class="journey-section optional">

              <h4>
                Optional
              </h4>

              ${optional
                .map(
                  renderJourneyObjective
                )
                .join("")}

            </section>
          `
          : ""
      }

    </article>
  `;
}


// ============================================================
// JOURNEY PAGE
// ============================================================

function renderJourney() {
  const locations =
    getAvailableJourneyLocations();

  return `
    <section class="journey-page">

      <div class="panel">

        <h2>
          Journey
        </h2>

        <p class="muted">
          Only progression-significant locations
          and discrete optional actions are shown.
          Completed locations disappear until new
          gated objectives become available.
        </p>

      </div>

      <div class="journey-location-grid">

        ${
          locations.length
            ? locations
                .map(
                  renderJourneyLocation
                )
                .join("")
            : `
              <div class="panel empty-state">

                No currently available
                Journey objectives.

              </div>
            `
        }

      </div>

    </section>
  `;
}


// ============================================================
// MAIN PAGE JOURNEY SUMMARY
// ============================================================

function renderMainJourneyObjectives() {
  const locations =
    getAvailableJourneyLocations();

  if (!locations.length) {
    return `
      <p class="muted">
        No currently available Journey objectives.
      </p>
    `;
  }

  return `
    <div class="main-journey-list">

      ${locations
        .map(location => `
          <div class="main-journey-location">

            <strong>
              ${location.name}
            </strong>

            <ul>

              ${location.incomplete
                .map(
                  objective => `
                    <li>
                      ${
                        objective.section ===
                        "optional"
                          ? "Optional: "
                          : ""
                      }
                      ${objective.label}
                    </li>
                  `
                )
                .join("")}

            </ul>

          </div>
        `)
        .join("")}

    </div>
  `;
}


// ============================================================
// MEW GLITCH GUIDE
// ============================================================

function renderMewGlitchGuide() {
  return `
    <section class="mew-glitch-page">

      <div class="panel mew-glitch-header">

        <div>

          <div class="mew-glitch-kicker">
            #151 · Mew
          </div>

          <h2>
            Mew Glitch Guide
          </h2>

          <p class="muted">
            Standard Route 8 / Route 25 method for
            Pokémon ${VERSION_NAMES[state.gameVersion]}.
          </p>

        </div>

        <button
          type="button"
          data-view="dex"
        >
          ← Back to Dex
        </button>

      </div>


      <div class="mew-glitch-grid">

        <article class="panel">

          <h3>
            Before You Start
          </h3>

          <ul class="mew-glitch-list">

            <li>
              Do not defeat the Gambler on Route 8
              near the Underground Path entrance.
            </li>

            <li>
              Do not defeat the Youngster on Route 25
              whose final Pokémon is Slowpoke.
            </li>

            <li>
              Have a Pokémon that can use Fly.
            </li>

            <li>
              Save before beginning the glitch.
            </li>

          </ul>

        </article>


        <article class="panel">

          <h3>
            Important
          </h3>

          <ul class="mew-glitch-list">

            <li>
              The Route 25 Youngster must walk at least
              one tile toward you to begin the battle.
            </li>

            <li>
              Do not battle any other Pokémon after
              defeating the Youngster and before
              encountering Mew.
            </li>

            <li>
              If the sequence is interrupted, reload
              the save made before starting.
            </li>

          </ul>

        </article>


        <article class="panel wide">

          <h3>
            Procedure
          </h3>

          <ol class="mew-glitch-steps">

            <li>

              <strong>
                Go to Route 8.
              </strong>

              <p>
                Stand directly below the entrance to
                the Underground Path. The Gambler should
                be just offscreen below you.
              </p>

            </li>


            <li>

              <strong>
                Trigger the Gambler and open the Start menu.
              </strong>

              <p>
                Step downward while pressing Start so the
                menu opens before the Gambler can walk up
                and begin the battle.
              </p>

            </li>


            <li>

              <strong>
                Fly to Cerulean City.
              </strong>

              <p>
                Select Fly from the Start menu and leave
                Route 8. If successful, the Gambler's
                exclamation mark appears just before you
                fly away.
              </p>

            </li>


            <li>

              <strong>
                Walk to Route 25.
              </strong>

              <p>
                Your Start, A, and B buttons may not work
                normally at this stage. This is expected.
              </p>

            </li>


            <li>

              <strong>
                Battle the Youngster with Slowpoke.
              </strong>

              <p>
                Approach him so he sees you from at least
                one tile away and walks toward you.
                Defeat him normally.
              </p>

            </li>


            <li>

              <strong>
                Return toward Route 8.
              </strong>

              <p>
                Fly to Lavender Town, then walk west toward
                Route 8. Using Fly also ensures the Start
                menu has been opened before returning.
              </p>

            </li>


            <li>

              <strong>
                Enter Route 8.
              </strong>

              <p>
                The Start menu should open automatically.
                Close it.
              </p>

            </li>


            <li>

              <strong>
                Encounter Mew.
              </strong>

              <p>
                Immediately after closing the menu, a wild
                Level 7 Mew battle begins.
              </p>

            </li>

          </ol>

        </article>


        <article class="panel wide mew-glitch-result">

          <h3>
            Result
          </h3>

          <div class="mew-result-content">

            <img
              class="mew-guide-sprite"
              src="${getSpriteUrl(
                151,
                state.gameVersion
              )}"
              alt="Mew"
            >

            <div>

              <strong>
                Wild Mew · Level 7
              </strong>

              <p class="muted">
                Catch Mew normally during the resulting
                encounter, then mark #151 Obtained in the Dex.
              </p>

            </div>

          </div>

        </article>

      </div>

    </section>
  `;
}


// ============================================================
// DEX STATE
// ============================================================

function ensureDexEntry(pokemonId) {
  if (!state.dex[pokemonId]) {
    state.dex[pokemonId] = {
      obtained: false,
      hallOfFame: false
    };
  }

  if (
    typeof state.dex[pokemonId].obtained
      !== "boolean"
  ) {
    state.dex[pokemonId].obtained =
      false;
  }

  if (
    typeof state.dex[pokemonId].hallOfFame
      !== "boolean"
  ) {
    state.dex[pokemonId].hallOfFame =
      false;
  }

  return state.dex[pokemonId];
}


function getDexEntry(pokemonId) {
  return (
    state.dex[pokemonId] || {
      obtained: false,
      hallOfFame: false
    }
  );
}


function setDexFlag(
  pokemonId,
  flag,
  value
) {
  const entry =
    ensureDexEntry(pokemonId);

  if (flag === "obtained") {
    entry.obtained = value;

    if (!value) {
      entry.hallOfFame = false;
    }
  }

  if (flag === "hallOfFame") {
    entry.hallOfFame = value;

    if (value) {
      entry.obtained = true;
    }
  }

  validateParty();

  saveState();

  render();
}


function setDexFilter(filter) {
  if (!DEX_FILTERS.includes(filter)) {
    return;
  }

  state.dexFilter = filter;

  saveState();

  render();
}


// ============================================================
// SAVE-SPECIFIC POKÉMON AVAILABILITY
// ============================================================

// ------------------------------------------------------------
// EEVEE EVOLUTION CHOICE
// ------------------------------------------------------------

function setEeveeEvolutionChoice(choice) {
  const pokemonByChoice = {
    vaporeon: 134,
    jolteon: 135,
    flareon: 136
  };

  if (
    choice &&
    !Object.prototype.hasOwnProperty.call(
      pokemonByChoice,
      choice
    )
  ) {
    return;
  }


  // ------------------------------------------------------------
  // CLEAR CHOICE
  // ------------------------------------------------------------

  if (!choice) {
    state.exclusiveChoices.eeveeEvolution =
      null;

    saveState();

    render();

    return;
  }


  // ------------------------------------------------------------
  // RECORD SAVE-SPECIFIC EVOLUTION
  // ------------------------------------------------------------

  state.exclusiveChoices.eeveeEvolution =
    choice;


  // ------------------------------------------------------------
  // MARK CHOSEN EVOLUTION OBTAINED
  // ------------------------------------------------------------

  const pokemonId =
    pokemonByChoice[choice];

  const entry =
    ensureDexEntry(
      pokemonId
    );

  entry.obtained = true;


  // ------------------------------------------------------------
  // SAVE AND REFRESH
  // ------------------------------------------------------------

  saveState();

  render();
}

function getSaveLockedPokemonIds() {
  const locked = new Set();


  // ------------------------------------------------------------
  // RED / BLUE STARTER CHOICE
  // ------------------------------------------------------------

  if (
    state.gameVersion === "red" ||
    state.gameVersion === "blue"
  ) {
    const starterChoice =
      state.journey[
        "choose-starter-rb"
      ]?.choice;

    const starterLines = {
      bulbasaur: [1, 2, 3],
      charmander: [4, 5, 6],
      squirtle: [7, 8, 9]
    };

    if (starterChoice) {
      for (
        const [
          choiceId,
          pokemonIds
        ] of Object.entries(
          starterLines
        )
      ) {
        if (
          choiceId !==
          starterChoice
        ) {
          for (
            const pokemonId
            of pokemonIds
          ) {
            locked.add(
              pokemonId
            );
          }
        }
      }
    }
  }


  // ------------------------------------------------------------
  // FIGHTING DOJO CHOICE
  // ------------------------------------------------------------

  const dojoChoice =
    state.journey[
      "fighting-dojo-choice"
    ]?.choice;

  if (
    dojoChoice === "hitmonlee"
  ) {
    locked.add(107);
  }

  if (
    dojoChoice === "hitmonchan"
  ) {
    locked.add(106);
  }


  // ------------------------------------------------------------
  // FOSSIL CHOICE
  // ------------------------------------------------------------

  const fossilChoice =
    state.journey[
      "choose-fossil"
    ]?.choice;

  if (
    fossilChoice === "helix"
  ) {
    locked.add(140);
    locked.add(141);
  }

  if (
    fossilChoice === "dome"
  ) {
    locked.add(138);
    locked.add(139);
  }


  // ------------------------------------------------------------
  // EEVEE EVOLUTION CHOICE
  // ------------------------------------------------------------

  const eeveeChoice =
    state.exclusiveChoices
      .eeveeEvolution;

  if (
    eeveeChoice === "vaporeon"
  ) {
    locked.add(135);
    locked.add(136);
  }

  if (
    eeveeChoice === "jolteon"
  ) {
    locked.add(134);
    locked.add(136);
  }

  if (
    eeveeChoice === "flareon"
  ) {
    locked.add(134);
    locked.add(135);
  }


  return locked;
}


function isPokemonSaveLocked(
  pokemonId
) {
  return getSaveLockedPokemonIds()
    .has(pokemonId);
}


function isPokemonNativelyAvailable(
  pokemonId
) {
  return (
    isPokemonAvailableInVersion(
      pokemonId,
      state.gameVersion
    ) &&
    !isPokemonSaveLocked(
      pokemonId
    )
  );
}


// ============================================================
// DEX FILTERING
// ============================================================

function getFilteredPokemon() {
  return POKEMON_DATA.filter(
    pokemon => {
      const entry =
        getDexEntry(pokemon.id);

      switch (state.dexFilter) {
        case "obtained":
          return entry.obtained;

        case "not-obtained":
          return !entry.obtained;

        case "hall-of-fame":
          return entry.hallOfFame;

        case "unobtainable":
          return !isPokemonNativelyAvailable(
            pokemon.id
          );

        case "all":
        default:
          return true;
      }
    }
  );
}


// ============================================================
// DEX SUMMARY
// ============================================================

function renderDexSummary() {
  const obtained =
    POKEMON_DATA.filter(
      pokemon =>
        getDexEntry(
          pokemon.id
        ).obtained
    ).length;

  const hallOfFame =
    POKEMON_DATA.filter(
      pokemon =>
        getDexEntry(
          pokemon.id
        ).hallOfFame
    ).length;

  const unavailable =
    POKEMON_DATA.filter(
      pokemon =>
        !isPokemonNativelyAvailable(
          pokemon.id
        )
    ).length;

  return `
    <div class="dex-summary">

      <div class="dex-stat">
        <span class="dex-stat-number">
          ${obtained}
        </span>
        <span class="dex-stat-label">
          Obtained
        </span>
      </div>

      <div class="dex-stat">
        <span class="dex-stat-number">
          ${151 - obtained}
        </span>
        <span class="dex-stat-label">
          Remaining
        </span>
      </div>

      <div class="dex-stat">
        <span class="dex-stat-number">
          ${hallOfFame}
        </span>
        <span class="dex-stat-label">
          Hall of Fame
        </span>
      </div>

      <div class="dex-stat">
        <span class="dex-stat-number">
          ${unavailable}
        </span>
        <span class="dex-stat-label">
          Unavailable in ${VERSION_NAMES[state.gameVersion]}
        </span>
      </div>

    </div>
  `;
}


// ============================================================
// DEX FILTER BUTTONS
// ============================================================

function renderDexFilters() {
  const filters = [
    ["all", "All"],
    ["obtained", "Obtained"],
    ["not-obtained", "Not Obtained"],
    ["hall-of-fame", "Hall of Fame"],
    ["unobtainable", "Unobtainable"]
  ];

  return `
    <div class="filter-row">

      ${filters
        .map(
          ([value, label]) => `
            <button
              class="filter-button ${
                state.dexFilter === value
                  ? "active"
                  : ""
              }"
              data-dex-filter="${value}"
            >
              ${label}
            </button>
          `
        )
        .join("")}

    </div>
  `;
}


// ============================================================
// DEX CARD
// ============================================================

function renderDexCard(pokemon) {
  const entry =
    getDexEntry(pokemon.id);

  const availableVersions =
    getAvailableVersions(
      pokemon.id
    );

  const availableInVersion =
    availableVersions.includes(
      state.gameVersion
    );
  
  const saveLocked =
    isPokemonSaveLocked(
      pokemon.id
    );
  
  const availableHere =
    availableInVersion &&
    !saveLocked;

  const acquisitions =
    getSpecialAcquisitions(
      pokemon.id,
      state.gameVersion
    );

  const evolutionText =
    formatEvolutionText(
      pokemon
    );

  const evolvesFrom =
    EVOLVES_FROM[pokemon.id];

  return `
    <article
      class="dex-card ${
        entry.obtained
          ? "dex-obtained"
          : ""
      } ${
        !availableHere
          ? "dex-unavailable"
          : ""
      }"
    >

      <div class="dex-card-header">

        <div class="dex-number">
          #${String(
            pokemon.id
          ).padStart(3, "0")}
        </div>

        <img
          class="dex-sprite"
          src="${getSpriteUrl(
            pokemon.id,
            state.gameVersion
          )}"
          alt="${pokemon.name}"
          loading="lazy"
        >

        <div class="dex-name-block">

          <h3>
            ${pokemon.name}
          </h3>

          <div class="type-row">

            ${pokemon.types
              .map(
                type => `
                  <span
                    class="type-chip type-${type.toLowerCase()}"
                  >
                    ${type}
                  </span>
                `
              )
              .join("")}

          </div>

        </div>

      </div>

      ${renderVersionAvailability(
        pokemon,
        availableVersions,
        availableInVersion,
        saveLocked
      )}

      ${
        pokemon.id === 151
          ? `
            <div class="mew-glitch-link">
      
              <button
                type="button"
                class="mew-glitch-button"
                data-view="mew-glitch"
              >
                View Mew Glitch Guide
              </button>
      
            </div>
          `
          : ""
      }

      <div class="dex-checkbox-row">

        <label>

          <input
            type="checkbox"
            data-dex-id="${pokemon.id}"
            data-dex-flag="obtained"
            ${
              entry.obtained
                ? "checked"
                : ""
            }
          >

          Obtained

        </label>

        <label>

          <input
            type="checkbox"
            data-dex-id="${pokemon.id}"
            data-dex-flag="hallOfFame"
            ${
              entry.hallOfFame
                ? "checked"
                : ""
            }
          >

          Hall of Fame

        </label>

      </div>

      <div class="dex-detail-section">

        <h4>
          Evolution
        </h4>
      
        ${renderEvolutionInfo(
          pokemon,
          evolutionText,
          evolvesFrom
        )}
      
        ${
          pokemon.id === 133
            ? renderEeveeEvolutionChoice()
            : ""
        }
      
      </div>

      ${renderSpecialAcquisitionSection(
        acquisitions,
        availableHere
      )}

      ${
        availableInVersion
          ? `
            <div
              class="dex-detail-section wild-area-section"
              id="wild-area-section-${pokemon.id}"
            >
      
              <h4>
                Wild Areas
              </h4>
      
              <div
                class="wild-area-list"
                id="wild-areas-${pokemon.id}"
                data-pokemon-id="${pokemon.id}"
              >
                <span class="muted">
                  Loading wild areas…
                </span>
              </div>
      
            </div>
          `
          : ""
      }

    </article>
  `;
}


// ============================================================
// VERSION / SAVE AVAILABILITY DISPLAY
// ============================================================

function renderVersionAvailability(
  pokemon,
  versions,
  availableInVersion,
  saveLocked
) {
  if (pokemon.id === 151) {
    return `
      <div class="availability-box unavailable">

        Not normally obtainable
        in Red, Blue, or Yellow.

      </div>
    `;
  }


  if (
    availableInVersion &&
    saveLocked
  ) {
    const obtained =
      getDexEntry(
        pokemon.id
      ).obtained;
  
    if (obtained) {
      return "";
    }
  
    return `
      <div class="availability-box unavailable">
  
        Unavailable in this save
        due to an earlier choice.
  
        <br>
  
        Obtainable by trade
        from another save.
  
      </div>
    `;
  }


  if (availableInVersion) {
    return "";
  }


  const otherVersions =
    versions
      .map(
        version =>
          VERSION_NAMES[version]
      )
      .join(" / ");


  return `
    <div class="availability-box unavailable">

      Unavailable in Pokémon
      ${VERSION_NAMES[state.gameVersion]}

      ${
        otherVersions
          ? `<br>Available in: ${otherVersions}`
          : ""
      }

    </div>
  `;
}


// ============================================================
// EVOLUTION DISPLAY
// ============================================================

function renderEvolutionInfo(
  pokemon,
  evolutionText,
  evolvesFrom
) {
  const lines = [];

  if (evolvesFrom) {
    const source =
      POKEMON_BY_ID[
        evolvesFrom.source
      ];

    lines.push(`
      <div>
        <strong>
          Evolves from:
        </strong>
        ${source.name}
        — ${evolvesFrom.condition}
      </div>
    `);
  }

  if (evolutionText) {
    lines.push(`
      <div>
        <strong>
          Evolves to:
        </strong>
        ${evolutionText}
      </div>
    `);
  }

  if (!lines.length) {
    return `
      <span class="muted">
        None
      </span>
    `;
  }

  return lines.join("");
}


// ============================================================
// EEVEE EVOLUTION CHOICE DISPLAY
// ============================================================

function renderEeveeEvolutionChoice() {
  const eeveeObtained =
    getDexEntry(133).obtained;

  const selected =
    state.exclusiveChoices
      .eeveeEvolution;

  if (!eeveeObtained) {
    return `
      <div class="eevee-evolution-choice">

        <span class="muted">
          Mark Eevee as Obtained before
          selecting its evolution.
        </span>

      </div>
    `;
  }

  return `
    <div class="eevee-evolution-choice">

      <label
        for="eevee-evolution-select"
      >
        <strong>
          Evolution used in this save
        </strong>
      </label>

      <select
        id="eevee-evolution-select"
        data-eevee-evolution
      >

        <option value="">
          Not evolved yet
        </option>

        <option
          value="vaporeon"
          ${
            selected === "vaporeon"
              ? "selected"
              : ""
          }
        >
          Vaporeon — Water Stone
        </option>

        <option
          value="jolteon"
          ${
            selected === "jolteon"
              ? "selected"
              : ""
          }
        >
          Jolteon — Thunder Stone
        </option>

        <option
          value="flareon"
          ${
            selected === "flareon"
              ? "selected"
              : ""
          }
        >
          Flareon — Fire Stone
        </option>

      </select>

      ${
        selected
          ? `
            <div class="journey-note">
              The other two Eeveelutions are now
              unavailable natively in this save
              and require trading from another save.
            </div>
          `
          : ""
      }

    </div>
  `;
}


// ============================================================
// SPECIAL ACQUISITION DISPLAY
// ============================================================

function renderSpecialAcquisitionSection(
  acquisitions,
  availableHere
) {
  if (!availableHere) {
    return "";
  }

  if (!acquisitions.length) {
    return "";
  }

  return `
    <div class="dex-detail-section">

      <h4>
        Special Acquisition
      </h4>

      <ul class="acquisition-list">

        ${acquisitions
          .map(
            acquisition => `
              <li>
                <strong>
                  ${acquisition.location}
                </strong>
                —
                ${acquisition.method}
              </li>
            `
          )
          .join("")}

      </ul>

    </div>
  `;
}


// ============================================================
// DEX PAGE
// ============================================================

function renderDex() {
  const filteredPokemon =
    getFilteredPokemon();

  return `
    <section class="dex-page">

      <div class="panel">

        <div class="section-heading">

          <div>

            <h2>
              Pokédex
            </h2>

            <p class="muted">
              Pokémon ${VERSION_NAMES[state.gameVersion]}
              · Generation I
            </p>

          </div>

        </div>

        ${renderDexSummary()}

        ${renderDexFilters()}

      </div>

      <div class="dex-grid">

        ${
          filteredPokemon.length
            ? filteredPokemon
                .map(
                  pokemon =>
                    renderDexCard(
                      pokemon
                    )
                )
                .join("")
            : `
              <div class="panel empty-state">
                No Pokémon match this filter.
              </div>
            `
        }

      </div>

    </section>
  `;
}


// ============================================================
// ENCOUNTER CACHE
// ============================================================

function loadEncounterCache() {
  try {
    const raw =
      localStorage.getItem(
        ENCOUNTER_CACHE_KEY
      );

    return raw
      ? JSON.parse(raw)
      : {};
  } catch {
    return {};
  }
}


function saveEncounterCache(cache) {
  try {
    localStorage.setItem(
      ENCOUNTER_CACHE_KEY,
      JSON.stringify(cache)
    );
  } catch (error) {
    console.warn(
      "Encounter cache could not be saved:",
      error
    );
  }
}


// ============================================================
// WILD ENCOUNTER LOOKUP
// ============================================================

async function getWildLocations(
  pokemonId,
  version
) {
  // ------------------------------------------------------------
  // SCRIPTED ENCOUNTER OVERRIDES
  // ------------------------------------------------------------
  
  // Pokémon Yellow's Route 1 Pikachu is encountered and caught
  // by Professor Oak, not by the player. It is later given to
  // the player as their starter, so it should not appear as a
  // player-accessible wild location.
  if (
    pokemonId === 25 &&
    version === "yellow"
  ) {
    return [];
  }
  const cache =
    loadEncounterCache();

  cache[version] ||= {};

  if (
    Array.isArray(
      cache[version][pokemonId]
    )
  ) {
    return cache[version][pokemonId];
  }

  const url =
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Encounter lookup failed: ${response.status}`
    );
  }

  const encounterData =
    await response.json();

  const locations =
    encounterData
      .filter(encounter =>
        encounter.version_details.some(
          detail =>
            detail.version.name ===
            version
        )
      )
      .map(encounter =>
        formatLocationAreaName(
          encounter.location_area.name
        )
      );

  const uniqueLocations =
    [...new Set(locations)]
      .sort(
        (a, b) =>
          a.localeCompare(
            b,
            undefined,
            {
              numeric: true
            }
          )
      );

  cache[version][pokemonId] =
    uniqueLocations;

  saveEncounterCache(cache);

  return uniqueLocations;
}


// ============================================================
// LOCATION NAME FORMATTING
// ============================================================

function formatLocationAreaName(slug) {
  let value = slug;

  value = value.replace(
    /^kanto-/,
    ""
  );

  value = value.replace(
    /-area$/,
    ""
  );

  value = value.replace(
    /-towards-.+$/,
    ""
  );

  value = value.replace(
    /-from-.+$/,
    ""
  );

  value = value
    .split("-")
    .map(word =>
      capitalize(word)
    )
    .join(" ");

  value = value.replace(
    /\bPokemon\b/g,
    "Pokémon"
  );

  value = value.replace(
    /\bB([0-9]+)f\b/gi,
    "B$1F"
  );

  value = value.replace(
    /\b([0-9]+)f\b/gi,
    "$1F"
  );

  return value;
}


// ============================================================
// WILD AREA DISPLAY
// ============================================================

function updateWildAreaElement(
  pokemonId,
  locations
) {
  const element =
    document.getElementById(
      `wild-areas-${pokemonId}`
    );

  if (!element) {
    return;
  }

  if (!locations.length) {
    const section =
      document.getElementById(
        `wild-area-section-${pokemonId}`
      );

    if (section) {
      section.remove();
    }

    return;
  }


  // ------------------------------------------------------------
  // SHORT WILD-AREA LIST
  // ------------------------------------------------------------

  const visibleLocations =
    locations.slice(0, 6);

  const hiddenLocations =
    locations.slice(6);


  element.innerHTML = `
    <ul class="wild-location-list">

      ${visibleLocations
        .map(
          location => `
            <li>
              ${location}
            </li>
          `
        )
        .join("")}

    </ul>

    ${
      hiddenLocations.length
        ? `
          <details class="wild-location-more">

            <summary>
              Show ${hiddenLocations.length} more
            </summary>

            <ul class="wild-location-list wild-location-list-extra">

              ${hiddenLocations
                .map(
                  location => `
                    <li>
                      ${location}
                    </li>
                  `
                )
                .join("")}

            </ul>

          </details>
        `
        : ""
    }
  `;
}

function updateWildAreaError(
  pokemonId
) {
  const element =
    document.getElementById(
      `wild-areas-${pokemonId}`
    );

  if (!element) {
    return;
  }

  element.innerHTML = `
    <span class="wild-error">
      Wild-area data could not be loaded.
    </span>
  `;
}


// ============================================================
// WILD AREA HYDRATION
// ============================================================

async function hydrateDexWildLocations() {
  if (
    !state ||
    state.activeView !== "dex"
  ) {
    return;
  }

  const pokemonIds =
    [...document.querySelectorAll(
      "[data-pokemon-id]"
    )]
      .map(
        element =>
          Number(
            element.dataset.pokemonId
          )
      )
      .filter(
        pokemonId =>
          isPokemonAvailableInVersion(
            pokemonId,
            state.gameVersion
          )
      );

  const queue =
    [...pokemonIds];

  const workerCount =
    Math.min(
      8,
      queue.length
    );

  async function worker() {
    while (queue.length) {
      const pokemonId =
        queue.shift();

      try {
        const locations =
          await getWildLocations(
            pokemonId,
            state.gameVersion
          );

        updateWildAreaElement(
          pokemonId,
          locations
        );
      } catch (error) {
        console.error(
          `Wild encounter lookup failed for #${pokemonId}:`,
          error
        );

        updateWildAreaError(
          pokemonId
        );
      }
    }
  }

  await Promise.all(
    Array.from(
      {
        length: workerCount
      },
      () => worker()
    )
  );
}


// ============================================================
// APP RENDERING
// ============================================================

function renderApp() {
  let pageContent =
    renderMain();

  if (
    state.activeView ===
    "journey"
  ) {
    pageContent =
      renderJourney();
  }

  if (
    state.activeView ===
    "dex"
  ) {
    pageContent =
      renderDex();
  }

  if (
    state.activeView ===
    "mew-glitch"
  ) {
    pageContent =
      renderMewGlitchGuide();
  }

  return `
    <div class="app-shell theme-${state.gameVersion}">

      ${renderHeader()}

      <main class="content">
        ${pageContent}
      </main>

    </div>
  `;
}


function render() {
  const root =
    document.getElementById(
      "app"
    );

  root.innerHTML =
    state
      ? renderApp()
      : renderSplash();

  bindEvents();

  if (
    state &&
    state.activeView === "dex"
  ) {
    hydrateDexWildLocations();
  }
}


// ============================================================
// EVENT BINDING
// ============================================================

function bindEvents() {
  const versionSelect =
    document.getElementById(
      "version-select"
    );

  if (versionSelect) {
    versionSelect.addEventListener(
      "change",
      event => {
        if (
          event.target.value
        ) {
          setVersion(
            event.target.value
          );
        }
      }
    );
  }


  document
    .querySelectorAll(
      "[data-view]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          setView(
            button.dataset.view
          );
        }
      );
    });


  document
    .querySelectorAll(
      "[data-badge]"
    )
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
    .querySelectorAll(
      "[data-flag-group]"
    )
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


    // ============================================================
    // PARTY EVENTS
    // ============================================================
  
    document
      .querySelectorAll(
        "[data-party-slot]"
      )
      .forEach(select => {
        select.addEventListener(
          "change",
          () => {
            const slotIndex =
              Number(
                select.dataset.partySlot
              );
  
            const pokemonId =
              select.value
                ? Number(
                    select.value
                  )
                : null;
  
            setPartyPokemon(
              slotIndex,
              pokemonId
            );
          }
        );
      });
  
  
    document
      .querySelectorAll(
        "[data-party-clear]"
      )
      .forEach(button => {
        button.addEventListener(
          "click",
          () => {
            setPartyPokemon(
              Number(
                button.dataset.partyClear
              ),
              null
            );
          }
        );
      });

      document
        .querySelectorAll(
          "[data-party-evolve-slot][data-party-evolve-target]"
        )
        .forEach(button => {
          button.addEventListener(
            "click",
            () => {
              const slotIndex =
                Number(
                  button.dataset
                    .partyEvolveSlot
                );
    
              const targetPokemonId =
                Number(
                  button.dataset
                    .partyEvolveTarget
                );
    
              evolvePartyPokemon(
                slotIndex,
                targetPokemonId
              );
            }
          );
        });


    // ============================================================
    // JOURNEY EVENTS
    // ============================================================
  
    document
      .querySelectorAll(
        "[data-journey-check]"
      )
      .forEach(input => {
        input.addEventListener(
          "change",
          () => {
            const objective =
              findJourneyObjective(
                input.dataset.journeyCheck
              );
  
            if (!objective) {
              return;
            }
  
            setJourneyCheck(
              objective,
              input.checked
            );
          }
        );
      });
  
  
    document
      .querySelectorAll(
        "[data-journey-choice]"
      )
      .forEach(select => {
        select.addEventListener(
          "change",
          () => {
            const objective =
              findJourneyObjective(
                select.dataset.journeyChoice
              );
  
            if (!objective) {
              return;
            }
  
            setJourneyChoice(
              objective,
              select.value
            );
          }
        );
      });


      // ============================================================
      // EEVEE EVOLUTION EVENT
      // ============================================================
    
      const eeveeEvolutionSelect =
        document.querySelector(
          "[data-eevee-evolution]"
        );
    
      if (eeveeEvolutionSelect) {
        eeveeEvolutionSelect.addEventListener(
          "change",
          () => {
            const choice =
              eeveeEvolutionSelect.value;
    
            setEeveeEvolutionChoice(
              choice
            );
          }
        );
      }


  document
    .querySelectorAll(
      "[data-dex-filter]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          setDexFilter(
            button.dataset.dexFilter
          );
        }
      );
    });


  document
    .querySelectorAll(
      "[data-dex-id][data-dex-flag]"
    )
    .forEach(input => {
      input.addEventListener(
        "change",
        () => {
          setDexFlag(
            Number(
              input.dataset.dexId
            ),
            input.dataset.dexFlag,
            input.checked
          );
        }
      );
    });


  document
    .getElementById(
      "export-save"
    )
    ?.addEventListener(
      "click",
      exportSave
    );


  document
    .getElementById(
      "reset-save"
    )
    ?.addEventListener(
      "click",
      resetSave
    );


  document
    .getElementById(
      "import-save"
    )
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


// ============================================================
// GENERAL HELPERS
// ============================================================

function capitalize(value) {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}


// ============================================================
// START APP
// ============================================================

render();
