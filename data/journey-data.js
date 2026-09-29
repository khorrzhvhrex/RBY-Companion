// ============================================================
// JOURNEY DATA
// ============================================================
//
// section:
//   "progression" = main game/progression significance
//   "optional"    = unique side content worth tracking
//
// type:
//   "check"  = ordinary checkbox objective
//   "choice" = one-of-several selection
//
// Requirements are ANDed unless the requirement itself is "any".
//
// Supported requirements:
//   objective
//   storyFlag
//   badge
//   badgeCount
//   hm
//   keyItem
//   dexCount
//   hallOfFame
//   any
//
// Effects are intentionally one-way. Unchecking a Journey objective
// does not automatically remove Pokémon/items already awarded.
//

const JOURNEY_DATA = [

  // ============================================================
  // PALLET TOWN
  // ============================================================

  {
    id: "pallet-town",
    name: "Pallet Town",

    objectives: [

      {
        id: "choose-starter-rb",
        section: "progression",
        type: "choice",
        versions: ["red", "blue"],

        label: "Choose your first partner Pokémon",

        choices: [
          {
            id: "bulbasaur",
            label: "Bulbasaur",
            effects: [
              { type: "dexObtained", pokemonId: 1 }
            ]
          },
          {
            id: "charmander",
            label: "Charmander",
            effects: [
              { type: "dexObtained", pokemonId: 4 }
            ]
          },
          {
            id: "squirtle",
            label: "Squirtle",
            effects: [
              { type: "dexObtained", pokemonId: 7 }
            ]
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "starterReceived"
          }
        ]
      },

      {
        id: "receive-pikachu-yellow",
        section: "progression",
        type: "check",
        versions: ["yellow"],

        label: "Receive Pikachu from Professor Oak",

        effects: [
          {
            type: "dexObtained",
            pokemonId: 25
          },
          {
            type: "storyFlag",
            id: "starterReceived"
          }
        ]
      },

      {
        id: "deliver-oaks-parcel",
        section: "progression",
        type: "check",

        label: "Deliver Oak's Parcel to Professor Oak and receive the Pokédex",

        requires: [
          {
            type: "keyItem",
            id: "oaksParcel"
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "pokedexReceived"
          }
        ]
      },

      {
        id: "receive-town-map",
        section: "optional",
        type: "check",

        label: "Receive the Town Map from Daisy",

        requires: [
          {
            type: "objective",
            id: "deliver-oaks-parcel"
          }
        ]
      }
    ]
  },


  // ============================================================
  // VIRIDIAN CITY
  // ============================================================

  {
    id: "viridian-city",
    name: "Viridian City",

    objectives: [

      {
        id: "obtain-oaks-parcel",
        section: "progression",
        type: "check",

        label: "Pick up Oak's Parcel from the Poké Mart",

        requires: [
          {
            type: "storyFlag",
            id: "starterReceived"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "oaksParcel"
          }
        ]
      },

      {
        id: "defeat-giovanni-gym",
        section: "progression",
        type: "check",

        label: "Defeat Giovanni and obtain the Earth Badge",

        requires: [
          {
            type: "badgeCount",
            count: 7,
            exclude: ["earth"]
          }
        ],

        effects: [
          {
            type: "badge",
            id: "earth"
          }
        ]
      }
    ]
  },


  // ============================================================
  // PEWTER CITY
  // ============================================================

  {
    id: "pewter-city",
    name: "Pewter City",

    objectives: [

      {
        id: "defeat-brock",
        section: "progression",
        type: "check",

        label: "Defeat Brock and obtain the Boulder Badge",

        requires: [
          {
            type: "storyFlag",
            id: "pokedexReceived"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "boulder"
          }
        ]
      },

      {
        id: "obtain-old-amber",
        section: "optional",
        type: "check",

        label: "Enter the rear of the Museum with Cut and receive the Old Amber",

        requires: [
          {
            type: "hm",
            id: "hm01"
          },
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "oldAmber"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 4 POKÉMON CENTER
  // ============================================================

  {
    id: "route-4-pokemon-center",
    name: "Route 4 Pokémon Center",

    objectives: [

      {
        id: "buy-magikarp",
        section: "optional",
        type: "check",

        label: "Purchase Magikarp from the salesman for ₽500",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 129
          }
        ]
      }
    ]
  },


  // ============================================================
  // MT. MOON
  // ============================================================

  {
    id: "mt-moon",
    name: "Mt. Moon",

    objectives: [

      {
        id: "choose-fossil",
        section: "progression",
        type: "choice",

        label: "Choose one fossil after defeating the Super Nerd",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        choices: [
          {
            id: "helix",
            label: "Helix Fossil",
            effects: [
              {
                type: "storyFlag",
                id: "helixFossil"
              }
            ]
          },
          {
            id: "dome",
            label: "Dome Fossil",
            effects: [
              {
                type: "storyFlag",
                id: "domeFossil"
              }
            ]
          }
        ]
      }
    ]
  },


  // ============================================================
  // CERULEAN CITY
  // ============================================================

  {
    id: "cerulean-city",
    name: "Cerulean City",

    objectives: [

      {
        id: "defeat-misty",
        section: "progression",
        type: "check",

        label: "Defeat Misty and obtain the Cascade Badge",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "cascade"
          }
        ]
      },

      {
        id: "trade-jynx-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Poliwhirl for Jynx",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 124
          }
        ]
      },

      {
        id: "receive-bulbasaur-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Receive Bulbasaur from the girl in Cerulean City",

        note: "Requires sufficiently high Pikachu friendship.",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 1
          }
        ]
      },

      {
        id: "redeem-bike-voucher",
        section: "optional",
        type: "check",

        label: "Redeem the Bike Voucher at the Bike Shop",

        requires: [
          {
            type: "keyItem",
            id: "bikeVoucher"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "bicycle"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 24
  // ============================================================

  {
    id: "route-24",
    name: "Route 24",

    objectives: [

      {
        id: "receive-charmander-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Receive Charmander from the Trainer north of Nugget Bridge",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 4
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 25 / SEA COTTAGE
  // ============================================================

  {
    id: "route-25",
    name: "Route 25 / Sea Cottage",

    objectives: [

      {
        id: "help-bill",
        section: "progression",
        type: "check",

        label: "Help Bill and receive the S.S. Ticket",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "ssTicket"
          }
        ]
      }
    ]
  },


  // ============================================================
  // UNDERGROUND PATH (ROUTES 5–6)
  // ============================================================

  {
    id: "underground-path-5-6",
    name: "Underground Path (Routes 5–6)",

    objectives: [

      {
        id: "trade-nidoran-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Nidoran♂ for Nidoran♀",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 29
          }
        ]
      },

      {
        id: "trade-machamp-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Cubone for Machoke, which immediately evolves into Machamp",

        requires: [
          {
            type: "badge",
            id: "boulder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 68
          }
        ]
      }
    ]
  },


  // ============================================================
  // VERMILION CITY
  // ============================================================

  {
    id: "vermilion-city",
    name: "Vermilion City",

    objectives: [

      {
        id: "obtain-bike-voucher",
        section: "optional",
        type: "check",

        label: "Receive the Bike Voucher from the Pokémon Fan Club Chairman",

        requires: [
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "bikeVoucher"
          }
        ]
      },

      {
        id: "obtain-old-rod",
        section: "optional",
        type: "check",

        label: "Receive the Old Rod from the Fishing Guru",

        requires: [
          {
            type: "badge",
            id: "cascade"
          }
        ]
      },

      {
        id: "trade-farfetchd-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Spearow for Farfetch'd",

        requires: [
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 83
          }
        ]
      },

      {
        id: "defeat-lt-surge",
        section: "progression",
        type: "check",

        label: "Defeat Lt. Surge and obtain the Thunder Badge",

        requires: [
          {
            type: "hm",
            id: "hm01"
          },
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "thunder"
          }
        ]
      },

      {
        id: "receive-squirtle-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Receive Squirtle from Officer Jenny",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 7
          }
        ]
      }
    ]
  },


  // ============================================================
  // S.S. ANNE
  // ============================================================

  {
    id: "ss-anne",
    name: "S.S. Anne",

    objectives: [

      {
        id: "obtain-hm01",
        section: "progression",
        type: "check",

        label: "Help the Captain and receive HM01 Cut",

        requires: [
          {
            type: "keyItem",
            id: "ssTicket"
          }
        ],

        effects: [
          {
            type: "hm",
            id: "hm01"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 2 EAST
  // ============================================================

  {
    id: "route-2-east",
    name: "Route 2 East",

    objectives: [

      {
        id: "obtain-hm05",
        section: "optional",
        type: "check",

        label: "Receive HM05 Flash from Professor Oak's aide",

        note: "Requires at least 10 obtained species.",

        requires: [
          {
            type: "dexCount",
            count: 10
          }
        ],

        effects: [
          {
            type: "hm",
            id: "hm05"
          }
        ]
      },

      {
        id: "trade-mr-mime-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Abra for Mr. Mime",

        requires: [
          {
            type: "hm",
            id: "hm01"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 122
          }
        ]
      },

      {
        id: "trade-mr-mime-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Clefairy for Mr. Mime",

        requires: [
          {
            type: "hm",
            id: "hm01"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 122
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 11
  // ============================================================

  {
    id: "route-11",
    name: "Route 11",

    objectives: [

      {
        id: "obtain-itemfinder",
        section: "optional",
        type: "check",

        label: "Receive the Itemfinder from Professor Oak's aide",

        note: "Requires at least 30 obtained species.",

        requires: [
          {
            type: "dexCount",
            count: 30
          }
        ]
      },

      {
        id: "trade-nidorina-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Nidorino for Nidorina",

        requires: [
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 30
          }
        ]
      },

      {
        id: "trade-dugtrio-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Lickitung for Dugtrio",

        requires: [
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 51
          }
        ]
      }
    ]
  },


  // ============================================================
  // CELADON CITY
  // ============================================================

  {
    id: "celadon-city",
    name: "Celadon City",

    objectives: [

      {
        id: "defeat-erika",
        section: "progression",
        type: "check",

        label: "Defeat Erika and obtain the Rainbow Badge",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "rainbow"
          }
        ]
      },

      {
        id: "obtain-coin-case",
        section: "optional",
        type: "check",

        label: "Receive the Coin Case from the man in the restaurant",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ]
      },

      {
        id: "receive-eevee",
        section: "optional",
        type: "check",

        label: "Receive Eevee from the Celadon Mansion rooftop room",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 133
          }
        ]
      },

      {
        id: "open-saffron",
        section: "progression",
        type: "check",

        label: "Give a drink from the Department Store to a Saffron guard",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "saffronAccess"
          }
        ]
      },


      // ------------------------------------------------------------
      // RED GAME CORNER PRIZES
      // ------------------------------------------------------------

      {
        id: "game-corner-red-abra",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 180 Coins for Abra",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 63
          }
        ]
      },

      {
        id: "game-corner-red-clefairy",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 500 Coins for Clefairy",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 35
          }
        ]
      },

      {
        id: "game-corner-red-nidorina",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 1,200 Coins for Nidorina",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 30
          }
        ]
      },

      {
        id: "game-corner-red-dratini",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 2,800 Coins for Dratini",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 147
          }
        ]
      },

      {
        id: "game-corner-red-scyther",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 5,500 Coins for Scyther",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 123
          }
        ]
      },

      {
        id: "game-corner-red-porygon",
        section: "optional",
        type: "check",
        versions: ["red"],

        label: "Redeem 9,999 Coins for Porygon",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 137
          }
        ]
      },


      // ------------------------------------------------------------
      // BLUE GAME CORNER PRIZES
      // ------------------------------------------------------------

      {
        id: "game-corner-blue-abra",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 120 Coins for Abra",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 63
          }
        ]
      },

      {
        id: "game-corner-blue-clefairy",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 750 Coins for Clefairy",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 35
          }
        ]
      },

      {
        id: "game-corner-blue-nidorino",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 1,200 Coins for Nidorino",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 33
          }
        ]
      },

      {
        id: "game-corner-blue-pinsir",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 2,500 Coins for Pinsir",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 127
          }
        ]
      },

      {
        id: "game-corner-blue-dratini",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 4,600 Coins for Dratini",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 147
          }
        ]
      },

      {
        id: "game-corner-blue-porygon",
        section: "optional",
        type: "check",
        versions: ["blue"],

        label: "Redeem 6,500 Coins for Porygon",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 137
          }
        ]
      },


      // ------------------------------------------------------------
      // YELLOW GAME CORNER PRIZES
      // ------------------------------------------------------------

      {
        id: "game-corner-yellow-abra",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 230 Coins for Abra",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 63
          }
        ]
      },

      {
        id: "game-corner-yellow-vulpix",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 1,000 Coins for Vulpix",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 37
          }
        ]
      },

      {
        id: "game-corner-yellow-wigglytuff",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 2,680 Coins for Wigglytuff",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 40
          }
        ]
      },

      {
        id: "game-corner-yellow-scyther",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 6,500 Coins for Scyther",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 123
          }
        ]
      },

      {
        id: "game-corner-yellow-pinsir",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 6,500 Coins for Pinsir",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 127
          }
        ]
      },

      {
        id: "game-corner-yellow-porygon",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Redeem 9,999 Coins for Porygon",

        requires: [
          {
            type: "keyItem",
            id: "coinCase"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 137
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROCKET HIDEOUT
  // ============================================================

  {
    id: "rocket-hideout",
    name: "Rocket Hideout",

    objectives: [

      {
        id: "obtain-lift-key",
        section: "progression",
        type: "check",

        label: "Defeat the Rocket Grunt on B4F and obtain the Lift Key",

        requires: [
          {
            type: "badge",
            id: "thunder"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "liftKey"
          }
        ]
      },

      {
        id: "obtain-silph-scope",
        section: "progression",
        type: "check",

        label: "Defeat Giovanni and obtain the Silph Scope",

        requires: [
          {
            type: "keyItem",
            id: "liftKey"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "silphScope"
          }
        ]
      }
    ]
  },


  // ============================================================
  // POKÉMON TOWER
  // ============================================================

  {
    id: "pokemon-tower",
    name: "Pokémon Tower",

    objectives: [

      {
        id: "defeat-ghost-marowak",
        section: "progression",
        type: "check",

        label: "Identify and defeat the ghost Marowak",

        requires: [
          {
            type: "keyItem",
            id: "silphScope"
          }
        ]
      },

      {
        id: "obtain-poke-flute",
        section: "progression",
        type: "check",

        label: "Rescue Mr. Fuji and receive the Poké Flute",

        requires: [
          {
            type: "objective",
            id: "defeat-ghost-marowak"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 16
  // ============================================================

  {
    id: "route-16",
    name: "Route 16",

    objectives: [

      {
        id: "route16-snorlax",
        section: "optional",
        type: "check",

        label: "Wake the static Snorlax with the Poké Flute",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ]
      },

      {
        id: "obtain-hm02",
        section: "optional",
        type: "check",

        label: "Use Cut to reach the secluded house and receive HM02 Fly",

        requires: [
          {
            type: "hm",
            id: "hm01"
          },
          {
            type: "badge",
            id: "cascade"
          }
        ],

        effects: [
          {
            type: "hm",
            id: "hm02"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 12
  // ============================================================

  {
    id: "route-12",
    name: "Route 12",

    objectives: [

      {
        id: "route12-snorlax",
        section: "optional",
        type: "check",

        label: "Wake the static Snorlax with the Poké Flute",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ]
      },

      {
        id: "obtain-super-rod",
        section: "optional",
        type: "check",

        label: "Receive the Super Rod from the Fishing Guru",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ]
      }
    ]
  },


  // ============================================================
  // SAFFRON CITY
  // ============================================================

  {
    id: "saffron-city",
    name: "Saffron City",

    objectives: [

      {
        id: "fighting-dojo-choice",
        section: "optional",
        type: "choice",

        label: "Defeat the Fighting Dojo master and choose a Pokémon",

        requires: [
          {
            type: "storyFlag",
            id: "saffronAccess"
          }
        ],

        choices: [
          {
            id: "hitmonlee",
            label: "Hitmonlee",
            effects: [
              {
                type: "dexObtained",
                pokemonId: 106
              }
            ]
          },
          {
            id: "hitmonchan",
            label: "Hitmonchan",
            effects: [
              {
                type: "dexObtained",
                pokemonId: 107
              }
            ]
          }
        ]
      },

      {
        id: "defeat-sabrina",
        section: "progression",
        type: "check",

        label: "Defeat Sabrina and obtain the Marsh Badge",

        requires: [
          {
            type: "storyFlag",
            id: "silphCleared"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "marsh"
          }
        ]
      }
    ]
  },


  // ============================================================
  // SILPH CO.
  // ============================================================

  {
    id: "silph-co",
    name: "Silph Co.",

    objectives: [

      {
        id: "obtain-card-key",
        section: "progression",
        type: "check",

        label: "Obtain the Card Key",

        requires: [
          {
            type: "storyFlag",
            id: "saffronAccess"
          },
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "cardKey"
          }
        ]
      },

      {
        id: "receive-lapras",
        section: "optional",
        type: "check",

        label: "Receive Lapras from the Silph employee on 7F",

        requires: [
          {
            type: "keyItem",
            id: "cardKey"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 131
          }
        ]
      },

      {
        id: "clear-silph",
        section: "progression",
        type: "check",

        label: "Defeat Giovanni and drive Team Rocket out of Silph Co.",

        requires: [
          {
            type: "keyItem",
            id: "cardKey"
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "silphCleared"
          }
        ]
      },

      {
        id: "receive-master-ball",
        section: "optional",
        type: "check",

        label: "Receive the Master Ball from the Silph President",

        requires: [
          {
            type: "objective",
            id: "clear-silph"
          }
        ]
      }
    ]
  },


  // ============================================================
  // FUCHSIA CITY
  // ============================================================

  {
    id: "fuchsia-city",
    name: "Fuchsia City",

    objectives: [

      {
        id: "defeat-koga",
        section: "progression",
        type: "check",

        label: "Defeat Koga and obtain the Soul Badge",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "soul"
          }
        ]
      },

      {
        id: "obtain-good-rod",
        section: "optional",
        type: "check",

        label: "Receive the Good Rod from the Fishing Guru",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ]
      },

      {
        id: "obtain-hm04",
        section: "progression",
        type: "check",

        label: "Return the Gold Teeth to the Safari Zone Warden and receive HM04 Strength",

        requires: [
          {
            type: "keyItem",
            id: "goldTeeth"
          }
        ],

        effects: [
          {
            type: "hm",
            id: "hm04"
          }
        ]
      }
    ]
  },


  // ============================================================
  // SAFARI ZONE
  // ============================================================

  {
    id: "safari-zone",
    name: "Safari Zone",

    objectives: [

      {
        id: "obtain-hm03",
        section: "progression",
        type: "check",

        label: "Reach the Secret House and receive HM03 Surf",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "hm",
            id: "hm03"
          }
        ]
      },

      {
        id: "obtain-gold-teeth",
        section: "progression",
        type: "check",

        label: "Recover the Warden's Gold Teeth",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "goldTeeth"
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 15
  // ============================================================

  {
    id: "route-15",
    name: "Route 15",

    objectives: [

      {
        id: "obtain-exp-all",
        section: "optional",
        type: "check",

        label: "Receive Exp. All from Professor Oak's aide",

        note: "Requires at least 50 obtained species.",

        requires: [
          {
            type: "dexCount",
            count: 50
          }
        ]
      }
    ]
  },


  // ============================================================
  // ROUTE 18
  // ============================================================

  {
    id: "route-18",
    name: "Route 18",

    objectives: [

      {
        id: "trade-lickitung-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Slowbro for Lickitung",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 108
          }
        ]
      },

      {
        id: "trade-parasect-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Tangela for Parasect",

        requires: [
          {
            type: "keyItem",
            id: "pokeFlute"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 47
          }
        ]
      }
    ]
  },


  // ============================================================
  // POWER PLANT
  // ============================================================

  {
    id: "power-plant",
    name: "Power Plant",

    objectives: [

      {
        id: "power-plant-voltorb",
        section: "optional",
        type: "check",

        label: "Resolve the six static Voltorb encounters",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ]
      },

      {
        id: "power-plant-electrode",
        section: "optional",
        type: "check",

        label: "Resolve the two static Electrode encounters",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ]
      },

      {
        id: "encounter-zapdos",
        section: "optional",
        type: "check",

        label: "Encounter the static Zapdos",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ]
      }
    ]
  },


  // ============================================================
  // SEAFOAM ISLANDS
  // ============================================================

  {
    id: "seafoam-islands",
    name: "Seafoam Islands",

    objectives: [

      {
        id: "encounter-articuno",
        section: "optional",
        type: "check",

        label: "Reach and encounter the static Articuno",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          },
          {
            type: "hm",
            id: "hm04"
          },
          {
            type: "badge",
            id: "rainbow"
          }
        ]
      }
    ]
  },


  // ============================================================
  // CINNABAR ISLAND
  // ============================================================

  {
    id: "cinnabar-island",
    name: "Cinnabar Island",

    objectives: [

      {
        id: "revive-omanyte",
        section: "optional",
        type: "check",

        label: "Revive the Helix Fossil into Omanyte",

        requires: [
          {
            type: "storyFlag",
            id: "helixFossil"
          },
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 138
          }
        ]
      },

      {
        id: "revive-kabuto",
        section: "optional",
        type: "check",

        label: "Revive the Dome Fossil into Kabuto",

        requires: [
          {
            type: "storyFlag",
            id: "domeFossil"
          },
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 140
          }
        ]
      },

      {
        id: "revive-aerodactyl",
        section: "optional",
        type: "check",

        label: "Revive the Old Amber into Aerodactyl",

        requires: [
          {
            type: "storyFlag",
            id: "oldAmber"
          },
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 142
          }
        ]
      },

      {
        id: "trade-electrode-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Raichu for Electrode",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 101
          }
        ]
      },

      {
        id: "trade-tangela-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Venonat for Tangela",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 114
          }
        ]
      },

      {
        id: "trade-seel-rb",
        section: "optional",
        type: "check",
        versions: ["red", "blue"],

        label: "Trade Ponyta for Seel",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 86
          }
        ]
      },

      {
        id: "trade-rhydon-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Golduck for Rhydon",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 112
          }
        ]
      },

      {
        id: "trade-dewgong-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Growlithe for Dewgong",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 87
          }
        ]
      },

      {
        id: "trade-muk-yellow",
        section: "optional",
        type: "check",
        versions: ["yellow"],

        label: "Trade Kangaskhan for Muk",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "dexObtained",
            pokemonId: 89
          }
        ]
      },

      {
        id: "defeat-blaine",
        section: "progression",
        type: "check",

        label: "Defeat Blaine and obtain the Volcano Badge",

        requires: [
          {
            type: "keyItem",
            id: "secretKey"
          }
        ],

        effects: [
          {
            type: "badge",
            id: "volcano"
          }
        ]
      }
    ]
  },


  // ============================================================
  // POKÉMON MANSION
  // ============================================================

  {
    id: "pokemon-mansion",
    name: "Pokémon Mansion",

    objectives: [

      {
        id: "obtain-secret-key",
        section: "progression",
        type: "check",

        label: "Find the Secret Key in the basement",

        requires: [
          {
            type: "hm",
            id: "hm03"
          },
          {
            type: "badge",
            id: "soul"
          }
        ],

        effects: [
          {
            type: "keyItem",
            id: "secretKey"
          }
        ]
      }
    ]
  },


  // ============================================================
  // VICTORY ROAD
  // ============================================================

  {
    id: "victory-road",
    name: "Victory Road",

    objectives: [

      {
        id: "encounter-moltres",
        section: "optional",
        type: "check",

        label: "Encounter the static Moltres",

        requires: [
          {
            type: "badgeCount",
            count: 8
          },
          {
            type: "hm",
            id: "hm04"
          },
          {
            type: "badge",
            id: "rainbow"
          }
        ]
      }
    ]
  },


  // ============================================================
  // INDIGO PLATEAU
  // ============================================================

  {
    id: "indigo-plateau",
    name: "Indigo Plateau",

    objectives: [

      {
        id: "become-champion",
        section: "progression",
        type: "check",

        label: "Defeat the Elite Four and Champion",

        requires: [
          {
            type: "badgeCount",
            count: 8
          }
        ],

        effects: [
          {
            type: "storyFlag",
            id: "champion"
          }
        ]
      }
    ]
  },


  // ============================================================
  // CERULEAN CAVE
  // ============================================================

  {
    id: "cerulean-cave",
    name: "Cerulean Cave",

    objectives: [

      {
        id: "encounter-mewtwo",
        section: "optional",
        type: "check",

        label: "Encounter the static Mewtwo",

        requires: [
          {
            type: "storyFlag",
            id: "champion"
          }
        ]
      }
    ]
  }
];
