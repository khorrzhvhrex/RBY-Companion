// ============================================================
// GENERATION I MOVE DATA
// ============================================================

const MOVESET_CACHE_KEY =
  "rby-companion-moveset-cache-v1";

const MOVE_DETAIL_CACHE_KEY =
  "rby-companion-move-detail-cache-v1";


const MOVE_VERSION_GROUPS = {
  red: "red-blue",
  blue: "red-blue",
  yellow: "yellow"
};


// ------------------------------------------------------------
// GENERATION I MOVE TYPE OVERRIDES
// ------------------------------------------------------------

// These four moves changed type beginning in Generation II.
// They are all Normal-type in Red / Blue / Yellow.

const GEN1_MOVE_TYPE_OVERRIDES = {
  2: "Normal",   // Karate Chop
  16: "Normal",  // Gust
  28: "Normal",  // Sand Attack
  44: "Normal"   // Bite
};


// ------------------------------------------------------------
// GENERATION I PHYSICAL / SPECIAL SPLIT
// ------------------------------------------------------------

const GEN1_PHYSICAL_MOVE_TYPES =
  new Set([
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost"
  ]);


const GEN1_SPECIAL_MOVE_TYPES =
  new Set([
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon"
  ]);


// ============================================================
// CACHE
// ============================================================

function loadMoveCache(key) {
  try {
    const raw =
      localStorage.getItem(
        key
      );

    return raw
      ? JSON.parse(raw)
      : {};
  } catch {
    return {};
  }
}


function saveMoveCache(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.warn(
      "Move cache could not be saved:",
      error
    );
  }
}


const MOVESET_CACHE =
  loadMoveCache(
    MOVESET_CACHE_KEY
  );


const MOVE_DETAIL_CACHE =
  loadMoveCache(
    MOVE_DETAIL_CACHE_KEY
  );


const MOVES_DATA = {
  ...MOVE_DETAIL_CACHE
};


const MOVE_DETAIL_PROMISES = {};


// ============================================================
// MOVE HELPERS
// ============================================================

function getMoveIdFromUrl(url) {
  const match =
    url.match(
      /\/move\/(\d+)\/?$/
    );

  return match
    ? Number(match[1])
    : null;
}


function formatMoveIdentifier(
  identifier
) {
  return identifier
    .split("-")
    .map(
      word =>
        word.charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}


function getEnglishMoveName(
  moveData
) {
  const englishName =
    moveData.names?.find(
      entry =>
        entry.language.name ===
        "en"
    )?.name;

  return (
    englishName ||
    formatMoveIdentifier(
      moveData.name
    )
  );
}


// ------------------------------------------------------------
// EVOLUTION-LINE MOVE SOURCES
// ------------------------------------------------------------

function getMoveSourcePokemonIds(
  pokemonId
) {
  const ids = [
    pokemonId
  ];

  let currentId =
    pokemonId;

  while (
    EVOLVES_FROM[
      currentId
    ]
  ) {
    const sourceId =
      EVOLVES_FROM[
        currentId
      ].source;

    ids.push(
      sourceId
    );

    currentId =
      sourceId;
  }

  return ids;
}


// ============================================================
// MOVE DETAIL LOOKUP
// ============================================================

function getCachedMoveDetail(
  moveId
) {
  return (
    MOVES_DATA[
      moveId
    ] ||
    null
  );
}


async function getMoveDetail(
  moveId
) {
  const cached =
    getCachedMoveDetail(
      moveId
    );

  if (cached) {
    return cached;
  }


  if (
    MOVE_DETAIL_PROMISES[
      moveId
    ]
  ) {
    return (
      MOVE_DETAIL_PROMISES[
        moveId
      ]
    );
  }


  MOVE_DETAIL_PROMISES[
    moveId
  ] =
    fetch(
      `https://pokeapi.co/api/v2/move/${moveId}/`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Move lookup failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then(moveData => {
        const currentType =
          moveData.type.name
            .charAt(0)
            .toUpperCase() +
          moveData.type.name.slice(1);


        const type =
          GEN1_MOVE_TYPE_OVERRIDES[
            moveId
          ] ||
          currentType;


        let damageClass =
          "Status";

        if (
          moveData.damage_class
            .name !==
          "status"
        ) {
          damageClass =
            GEN1_PHYSICAL_MOVE_TYPES
              .has(type)
              ? "Physical"
              : "Special";
        }


        const detail = {
          id: moveId,

          identifier:
            moveData.name,

          name:
            getEnglishMoveName(
              moveData
            ),

          type,

          damageClass
        };


        MOVES_DATA[
          moveId
        ] = detail;

        MOVE_DETAIL_CACHE[
          moveId
        ] = detail;


        saveMoveCache(
          MOVE_DETAIL_CACHE_KEY,
          MOVE_DETAIL_CACHE
        );


        return detail;
      })
      .finally(() => {
        delete (
          MOVE_DETAIL_PROMISES[
            moveId
          ]
        );
      });


  return (
    MOVE_DETAIL_PROMISES[
      moveId
    ]
  );
}


// ============================================================
// VERSION-SPECIFIC LEARNSET LOOKUP
// ============================================================

async function getPokemonVersionMoves(
  pokemonId,
  version
) {
  const versionGroup =
    MOVE_VERSION_GROUPS[
      version
    ];

  const cacheKey =
    `${versionGroup}:${pokemonId}`;


  if (
    Array.isArray(
      MOVESET_CACHE[
        cacheKey
      ]
    )
  ) {
    return (
      MOVESET_CACHE[
        cacheKey
      ]
    );
  }


  const response =
    await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    );


  if (!response.ok) {
    throw new Error(
      `Pokémon move lookup failed: ${response.status}`
    );
  }


  const pokemonData =
    await response.json();


  const moves = [];


  for (
    const moveEntry
    of pokemonData.moves
  ) {
    const matchingDetails =
      moveEntry
        .version_group_details
        .filter(
          detail =>
            detail.version_group
              .name ===
            versionGroup
        );


    if (!matchingDetails.length) {
      continue;
    }


    const moveId =
      getMoveIdFromUrl(
        moveEntry.move.url
      );


    if (!moveId) {
      continue;
    }


    moves.push({
      id: moveId,

      identifier:
        moveEntry.move.name,

      learnMethods:
        matchingDetails.map(
          detail => ({
            method:
              detail
                .move_learn_method
                .name,

            level:
              detail
                .level_learned_at
          })
        )
    });
  }


  MOVESET_CACHE[
    cacheKey
  ] = moves;


  saveMoveCache(
    MOVESET_CACHE_KEY,
    MOVESET_CACHE
  );


  return moves;
}


// ============================================================
// COMPLETE LEGAL MOVESET
// ============================================================

async function getLegalMovesForPokemon(
  pokemonId,
  version
) {
  const sourceIds =
    getMoveSourcePokemonIds(
      pokemonId
    );


  const sourceMoveLists =
    await Promise.all(
      sourceIds.map(
        sourceId =>
          getPokemonVersionMoves(
            sourceId,
            version
          )
      )
    );


  const moveMap =
    new Map();


  for (
    let sourceIndex = 0;
    sourceIndex <
    sourceMoveLists.length;
    sourceIndex++
  ) {
    const sourceId =
      sourceIds[
        sourceIndex
      ];

    const moveList =
      sourceMoveLists[
        sourceIndex
      ];


    for (
      const move
      of moveList
    ) {
      if (
        !moveMap.has(
          move.id
        )
      ) {
        moveMap.set(
          move.id,
          {
            id: move.id,

            identifier:
              move.identifier,

            learnMethods: []
          }
        );
      }


      const existing =
        moveMap.get(
          move.id
        );


      for (
        const learnMethod
        of move.learnMethods
      ) {
        existing
          .learnMethods
          .push({
            ...learnMethod,
            sourcePokemonId:
              sourceId
          });
      }
    }
  }


  const legalMoves =
    await Promise.all(
      [...moveMap.values()]
        .map(
          async move => {
            const detail =
              await getMoveDetail(
                move.id
              );

            return {
              ...move,
              ...detail
            };
          }
        )
    );


  legalMoves.sort(
    (a, b) =>
      a.name.localeCompare(
        b.name
      )
  );


  return legalMoves;
}


// ============================================================
// MOVE DISPLAY HELPERS
// ============================================================

function formatMoveLearnMethod(
  move
) {
  const labels =
    new Set();


  for (
    const detail
    of move.learnMethods
  ) {
    switch (
      detail.method
    ) {
      case "level-up":
        if (
          detail.level > 0
        ) {
          labels.add(
            `Lv ${detail.level}`
          );
        } else {
          labels.add(
            "Level-up"
          );
        }

        break;


      case "machine":
        labels.add(
          "TM/HM"
        );

        break;


      case "tutor":
        labels.add(
          "Tutor"
        );

        break;


      case "stadium-surfing-pikachu":
        labels.add(
          "Stadium"
        );

        break;


      default:
        labels.add(
          formatMoveIdentifier(
            detail.method
          )
        );
    }
  }


  return (
    [...labels]
      .slice(0, 3)
      .join(" / ")
  );
}
