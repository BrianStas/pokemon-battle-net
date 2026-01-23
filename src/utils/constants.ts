export const GRID = {
  COLS: 6,
  ROWS: 3,
  TILE_WIDTH: 70,   // Width of each tile
  TILE_HEIGHT: 50,  // Height of each tile (shorter for perspective)
  TILE_DEPTH: 25,   // Depth for isometric effect
  PLAYER_COLS: 3,
  ENEMY_COLS: 3,
} as const;

export const GAME = {
  WIDTH: 800,
  HEIGHT: 600,
  BACKGROUND_COLOR: '#1a1a2e',
} as const;

export const BATTLE = {
  MOVE_COOLDOWN_BASE: 1000,
  PROJECTILE_SPEED: 300,
  PLAYER_START_X: 0,
  PLAYER_START_Y: 1,
  ENEMY_START_X: 5,
  ENEMY_START_Y: 1,
} as const;

export const PROGRESSION = {
  STARTING_ROUND: 1,
  STAT_BOOST_AMOUNT: 10,
  DIFFICULTY_SCALING: 1.15,
} as const;

export const COLORS = {
  PLAYER_TILE: 0x4a90e2,
  ENEMY_TILE: 0xe74c3c,
  NEUTRAL_TILE: 0x95a5a6,
  CRACKED_TILE: 0xd35400,
  HP_BAR_FILL: 0x2ecc71,
  HP_BAR_DAMAGE: 0xe74c3c,
  HP_BAR_BG: 0x2c3e50,
} as const;
