// Core game types
export enum PokemonType {
  NORMAL = 'normal',
  FIRE = 'fire',
  WATER = 'water',
  ELECTRIC = 'electric',
  GRASS = 'grass',
  ICE = 'ice',
  FIGHTING = 'fighting',
  POISON = 'poison',
  GROUND = 'ground',
  FLYING = 'flying',
  PSYCHIC = 'psychic',
  BUG = 'bug',
  ROCK = 'rock',
  GHOST = 'ghost',
  DRAGON = 'dragon',
  DARK = 'dark',
  STEEL = 'steel',
  FAIRY = 'fairy',
}

export enum MoveCategory {
  PHYSICAL = 'physical',
  SPECIAL = 'special',
  STATUS = 'status',
}

export interface Move {
  id: string;
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number;
  accuracy: number;
  cooldown: number;
  description: string;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface PokemonData {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: PokemonStats;
  learnableMoves: string[];
}

export interface BattlePokemon extends PokemonData {
  currentHP: number;
  maxHP: number;
  moves: Move[];
  level: number;
  gridX: number;
  gridY: number;
}

export enum TileOwner {
  PLAYER = 'player',
  ENEMY = 'enemy',
  NEUTRAL = 'neutral',
}

export enum TileType {
  NORMAL = 'normal',
  CRACKED = 'cracked',
  BROKEN = 'broken',
}

export interface GridTile {
  x: number;
  y: number;
  owner: TileOwner;
  type: TileType;
  occupied: boolean;
}

export interface RewardOption {
  type: 'move' | 'stat_boost' | 'heal';
  data: any;
  description: string;
}

export interface GameProgress {
  currentRound: number;
  selectedRewards: RewardOption[];
  playerPower: number;
}

export const TYPE_EFFECTIVENESS: Record<PokemonType, Partial<Record<PokemonType, number>>> = {
  [PokemonType.NORMAL]: {
    [PokemonType.ROCK]: 0.5,
    [PokemonType.GHOST]: 0,
    [PokemonType.STEEL]: 0.5,
  },
  [PokemonType.FIRE]: {
    [PokemonType.FIRE]: 0.5,
    [PokemonType.WATER]: 0.5,
    [PokemonType.GRASS]: 2,
    [PokemonType.ICE]: 2,
    [PokemonType.BUG]: 2,
    [PokemonType.ROCK]: 0.5,
    [PokemonType.DRAGON]: 0.5,
    [PokemonType.STEEL]: 2,
  },
  [PokemonType.WATER]: {
    [PokemonType.FIRE]: 2,
    [PokemonType.WATER]: 0.5,
    [PokemonType.GRASS]: 0.5,
    [PokemonType.GROUND]: 2,
    [PokemonType.ROCK]: 2,
    [PokemonType.DRAGON]: 0.5,
  },
  [PokemonType.ELECTRIC]: {
    [PokemonType.WATER]: 2,
    [PokemonType.ELECTRIC]: 0.5,
    [PokemonType.GRASS]: 0.5,
    [PokemonType.GROUND]: 0,
    [PokemonType.FLYING]: 2,
    [PokemonType.DRAGON]: 0.5,
  },
  [PokemonType.GRASS]: {
    [PokemonType.FIRE]: 0.5,
    [PokemonType.WATER]: 2,
    [PokemonType.GRASS]: 0.5,
    [PokemonType.POISON]: 0.5,
    [PokemonType.GROUND]: 2,
    [PokemonType.FLYING]: 0.5,
    [PokemonType.BUG]: 0.5,
    [PokemonType.ROCK]: 2,
    [PokemonType.DRAGON]: 0.5,
    [PokemonType.STEEL]: 0.5,
  },
  [PokemonType.ICE]: {},
  [PokemonType.FIGHTING]: {},
  [PokemonType.POISON]: {},
  [PokemonType.GROUND]: {},
  [PokemonType.FLYING]: {},
  [PokemonType.PSYCHIC]: {},
  [PokemonType.BUG]: {},
  [PokemonType.ROCK]: {},
  [PokemonType.GHOST]: {},
  [PokemonType.DRAGON]: {},
  [PokemonType.DARK]: {},
  [PokemonType.STEEL]: {},
  [PokemonType.FAIRY]: {},
};

export function getTypeEffectiveness(
  attackType: PokemonType,
  defenderTypes: PokemonType[]
): number {
  let multiplier = 1;
  
  for (const defenderType of defenderTypes) {
    const effectiveness = TYPE_EFFECTIVENESS[attackType]?.[defenderType];
    if (effectiveness !== undefined) {
      multiplier *= effectiveness;
    }
  }
  
  return multiplier;
}
