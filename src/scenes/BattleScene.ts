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
    
    // Calculate grid dimensions with perspective
    const gridWidth = GRID.COLS * GRID.TILE_WIDTH;
    const gridHeight = GRID.ROWS * GRID.TILE_HEIGHT + GRID.TILE_DEPTH; // Only one depth for bottom
    
    // Center the grid
    this.gridOffsetX = (this.cameras.main.width - gridWidth) / 2;
    this.gridOffsetY = (this.cameras.main.height - gridHeight) / 2 + 30;

    // Draw tiles with isometric perspective (like MMBN)
    for (let row = 0; row < GRID.ROWS; row++) {
      for (let col = 0; col < GRID.COLS; col++) {
        // Calculate position - NO DEPTH between rows, only at bottom
        const x = this.gridOffsetX + col * GRID.TILE_WIDTH;
        const y = this.gridOffsetY + row * GRID.TILE_HEIGHT;
        
        // Determine tile color based on ownership
        let color: number;
        let borderColor: number;
        if (col < GRID.PLAYER_COLS) {
          color = COLORS.PLAYER_TILE;
          borderColor = 0x6ab0f5; // Lighter blue border
        } else {
          color = COLORS.ENEMY_TILE;
          borderColor = 0xf57c7c; // Lighter red border
        }
        
        // Draw the main tile face (top surface)
        this.gridGraphics.fillStyle(color, 0.7);
        this.gridGraphics.fillRect(
          x + 2, 
          y + 2, 
          GRID.TILE_WIDTH - 4, 
          GRID.TILE_HEIGHT - 4
        );
        
        // Only draw depth for BOTTOM ROW (row 2)
        if (row === GRID.ROWS - 1) {
          // Draw depth/shadow (right edge for perspective)
          this.gridGraphics.fillStyle(color, 0.4);
          this.gridGraphics.beginPath();
          this.gridGraphics.moveTo(x + GRID.TILE_WIDTH - 2, y + 2);
          this.gridGraphics.lineTo(x + GRID.TILE_WIDTH - 2, y + GRID.TILE_HEIGHT - 2);
          this.gridGraphics.lineTo(x + GRID.TILE_WIDTH - 2, y + GRID.TILE_HEIGHT + GRID.TILE_DEPTH - 2);
          this.gridGraphics.lineTo(x + GRID.TILE_WIDTH - 2, y + GRID.TILE_DEPTH + 2);
          this.gridGraphics.closePath();
          this.gridGraphics.fillPath();
          
          // Draw depth/shadow (bottom edge for perspective)
          this.gridGraphics.fillStyle(color, 0.3);
          this.gridGraphics.beginPath();
          this.gridGraphics.moveTo(x + 2, y + GRID.TILE_HEIGHT - 2);
          this.gridGraphics.lineTo(x + GRID.TILE_WIDTH - 2, y + GRID.TILE_HEIGHT - 2);
          this.gridGraphics.lineTo(x + GRID.TILE_WIDTH - 2, y + GRID.TILE_HEIGHT + GRID.TILE_DEPTH - 2);
          this.gridGraphics.lineTo(x + 2, y + GRID.TILE_HEIGHT + GRID.TILE_DEPTH - 2);
          this.gridGraphics.closePath();
          this.gridGraphics.fillPath();
        }
        
        // Draw tile border (top surface outline)
        this.gridGraphics.lineStyle(2, borderColor, 0.8);
        this.gridGraphics.strokeRect(
          x + 2, 
          y + 2, 
          GRID.TILE_WIDTH - 4, 
          GRID.TILE_HEIGHT - 4
        );
      }
    }

    console.log('✅ Isometric battle grid created (MMBN style - depth only on bottom row)');
  }

  private createPokemonSprites() {
    // Player Pokemon (left side, middle row)
    const playerCol = 0;
    const playerRow = 1; // Middle row
    
    // Calculate position (no depth between rows now)
    const playerX = this.gridOffsetX + (playerCol * GRID.TILE_WIDTH) + (GRID.TILE_WIDTH / 2);
    const playerY = this.gridOffsetY + (playerRow * GRID.TILE_HEIGHT) + GRID.TILE_HEIGHT + 20;
    
    // Use stored player Pokemon (stays across rounds)
    const playerSpriteKey = `pokemon-${BattleScene.playerPokemonName.toLowerCase()}`;
    this.playerSprite = this.add.sprite(playerX, playerY, playerSpriteKey);
    
    // Scale down to 75% of previous (was 2.5, now 1.875)
    this.playerSprite.setScale(1.6);
    // Player faces RIGHT - DON'T flip (default orientation faces right)
    this.playerSprite.setFlipX(true);
    this.playerSprite.setDepth(10 + playerRow);
    this.playerSprite.setOrigin(0.5, 1); // Bottom-center anchor
    
    // Add subtle idle animation
    this.tweens.add({
      targets: this.playerSprite,
      y: playerY - 8,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Player label
    const playerLabel = this.add.text(
      playerX,
      playerY + 10,
      BattleScene.playerPokemonName,
      {
        fontSize: '12px',
        color: '#4a90e2',
        fontStyle: 'bold',
        backgroundColor: '#00000099',
        padding: { x: 5, y: 2 },
      }
    );
    playerLabel.setOrigin(0.5);
    playerLabel.setDepth(20);
    
    // Enemy Pokemon (right side, middle row)
    const enemyCol = 5;
    const enemyRow = 1;
    
    const enemyX = this.gridOffsetX + (enemyCol * GRID.TILE_WIDTH) + (GRID.TILE_WIDTH / 2);
    const enemyY = this.gridOffsetY + (enemyRow * GRID.TILE_HEIGHT) + GRID.TILE_HEIGHT - 3;
    
    const enemyPokemon = getRandomPokemon();
    const enemySpriteKey = `pokemon-${enemyPokemon.name.toLowerCase()}`;
    this.enemySprite = this.add.sprite(enemyX, enemyY, enemySpriteKey);
    
    // Scale down to 75%
    this.enemySprite.setScale(1.6);
    // Enemy faces LEFT - FLIP to mirror
    this.enemySprite.setFlipX(false);
    this.enemySprite.setDepth(10 + enemyRow);
    this.enemySprite.setOrigin(0.5, 1);
    
    // Enemy idle animation
    this.tweens.add({
      targets: this.enemySprite,
      y: enemyY - 8,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Enemy label
    const enemyLabel = this.add.text(
      enemyX,
      enemyY + 10,
      enemyPokemon.name,
      {
        fontSize: '12px',
        color: '#e74c3c',
        fontStyle: 'bold',
        backgroundColor: '#00000099',
        padding: { x: 5, y: 2 },
      }
    );
    enemyLabel.setOrigin(0.5);
    enemyLabel.setDepth(20);
    
    console.log(`✅ Sprites facing each other: ${BattleScene.playerPokemonName} → ← ${enemyPokemon.name}`);
  }

  update(time: number, delta: number) {
    // Game loop
  }
}
