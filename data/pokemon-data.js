// ============================================================
// POKÉMON CORE DATA
// ============================================================

const POKEMON_DATA = [
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"], evolvesTo: [{ target: 2, condition: "LV 16" }] },
  { id: 2, name: "Ivysaur", types: ["Grass", "Poison"], evolvesTo: [{ target: 3, condition: "LV 32" }] },
  { id: 3, name: "Venusaur", types: ["Grass", "Poison"], evolvesTo: [] },

  { id: 4, name: "Charmander", types: ["Fire"], evolvesTo: [{ target: 5, condition: "LV 16" }] },
  { id: 5, name: "Charmeleon", types: ["Fire"], evolvesTo: [{ target: 6, condition: "LV 36" }] },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"], evolvesTo: [] },

  { id: 7, name: "Squirtle", types: ["Water"], evolvesTo: [{ target: 8, condition: "LV 16" }] },
  { id: 8, name: "Wartortle", types: ["Water"], evolvesTo: [{ target: 9, condition: "LV 36" }] },
  { id: 9, name: "Blastoise", types: ["Water"], evolvesTo: [] },

  { id: 10, name: "Caterpie", types: ["Bug"], evolvesTo: [{ target: 11, condition: "LV 7" }] },
  { id: 11, name: "Metapod", types: ["Bug"], evolvesTo: [{ target: 12, condition: "LV 10" }] },
  { id: 12, name: "Butterfree", types: ["Bug", "Flying"], evolvesTo: [] },

  { id: 13, name: "Weedle", types: ["Bug", "Poison"], evolvesTo: [{ target: 14, condition: "LV 7" }] },
  { id: 14, name: "Kakuna", types: ["Bug", "Poison"], evolvesTo: [{ target: 15, condition: "LV 10" }] },
  { id: 15, name: "Beedrill", types: ["Bug", "Poison"], evolvesTo: [] },

  { id: 16, name: "Pidgey", types: ["Normal", "Flying"], evolvesTo: [{ target: 17, condition: "LV 18" }] },
  { id: 17, name: "Pidgeotto", types: ["Normal", "Flying"], evolvesTo: [{ target: 18, condition: "LV 36" }] },
  { id: 18, name: "Pidgeot", types: ["Normal", "Flying"], evolvesTo: [] },

  { id: 19, name: "Rattata", types: ["Normal"], evolvesTo: [{ target: 20, condition: "LV 20" }] },
  { id: 20, name: "Raticate", types: ["Normal"], evolvesTo: [] },

  { id: 21, name: "Spearow", types: ["Normal", "Flying"], evolvesTo: [{ target: 22, condition: "LV 20" }] },
  { id: 22, name: "Fearow", types: ["Normal", "Flying"], evolvesTo: [] },

  { id: 23, name: "Ekans", types: ["Poison"], evolvesTo: [{ target: 24, condition: "LV 22" }] },
  { id: 24, name: "Arbok", types: ["Poison"], evolvesTo: [] },

  { id: 25, name: "Pikachu", types: ["Electric"], evolvesTo: [{ target: 26, condition: "Thndr Stone" }] },
  { id: 26, name: "Raichu", types: ["Electric"], evolvesTo: [] },

  { id: 27, name: "Sandshrew", types: ["Ground"], evolvesTo: [{ target: 28, condition: "LV 22" }] },
  { id: 28, name: "Sandslash", types: ["Ground"], evolvesTo: [] },

  { id: 29, name: "Nidoran♀", types: ["Poison"], evolvesTo: [{ target: 30, condition: "LV 16" }] },
  { id: 30, name: "Nidorina", types: ["Poison"], evolvesTo: [{ target: 31, condition: "Mn Stone" }] },
  { id: 31, name: "Nidoqueen", types: ["Poison", "Ground"], evolvesTo: [] },

  { id: 32, name: "Nidoran♂", types: ["Poison"], evolvesTo: [{ target: 33, condition: "LV 16" }] },
  { id: 33, name: "Nidorino", types: ["Poison"], evolvesTo: [{ target: 34, condition: "Mn Stone" }] },
  { id: 34, name: "Nidoking", types: ["Poison", "Ground"], evolvesTo: [] },

  { id: 35, name: "Clefairy", types: ["Normal"], evolvesTo: [{ target: 36, condition: "Mn Stone" }] },
  { id: 36, name: "Clefable", types: ["Normal"], evolvesTo: [] },

  { id: 37, name: "Vulpix", types: ["Fire"], evolvesTo: [{ target: 38, condition: "Fr Stone" }] },
  { id: 38, name: "Ninetales", types: ["Fire"], evolvesTo: [] },

  { id: 39, name: "Jigglypuff", types: ["Normal"], evolvesTo: [{ target: 40, condition: "Mn Stone" }] },
  { id: 40, name: "Wigglytuff", types: ["Normal"], evolvesTo: [] },

  { id: 41, name: "Zubat", types: ["Poison", "Flying"], evolvesTo: [{ target: 42, condition: "LV 22" }] },
  { id: 42, name: "Golbat", types: ["Poison", "Flying"], evolvesTo: [] },

  { id: 43, name: "Oddish", types: ["Grass", "Poison"], evolvesTo: [{ target: 44, condition: "LV 21" }] },
  { id: 44, name: "Gloom", types: ["Grass", "Poison"], evolvesTo: [{ target: 45, condition: "Lf Stone" }] },
  { id: 45, name: "Vileplume", types: ["Grass", "Poison"], evolvesTo: [] },

  { id: 46, name: "Paras", types: ["Bug", "Grass"], evolvesTo: [{ target: 47, condition: "LV 24" }] },
  { id: 47, name: "Parasect", types: ["Bug", "Grass"], evolvesTo: [] },

  { id: 48, name: "Venonat", types: ["Bug", "Poison"], evolvesTo: [{ target: 49, condition: "LV 31" }] },
  { id: 49, name: "Venomoth", types: ["Bug", "Poison"], evolvesTo: [] },

  { id: 50, name: "Diglett", types: ["Ground"], evolvesTo: [{ target: 51, condition: "LV 26" }] },
  { id: 51, name: "Dugtrio", types: ["Ground"], evolvesTo: [] },

  { id: 52, name: "Meowth", types: ["Normal"], evolvesTo: [{ target: 53, condition: "LV 28" }] },
  { id: 53, name: "Persian", types: ["Normal"], evolvesTo: [] },

  { id: 54, name: "Psyduck", types: ["Water"], evolvesTo: [{ target: 55, condition: "LV 33" }] },
  { id: 55, name: "Golduck", types: ["Water"], evolvesTo: [] },

  { id: 56, name: "Mankey", types: ["Fighting"], evolvesTo: [{ target: 57, condition: "LV 28" }] },
  { id: 57, name: "Primeape", types: ["Fighting"], evolvesTo: [] },

  { id: 58, name: "Growlithe", types: ["Fire"], evolvesTo: [{ target: 59, condition: "Fr Stone" }] },
  { id: 59, name: "Arcanine", types: ["Fire"], evolvesTo: [] },

  { id: 60, name: "Poliwag", types: ["Water"], evolvesTo: [{ target: 61, condition: "LV 25" }] },
  { id: 61, name: "Poliwhirl", types: ["Water"], evolvesTo: [{ target: 62, condition: "Wtr Stone" }] },
  { id: 62, name: "Poliwrath", types: ["Water", "Fighting"], evolvesTo: [] },

  { id: 63, name: "Abra", types: ["Psychic"], evolvesTo: [{ target: 64, condition: "LV 16" }] },
  { id: 64, name: "Kadabra", types: ["Psychic"], evolvesTo: [{ target: 65, condition: "Trade" }] },
  { id: 65, name: "Alakazam", types: ["Psychic"], evolvesTo: [] },

  { id: 66, name: "Machop", types: ["Fighting"], evolvesTo: [{ target: 67, condition: "LV 28" }] },
  { id: 67, name: "Machoke", types: ["Fighting"], evolvesTo: [{ target: 68, condition: "Trade" }] },
  { id: 68, name: "Machamp", types: ["Fighting"], evolvesTo: [] },

  { id: 69, name: "Bellsprout", types: ["Grass", "Poison"], evolvesTo: [{ target: 70, condition: "LV 21" }] },
  { id: 70, name: "Weepinbell", types: ["Grass", "Poison"], evolvesTo: [{ target: 71, condition: "Lf Stone" }] },
  { id: 71, name: "Victreebel", types: ["Grass", "Poison"], evolvesTo: [] },

  { id: 72, name: "Tentacool", types: ["Water", "Poison"], evolvesTo: [{ target: 73, condition: "LV 30" }] },
  { id: 73, name: "Tentacruel", types: ["Water", "Poison"], evolvesTo: [] },

  { id: 74, name: "Geodude", types: ["Rock", "Ground"], evolvesTo: [{ target: 75, condition: "LV 25" }] },
  { id: 75, name: "Graveler", types: ["Rock", "Ground"], evolvesTo: [{ target: 76, condition: "Trade" }] },
  { id: 76, name: "Golem", types: ["Rock", "Ground"], evolvesTo: [] },

  { id: 77, name: "Ponyta", types: ["Fire"], evolvesTo: [{ target: 78, condition: "LV 40" }] },
  { id: 78, name: "Rapidash", types: ["Fire"], evolvesTo: [] },

  { id: 79, name: "Slowpoke", types: ["Water", "Psychic"], evolvesTo: [{ target: 80, condition: "LV 37" }] },
  { id: 80, name: "Slowbro", types: ["Water", "Psychic"], evolvesTo: [] },

  { id: 81, name: "Magnemite", types: ["Electric"], evolvesTo: [{ target: 82, condition: "LV 30" }] },
  { id: 82, name: "Magneton", types: ["Electric"], evolvesTo: [] },

  { id: 83, name: "Farfetch'd", types: ["Normal", "Flying"], evolvesTo: [] },

  { id: 84, name: "Doduo", types: ["Normal", "Flying"], evolvesTo: [{ target: 85, condition: "LV 31" }] },
  { id: 85, name: "Dodrio", types: ["Normal", "Flying"], evolvesTo: [] },

  { id: 86, name: "Seel", types: ["Water"], evolvesTo: [{ target: 87, condition: "LV 34" }] },
  { id: 87, name: "Dewgong", types: ["Water", "Ice"], evolvesTo: [] },

  { id: 88, name: "Grimer", types: ["Poison"], evolvesTo: [{ target: 89, condition: "LV 38" }] },
  { id: 89, name: "Muk", types: ["Poison"], evolvesTo: [] },

  { id: 90, name: "Shellder", types: ["Water"], evolvesTo: [{ target: 91, condition: "Wtr Stone" }] },
  { id: 91, name: "Cloyster", types: ["Water", "Ice"], evolvesTo: [] },

  { id: 92, name: "Gastly", types: ["Ghost", "Poison"], evolvesTo: [{ target: 93, condition: "LV 25" }] },
  { id: 93, name: "Haunter", types: ["Ghost", "Poison"], evolvesTo: [{ target: 94, condition: "Trade" }] },
  { id: 94, name: "Gengar", types: ["Ghost", "Poison"], evolvesTo: [] },

  { id: 95, name: "Onix", types: ["Rock", "Ground"], evolvesTo: [] },

  { id: 96, name: "Drowzee", types: ["Psychic"], evolvesTo: [{ target: 97, condition: "LV 26" }] },
  { id: 97, name: "Hypno", types: ["Psychic"], evolvesTo: [] },

  { id: 98, name: "Krabby", types: ["Water"], evolvesTo: [{ target: 99, condition: "LV 28" }] },
  { id: 99, name: "Kingler", types: ["Water"], evolvesTo: [] },

  { id: 100, name: "Voltorb", types: ["Electric"], evolvesTo: [{ target: 101, condition: "LV 30" }] },
  { id: 101, name: "Electrode", types: ["Electric"], evolvesTo: [] },

  { id: 102, name: "Exeggcute", types: ["Grass", "Psychic"], evolvesTo: [{ target: 103, condition: "Lf Stone" }] },
  { id: 103, name: "Exeggutor", types: ["Grass", "Psychic"], evolvesTo: [] },

  { id: 104, name: "Cubone", types: ["Ground"], evolvesTo: [{ target: 105, condition: "LV 28" }] },
  { id: 105, name: "Marowak", types: ["Ground"], evolvesTo: [] },

  { id: 106, name: "Hitmonlee", types: ["Fighting"], evolvesTo: [] },
  { id: 107, name: "Hitmonchan", types: ["Fighting"], evolvesTo: [] },

  { id: 108, name: "Lickitung", types: ["Normal"], evolvesTo: [] },

  { id: 109, name: "Koffing", types: ["Poison"], evolvesTo: [{ target: 110, condition: "LV 35" }] },
  { id: 110, name: "Weezing", types: ["Poison"], evolvesTo: [] },

  { id: 111, name: "Rhyhorn", types: ["Ground", "Rock"], evolvesTo: [{ target: 112, condition: "LV 42" }] },
  { id: 112, name: "Rhydon", types: ["Ground", "Rock"], evolvesTo: [] },

  { id: 113, name: "Chansey", types: ["Normal"], evolvesTo: [] },
  { id: 114, name: "Tangela", types: ["Grass"], evolvesTo: [] },
  { id: 115, name: "Kangaskhan", types: ["Normal"], evolvesTo: [] },

  { id: 116, name: "Horsea", types: ["Water"], evolvesTo: [{ target: 117, condition: "LV 32" }] },
  { id: 117, name: "Seadra", types: ["Water"], evolvesTo: [] },

  { id: 118, name: "Goldeen", types: ["Water"], evolvesTo: [{ target: 119, condition: "LV 33" }] },
  { id: 119, name: "Seaking", types: ["Water"], evolvesTo: [] },

  { id: 120, name: "Staryu", types: ["Water"], evolvesTo: [{ target: 121, condition: "Wtr Stone" }] },
  { id: 121, name: "Starmie", types: ["Water", "Psychic"], evolvesTo: [] },

  { id: 122, name: "Mr. Mime", types: ["Psychic"], evolvesTo: [] },
  { id: 123, name: "Scyther", types: ["Bug", "Flying"], evolvesTo: [] },
  { id: 124, name: "Jynx", types: ["Ice", "Psychic"], evolvesTo: [] },
  { id: 125, name: "Electabuzz", types: ["Electric"], evolvesTo: [] },
  { id: 126, name: "Magmar", types: ["Fire"], evolvesTo: [] },
  { id: 127, name: "Pinsir", types: ["Bug"], evolvesTo: [] },
  { id: 128, name: "Tauros", types: ["Normal"], evolvesTo: [] },

  { id: 129, name: "Magikarp", types: ["Water"], evolvesTo: [{ target: 130, condition: "LV 20" }] },
  { id: 130, name: "Gyarados", types: ["Water", "Flying"], evolvesTo: [] },

  { id: 131, name: "Lapras", types: ["Water", "Ice"], evolvesTo: [] },
  { id: 132, name: "Ditto", types: ["Normal"], evolvesTo: [] },

  {
    id: 133,
    name: "Eevee",
    types: ["Normal"],
    evolvesTo: [
      { target: 134, condition: "Wtr Stone" },
      { target: 135, condition: "Thndr Stone" },
      { target: 136, condition: "Fr Stone" }
    ]
  },

  { id: 134, name: "Vaporeon", types: ["Water"], evolvesTo: [] },
  { id: 135, name: "Jolteon", types: ["Electric"], evolvesTo: [] },
  { id: 136, name: "Flareon", types: ["Fire"], evolvesTo: [] },

  { id: 137, name: "Porygon", types: ["Normal"], evolvesTo: [] },

  { id: 138, name: "Omanyte", types: ["Rock", "Water"], evolvesTo: [{ target: 139, condition: "LV 40" }] },
  { id: 139, name: "Omastar", types: ["Rock", "Water"], evolvesTo: [] },

  { id: 140, name: "Kabuto", types: ["Rock", "Water"], evolvesTo: [{ target: 141, condition: "LV 40" }] },
  { id: 141, name: "Kabutops", types: ["Rock", "Water"], evolvesTo: [] },

  { id: 142, name: "Aerodactyl", types: ["Rock", "Flying"], evolvesTo: [] },

  { id: 143, name: "Snorlax", types: ["Normal"], evolvesTo: [] },

  { id: 144, name: "Articuno", types: ["Ice", "Flying"], evolvesTo: [] },
  { id: 145, name: "Zapdos", types: ["Electric", "Flying"], evolvesTo: [] },
  { id: 146, name: "Moltres", types: ["Fire", "Flying"], evolvesTo: [] },

  { id: 147, name: "Dratini", types: ["Dragon"], evolvesTo: [{ target: 148, condition: "LV 30" }] },
  { id: 148, name: "Dragonair", types: ["Dragon"], evolvesTo: [{ target: 149, condition: "LV 55" }] },
  { id: 149, name: "Dragonite", types: ["Dragon", "Flying"], evolvesTo: [] },

  { id: 150, name: "Mewtwo", types: ["Psychic"], evolvesTo: [] },
  { id: 151, name: "Mew", types: ["Psychic"], evolvesTo: [] }
];

// ============================================================
// LOOKUP TABLES
// ============================================================

const POKEMON_BY_ID = Object.fromEntries(
  POKEMON_DATA.map(pokemon => [pokemon.id, pokemon])
);

const EVOLVES_FROM = {};

for (const pokemon of POKEMON_DATA) {
  for (const evolution of pokemon.evolvesTo) {
    EVOLVES_FROM[evolution.target] = {
      source: pokemon.id,
      condition: evolution.condition
    };
  }
}

// ============================================================
// VERSION AVAILABILITY
// ============================================================

const RED_EXCLUSIVE = new Set([
  23, 24,
  43, 44, 45,
  56, 57,
  58, 59,
  123,
  125
]);

const BLUE_EXCLUSIVE = new Set([
  27, 28,
  37, 38,
  52, 53,
  69, 70, 71,
  126,
  127
]);

const YELLOW_UNAVAILABLE = new Set([
  13, 14, 15,
  23, 24,
  26,
  52, 53,
  109, 110,
  124,
  125,
  126
]);

const VERSION_NAMES = {
  red: "Red",
  blue: "Blue",
  yellow: "Yellow"
};

// ============================================================
// DATA HELPERS
// ============================================================

function getAvailableVersions(pokemonId) {
  if (pokemonId === 151) {
    return [];
  }

  const versions = [];

  if (!BLUE_EXCLUSIVE.has(pokemonId)) {
    versions.push("red");
  }

  if (!RED_EXCLUSIVE.has(pokemonId)) {
    versions.push("blue");
  }

  if (!YELLOW_UNAVAILABLE.has(pokemonId)) {
    versions.push("yellow");
  }

  return versions;
}

function isPokemonAvailableInVersion(pokemonId, version) {
  return getAvailableVersions(pokemonId).includes(version);
}

// ============================================================
// SPECIAL ACQUISITIONS
// Gifts, trades, prizes, fossils, static encounters, etc.
// ============================================================

const SPECIAL_ACQUISITIONS = {
  1: [
    {
      versions: ["red", "blue"],
      location: "Pallet Town",
      method: "Starter choice"
    },
    {
      versions: ["yellow"],
      location: "Cerulean City",
      method: "Gift"
    }
  ],

  4: [
    {
      versions: ["red", "blue"],
      location: "Pallet Town",
      method: "Starter choice"
    },
    {
      versions: ["yellow"],
      location: "Route 24",
      method: "Gift"
    }
  ],

  7: [
    {
      versions: ["red", "blue"],
      location: "Pallet Town",
      method: "Starter choice"
    },
    {
      versions: ["yellow"],
      location: "Vermilion City",
      method: "Gift"
    }
  ],

  25: [
    {
      versions: ["yellow"],
      location: "Pallet Town",
      method: "Starter"
    }
  ],

  29: [
    {
      versions: ["red", "blue"],
      location: "Underground Path (Routes 5–6)",
      method: "In-game trade for Nidoran♂"
    }
  ],

  30: [
    {
      versions: ["red", "blue"],
      location: "Route 11",
      method: "In-game trade for Nidorino"
    },
    {
      versions: ["red"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  33: [
    {
      versions: ["blue"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  35: [
    {
      versions: ["red", "blue"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  37: [
    {
      versions: ["yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  40: [
    {
      versions: ["yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  47: [
    {
      versions: ["yellow"],
      location: "Route 18",
      method: "In-game trade for Tangela"
    }
  ],

  51: [
    {
      versions: ["yellow"],
      location: "Route 11",
      method: "In-game trade for Lickitung"
    }
  ],

  63: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  67: [
    {
      versions: ["yellow"],
      location: "Underground Path (Routes 5–6)",
      method: "In-game trade for Cubone; evolves immediately"
    }
  ],

  68: [
    {
      versions: ["yellow"],
      location: "Underground Path (Routes 5–6)",
      method: "Receive Machoke via in-game trade; immediate trade evolution"
    }
  ],

  83: [
    {
      versions: ["red", "blue"],
      location: "Vermilion City",
      method: "In-game trade for Spearow"
    }
  ],

  86: [
    {
      versions: ["red", "blue"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Ponyta"
    }
  ],

  87: [
    {
      versions: ["yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Growlithe"
    }
  ],

  89: [
    {
      versions: ["yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Kangaskhan"
    }
  ],

  101: [
    {
      versions: ["red", "blue"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Raichu"
    }
  ],

  106: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Saffron City Fighting Dojo",
      method: "Gift choice"
    }
  ],

  107: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Saffron City Fighting Dojo",
      method: "Gift choice"
    }
  ],

  108: [
    {
      versions: ["red", "blue"],
      location: "Route 18",
      method: "In-game trade for Slowbro"
    }
  ],

  112: [
    {
      versions: ["yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Golduck"
    }
  ],

  114: [
    {
      versions: ["red", "blue"],
      location: "Cinnabar Island Pokémon Lab",
      method: "In-game trade for Venonat"
    }
  ],

  122: [
    {
      versions: ["red", "blue"],
      location: "Route 2",
      method: "In-game trade for Abra"
    },
    {
      versions: ["yellow"],
      location: "Route 2",
      method: "In-game trade for Clefairy"
    }
  ],

  123: [
    {
      versions: ["red", "yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  124: [
    {
      versions: ["red", "blue"],
      location: "Cerulean City",
      method: "In-game trade for Poliwhirl"
    }
  ],

  127: [
    {
      versions: ["blue", "yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  129: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Route 4 Pokémon Center",
      method: "Purchase from salesman for ₽500"
    }
  ],

  131: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Silph Co.",
      method: "Gift"
    }
  ],

  133: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Celadon Mansion",
      method: "Gift Pokémon"
    }
  ],

  137: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  138: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "Revive Helix Fossil"
    }
  ],

  140: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "Revive Dome Fossil"
    }
  ],

  142: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Cinnabar Island Pokémon Lab",
      method: "Revive Old Amber"
    }
  ],

  143: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Route 12",
      method: "Static encounter"
    },
    {
      versions: ["red", "blue", "yellow"],
      location: "Route 16",
      method: "Static encounter"
    }
  ],

  144: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Seafoam Islands",
      method: "Static encounter"
    }
  ],

  145: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Power Plant",
      method: "Static encounter"
    }
  ],

  146: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Victory Road",
      method: "Static encounter"
    }
  ],

  147: [
    {
      versions: ["red", "blue"],
      location: "Celadon Game Corner",
      method: "Prize Pokémon"
    }
  ],

  150: [
    {
      versions: ["red", "blue", "yellow"],
      location: "Cerulean Cave",
      method: "Static encounter"
    }
  ],

  151: [
    {
      versions: [],
      location: "Event distribution",
      method: "Not normally obtainable in-game"
    }
  ]
};

function getSpecialAcquisitions(pokemonId, version) {
  return (SPECIAL_ACQUISITIONS[pokemonId] || [])
    .filter(entry => entry.versions.includes(version));
}

// ============================================================
// DISPLAY HELPERS
// ============================================================

function getSpriteUrl(pokemonId, version) {
  const spriteVersion =
    version === "yellow"
      ? "yellow"
      : "red-blue";

  return `assets/sprites/${spriteVersion}/${pokemonId}.png`;
}

function formatEvolutionText(pokemon) {
  if (!pokemon.evolvesTo.length) {
    return "";
  }

  return pokemon.evolvesTo
    .map(evolution => {
      const target = POKEMON_BY_ID[evolution.target];

      return `${target.name} — ${evolution.condition}`;
    })
    .join(" / ");
}
