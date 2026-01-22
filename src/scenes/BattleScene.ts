import Phaser from 'phaser';
import { GRID, COLORS } from '@/utils/constants';
import { GameProgress } from '@/types';
import { POKEMON_SPRITES, getRandomPokemon } from '@/data/pokemonSprites';

export class BattleScene extends Phaser.Scene {
  private gameProgress!: GameProgress;
  private gridGraphics!: Phaser.GameObjects.Graphics;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private enemySprite!: Phaser.GameObjects.Sprite;
  private gridOffsetX: number = 0;
  private gridOffsetY: number = 0;
  
  // Store player Pokemon across rounds
  private static playerPokemonName: string = 'Pikachu';

  constructor() {
    super({ key: 'BattleScene' });
  }

  preload() {
    console.log('🔄 Loading Pokemon sprites...');
    
    // Load all 20 Pokemon sprites
    POKEMON_SPRITES.forEach(pokemon => {
      // Load static sprite as fallback
      this.load.image(
        `pokemon-${pokemon.name.toLowerCase()}`,
        pokemon.spriteUrl
      );
      
      // Try to load animated version (some might not exist for newer gens)
      if (pokemon.animatedUrl) {
        this.load.image(
          `pokemon-${pokemon.name.toLowerCase()}-animated`,
          pokemon.animatedUrl
        );
      }
    });
    
    // Show loading progress
    this.load.on('progress', (value: number) => {
      console.log(`Loading: ${Math.floor(value * 100)}%`);
    });
    
    this.load.on('complete', () => {
      console.log('✅ All sprites loaded!');
    });
  }

  create() {
    console.log('⚔️ BattleScene started');
    
    this.gameProgress = this.registry.get('gameProgress');
    
    // Round counter
    const roundText = this.add.text(
      20,
      20,
      `Round ${this.gameProgress.currentRound}`,
      {
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold',
      }
    );

    // Create the battle grid
    this.createBattleGrid();
    
    // Create Pokemon sprites on the grid
    this.createPokemonSprites();
    
    // Instructions
    const instructions = this.add.text(
      this.cameras.main.centerX,
      550,
      'Testing Sprites - Press ENTER to continue',
      {
        fontSize: '18px',
        color: '#2ecc71',
        align: 'center',
      }
    );
    instructions.setOrigin(0.5);

    // Animate instruction text
    this.tweens.add({
      targets: instructions,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Continue to rewards
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.scene.start('RewardScene');
    });
  }

  private createBattleGrid() {
    this.gridGraphics = this.add.graphics();
    
    const gridWidth = GRID.COLS * GRID.TILE_SIZE;
    const gridHeight = GRID.ROWS * GRID.TILE_SIZE;
    this.gridOffsetX = (this.cameras.main.width - gridWidth) / 2;
    this.gridOffsetY = (this.cameras.main.height - gridHeight) / 2 + 50;

    for (let row = 0; row < GRID.ROWS; row++) {
      for (let col = 0; col < GRID.COLS; col++) {
        const x = this.gridOffsetX + col * GRID.TILE_SIZE;
        const y = this.gridOffsetY + row * GRID.TILE_SIZE;
        
        let color: number;
        if (col < GRID.PLAYER_COLS) {
          color = COLORS.PLAYER_TILE;
        } else {
          color = COLORS.ENEMY_TILE;
        }
        
        this.gridGraphics.fillStyle(color, 0.5);
        this.gridGraphics.fillRect(x, y, GRID.TILE_SIZE - 2, GRID.TILE_SIZE - 2);
        
        this.gridGraphics.lineStyle(2, 0xffffff, 0.3);
        this.gridGraphics.strokeRect(x, y, GRID.TILE_SIZE - 2, GRID.TILE_SIZE - 2);
      }
    }

    console.log('✅ Battle grid created');
  }

  private createPokemonSprites() {
    // Player Pokemon (left side, middle row)
    const playerCol = 0;
    const playerRow = 1; // Middle row
    const playerX = this.gridOffsetX + (playerCol * GRID.TILE_SIZE) + (GRID.TILE_SIZE / 2);
    const playerY = this.gridOffsetY + (playerRow * GRID.TILE_SIZE) + (GRID.TILE_SIZE / 2);
    
    // Use stored player Pokemon (stays across rounds)
    const playerSpriteKey = `pokemon-${BattleScene.playerPokemonName.toLowerCase()}`;
    this.playerSprite = this.add.sprite(playerX, playerY, playerSpriteKey);
    this.playerSprite.setScale(2); // Make it bigger
    this.playerSprite.setDepth(10); // Render above grid
    
    // Add subtle idle animation
    this.tweens.add({
      targets: this.playerSprite,
      y: playerY - 5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Player label
    const playerLabel = this.add.text(
      playerX,
      playerY + 50,
      BattleScene.playerPokemonName,
      {
        fontSize: '14px',
        color: '#4a90e2',
        fontStyle: 'bold',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      }
    );
    playerLabel.setOrigin(0.5);
    playerLabel.setDepth(10);
    
    // Enemy Pokemon (right side, middle row) - random each round
    const enemyCol = 5;
    const enemyRow = 1;
    const enemyX = this.gridOffsetX + (enemyCol * GRID.TILE_SIZE) + (GRID.TILE_SIZE / 2);
    const enemyY = this.gridOffsetY + (enemyRow * GRID.TILE_SIZE) + (GRID.TILE_SIZE / 2);
    
    const enemyPokemon = getRandomPokemon();
    const enemySpriteKey = `pokemon-${enemyPokemon.name.toLowerCase()}`;
    this.enemySprite = this.add.sprite(enemyX, enemyY, enemySpriteKey);
    this.enemySprite.setScale(2);
    this.enemySprite.setDepth(10);
    this.enemySprite.setFlipX(true); // Face the player
    
    // Enemy idle animation
    this.tweens.add({
      targets: this.enemySprite,
      y: enemyY - 5,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Enemy label
    const enemyLabel = this.add.text(
      enemyX,
      enemyY + 50,
      enemyPokemon.name,
      {
        fontSize: '14px',
        color: '#e74c3c',
        fontStyle: 'bold',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      }
    );
    enemyLabel.setOrigin(0.5);
    enemyLabel.setDepth(10);
    
    console.log(`✅ Created sprites: ${BattleScene.playerPokemonName} vs ${enemyPokemon.name}`);
  }

  update(time: number, delta: number) {
    // Game loop
  }
}
