import Phaser from 'phaser';
import { GRID, COLORS, MOVEMENT } from '@/utils/constants';
import { GameProgress } from '@/types';
import { POKEMON_SPRITES, getRandomPokemon } from '@/data/pokemonSprites';

export class BattleScene extends Phaser.Scene {
  private gameProgress!: GameProgress;
  private gridGraphics!: Phaser.GameObjects.Graphics;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private enemySprite!: Phaser.GameObjects.Sprite;
  private gridOffsetX: number = 0;
  private gridOffsetY: number = 0;
  
  private playerGridX: number = 0;
  private playerGridY: number = 1;
  private enemyGridX: number = 5;
  private enemyGridY: number = 1;
  private isPlayerMoving: boolean = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerIdleTween!: Phaser.Tweens.Tween;
  
  // Store player Pokemon across rounds
  private static playerPokemonName: string = '';

  constructor() {
    super({ key: 'BattleScene' });
  }

  preload() {
    console.log('🔄 Loading Pokemon sprites...');
    
    POKEMON_SPRITES.forEach(pokemon => {
      // Load static sprite as fallback
      this.load.image(
        `pokemon-${pokemon.name.toLowerCase()}`,
        pokemon.spriteUrl
      );
      
      // Try to load animated version
      if (pokemon.animatedUrl) {
        this.load.image(
          `pokemon-${pokemon.name.toLowerCase()}-animated`,
          pokemon.animatedUrl
        );
      }
    });
    
    this.load.on('progress', (value: number) => {
      console.log(`Loading: ${Math.floor(value * 100)}%`);
    });
    
    this.load.on('complete', () => {
      console.log('✅ All sprites loaded!');
    });
  }

  create() {
    console.log('⚔️ BattleScene started');
    
    // Get selected Pokemon from character select
    const selectedPokemon = this.registry.get('selectedPokemon');
    if (selectedPokemon) {
      BattleScene.playerPokemonName = selectedPokemon;
    } else {
      // Fallback if somehow no selection was made
      BattleScene.playerPokemonName = 'Pikachu';
    }
    
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

    this.createBattleGrid();
    
    this.createPokemonSprites();
    
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // Update instructions text
    const instructions = this.add.text(
      this.cameras.main.centerX,
      550,
      'Arrow Keys: Move | ENTER: Next Round',
      {
        fontSize: '18px',
        color: '#2ecc71',
        align: 'center',
      }
    );
    instructions.setOrigin(0.5);
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

        //LAST TIME
      
        
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

  // ✨ HELPER METHOD: Converts grid coordinates to pixel coordinates
  private getPixelPosition(gridX: number, gridY: number): { x: number; y: number } {
    return {
      x: this.gridOffsetX + (gridX * GRID.TILE_WIDTH) + (GRID.TILE_WIDTH / 2),
      y: this.gridOffsetY + (gridY * GRID.TILE_HEIGHT) + (GRID.TILE_HEIGHT + 30)
    };
  }

  private createPokemonSprites() {
    // Initialize player grid position
    this.playerGridX = 0;
    this.playerGridY = 1;
    
    // Use helper method to get pixel position
    const { x: playerX, y: playerY } = this.getPixelPosition(this.playerGridX, this.playerGridY);
    
    // Use stored player Pokemon (stays across rounds)
    const playerSpriteKey = `pokemon-${BattleScene.playerPokemonName.toLowerCase()}`;
    this.playerSprite = this.add.sprite(playerX, playerY, playerSpriteKey);
    
    // Scale and flip - Player faces RIGHT
    this.playerSprite.setScale(1.875);
    this.playerSprite.setFlipX(true); // Player flipped to face right
    this.playerSprite.setDepth(10 + this.playerGridY);
    this.playerSprite.setOrigin(0.5, 1);
    
    // Add subtle idle animation (store reference so we can restart it)
    this.playerIdleTween = this.tweens.add({
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
      playerY + 5,
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
    
    // Store label as a property so we can move it with the sprite
    (this.playerSprite as any).nameLabel = playerLabel;
    
    // Initialize enemy grid position
    this.enemyGridX = 5;
    this.enemyGridY = 1;
    
    // Use helper method to get pixel position
    const { x: enemyX, y: enemyY } = this.getPixelPosition(this.enemyGridX, this.enemyGridY);
    
    const enemyPokemon = getRandomPokemon();
    const enemySpriteKey = `pokemon-${enemyPokemon.name.toLowerCase()}`;
    this.enemySprite = this.add.sprite(enemyX, enemyY, enemySpriteKey);
    
    // Scale and flip - Enemy faces LEFT
    this.enemySprite.setScale(1.875);
    this.enemySprite.setFlipX(false); // Enemy NOT flipped to face left
    this.enemySprite.setDepth(10 + this.enemyGridY);
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
      enemyY + 5,
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
    
    // Store label with sprite
    (this.enemySprite as any).nameLabel = enemyLabel;
    
    console.log(`✅ Sprites facing each other: ${BattleScene.playerPokemonName} → ← ${enemyPokemon.name}`);
  }

  private movePlayer(deltaX: number, deltaY: number) {
    if (this.isPlayerMoving) return; // Don't move if already moving
    
    const newGridX = this.playerGridX + deltaX;
    const newGridY = this.playerGridY + deltaY;
    
    // Check boundaries - player can only move in their 3x3 area
    if (newGridX < MOVEMENT.PLAYER_MIN_COL || newGridX > MOVEMENT.PLAYER_MAX_COL) return;
    if (newGridY < MOVEMENT.MIN_ROW || newGridY > MOVEMENT.MAX_ROW) return;
    
    // Valid move - update position
    this.playerGridX = newGridX;
    this.playerGridY = newGridY;
    this.isPlayerMoving = true;
    
    // STOP the idle animation while moving
    this.playerIdleTween.stop();
    
    // Use helper method to get new pixel position
    const { x: newX, y: newY } = this.getPixelPosition(this.playerGridX, this.playerGridY);
    
    // Animate movement
    this.tweens.add({
      targets: this.playerSprite,
      x: newX,
      y: newY,
      duration: MOVEMENT.SPEED,
      ease: 'Power2',
      onComplete: () => {
        this.isPlayerMoving = false;
        // Update depth based on row (front row = higher depth)
        this.playerSprite.setDepth(10 + this.playerGridY);
        
        // RESTART the idle animation at the new position
        this.playerIdleTween = this.tweens.add({
          targets: this.playerSprite,
          y: newY - 8,
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      }
    });
    
    // Move the name label with the sprite
    const label = (this.playerSprite as any).nameLabel;
    if (label) {
      this.tweens.add({
        targets: label,
        x: newX,
        y: newY + 5,
        duration: MOVEMENT.SPEED,
        ease: 'Power2',
      });
    }
    
    console.log(`Player moved to (${this.playerGridX}, ${this.playerGridY})`);
  }

  update(time: number, delta: number) {
    // Handle player movement input
    if (!this.isPlayerMoving) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
        this.movePlayer(-1, 0);
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
        this.movePlayer(1, 0);
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
        this.movePlayer(0, -1);
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
        this.movePlayer(0, 1);
      }
    }
    
    // Press ENTER to go to next round
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard!.addKey('ENTER'))) {
      this.scene.start('RewardScene');
    }
  }
}