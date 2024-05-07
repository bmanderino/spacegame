type TODO = any;
type ID = string;
type ItemID = number;
type StoryID = ID;
type DestinationID = ID;
type DifficultyChallenge = number;

// which types are immutable?

// top-down
// bottom-up

type WorldState = {
  player: PlayerState;
  reachableStories: Record<StoryID, true>;
  reachableDestinations: Record<DestinationID, true>;
  currentDestination: DestinationID;
};

type StatType = keyof CharacterStats;

type CharacterStats = {
  dex: number
  vit: number
  str: number
  int: number
}

type PlayerState = {
  name: string
  role: string
  shipName: string
  stats: CharacterStats
  inventory: Inventory
};

// type Ship = {
//   inventory: Inventory
//   // station
// }

type NPCState = {
  name: string
  role: string
  stats: CharacterStats
  inventory: Inventory
  associatedStories: Record<StoryID, true>
  // interact? successfull interaction?
};

type Action = {
  pass: boolean
  retreat: boolean //go back
  buffSkillCheck: Inventory['items']
};

type Inventory = {
  items: InventoryItem[];
  wallet: Wallet;
}

type Wallet = {
  credits: number;
  gems: number;
  gold: number;
  crystals: number;
}

type InventoryItem = {
  ID: ItemID;
  name: string
  type: InventoryType;
  stat?: Partial<CharacterStats>;
  equipped: boolean
  count: number
};

type InventoryType = 'weapon' | 'armor' | 'consumable' | 'trinket'

//NPC Shopkeepers

type Story = { // immutable?
  ID: StoryID
  completed: boolean
  stat: StatType[]
  dc: DifficultyChallenge
};

type Destination = {
  ID: DestinationID
  name: string
  stories: Record<StoryID, Story>;
};

type Role = 'commander' | 'engineer' | 'scientist';


const ROLE_STATS: Record<Role, CharacterStats> = {
  commander: {
    dex: 5,
    vit: 10,
    str: 8,
    int: 6
  },
  engineer: {
    dex: 4,
    vit: 5,
    str: 8,
    int: 6
  },
  scientist: {
    dex: 2,
    vit: 8,
    str: 8,
    int: 6
  }
};

type InitialStateOptions = {
  playerName: string,
  playerRole: Role,
};

function makeInitialState(options: InitialStateOptions): WorldState {
  return {
    player: {
      name: options.playerName,
      role: options.playerRole,
      shipName: "",
      stats: ROLE_STATS[options.playerRole],
      inventory: {
        items: [],
        wallet: {
          credits: 50,
          gems: 0,
          gold: 0,
          crystals: 0
        }
      }
    },
    reachableStories: {},
    reachableDestinations: {},
    currentDestination: ''
  };
}

//
// Consumable (+health) | Powerup (buff & consumed instantly) | Weapon | Item (eg: grenade, silencer)

// const EX_NPC: NPCState = {
//   name: "Joe",
//   role: 'scientist',
//   stats: ROLE_STATS[],
//   inventory: [],
//   associatedStories: Record<StoryID, true>

// };

// const portalEntranceZone = {
//   type: 'zone',
//   id: 58,
//   onInteract: (playerID: string) => {
//     const pos = scene.players[playerID].pos;
//     const zone = map.getZoneByPosition(pos);
//     const dest = portals[zone];

//     player.pos = map.findZone(dest);
//   }
// };

// const pistolInstance = {
//   entityID: 58,
//   lastFired: 3,
// };


// -------------

console.log(makeInitialState({
  playerName: 'Briannn',
  playerRole: 'engineer'
}));

// a, b, c, d

// a -> b, c
// d -> c

const node = {
  id: 1,
  passNodes: [2, 4],
  failNodes: 3
};



const data = {
  "destinations": [
    {
      "name": "Moon Base",
      "id": 1,
      "stories": [
        {
          "id": 1,
          "title": "Story1",
          "intro": "The first section",
          "stat": "dex",
          "pass": "you win",
          "fail": "you lose"
        },
        {
          "id": 2,
          "title": "Story2",
          "intro": "The second section",
          "stat": "vit",
          "pass": "you win",
          "fail": "you lose"
        }
      ]
    }
  ]

}


// # Full-Stack for Frontend Devs

// - DevOps
// - security
// - serverless
// - APIs/protocols
//   -
// - Databases
//   - how to structure data, especially if you don't know what it's going to look lik
// - Authentication
//   - session-based / JWT
// - System design / what are the moving pieces
//   - moving pieces (symbols on the diagram in a SD interview)
//     - horizontally scalable application
//     - DB
//     - load balancer
//     - reverse proxy
//     - CDN
//     - ...
// - architecture
//   - monolith ... -> ... -> microservices spectrum