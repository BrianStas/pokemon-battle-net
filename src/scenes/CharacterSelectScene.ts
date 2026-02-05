import Phaser from 'phaser';
import { POKEMON_SPRITES } from '@/data/pokemonSprites';

export class CharacterSelectScene extends Phaser.Scene {
  private selectedIndex: number = 0;
  private pokemonIcons: Phaser.GameObjects.Sprite[] = [];
  private selectionBox!: Phaser.GameObjects.Graphics;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private confirmKey!: Phaser.Input.Keyboard.Key;
  private titleText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private previewSprite!: Phaser.GameObjects.Sprite;
  private previewNameText!: Phaser.GameObjects.Text;
  private previewIdText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'CharacterSelectScene' });
  }

  preload() {
    console.log('🔄 Loading Pokemon sprites for character select...');
    
    // Load all Pokemon sprites (both full size and icons)
    POKEMON_SPRITES.forEach(pokemon => {
      // Full sprite for preview
      this.load.image(
        `pokemon-${pokemon.name.toLowerCase()}`,
        pokemon.spriteUrl
      );
      
      // Icon sprite for grid (using smaller version from PokeAPI)
      const iconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemon.id}.png`;
      this.load.image(
        `pokemon-icon-${pokemon.name.toLowerCase()}`,
        iconUrl
      );
    });
  }

  create() {
    console.log('🎮 Character Select Scene started');
    
    // Background color
    this.cameras.main.setBackgroundColor('#1a1a2e');
    
    // Title
    this.titleText = this.add.text(
      this.cameras.main.centerX,
      40,
      'SELECT YOUR POKEMON',
      {
        fontSize: '42px',
        color: '#4a90e2',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6,
      }
    );
    this.titleText.setOrigin(0.5);
    
    // Add glowing effect to title
    this.tweens.add({
      targets: this.titleText,
      alpha: 0.8,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Create preview area background (left side)
    const previewBg = this.add.graphics();
    previewBg.fillStyle(0x2c3e50, 0.8);
    previewBg.fillRoundedRect(30, 100, 280, 400, 10);
    previewBg.lineStyle(3, 0x4a90e2, 1);
    previewBg.strokeRoundedRect(30, 100, 280, 400, 10);

    // Create grid background (right side)
    const gridBg = this.add.graphics();
    gridBg.fillStyle(0x2c3e50, 0.8);
    gridBg.fillRoundedRect(340, 100, 430, 400, 10);
    gridBg.lineStyle(3, 0x4a90e2, 1);
    gridBg.strokeRoundedRect(340, 100, 430, 400, 10);

    // Preview area label
    this.add.text(170, 110, 'PREVIEW', {
      fontSize: '16px',
      color: '#4a90e2',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Grid area label
    this.add.text(555, 110, 'CHOOSE YOUR FIGHTER', {
      fontSize: '16px',
      color: '#4a90e2',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Create grid of Pokemon icons
    this.createPokemonGrid();

    // Create selection box
    this.createSelectionBox();

    // Instructions
    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      550,
      'Arrow Keys: Navigate | SPACE/ENTER: Confirm Selection',
      {
        fontSize: '18px',
        color: '#2ecc71',
        backgroundColor: '#00000088',
        padding: { x: 10, y: 5 },
      }
    );
    this.instructionText.setOrigin(0.5);

    // Setup keyboard controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.confirmKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Initial selection
    this.updateSelection();
  }

    private createPokemonGrid() {
    const cols = 5;
    const rows = 4;
    const spacing = 80;
    const startX = 380;
    const startY = 150;

    POKEMON_SPRITES.forEach((pokemon, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = startX + col * spacing;
      const y = startY + row * spacing;

      // Create icon sprite
      const icon = this.add.sprite(
        x,
        y,
        `pokemon-icon-${pokemon.name.toLowerCase()}`
      );
      
      // Set consistent display size using displayWidth/displayHeight
      icon.setDisplaySize(48, 48); // Force all icons to be 48x48 pixels
      icon.setOrigin(0.5);
      
      this.pokemonIcons.push(icon);
    });
  }

  private createSelectionBox() {
    this.selectionBox = this.add.graphics();
    this.selectionBox.lineStyle(3, 0x2ecc71, 1);
    this.selectionBox.strokeRect(-28, -28, 56, 56); // Slightly bigger than 48x48 icons
    this.selectionBox.setDepth(100);
  }

  private updateSelection() {
    const icon = this.pokemonIcons[this.selectedIndex];
    const pokemon = POKEMON_SPRITES[this.selectedIndex];
    
    // Move selection box to current icon
    this.selectionBox.setPosition(icon.x, icon.y);
    
    // Reset all icons to normal
    this.pokemonIcons.forEach((s) => {
      s.setDisplaySize(48, 48);  // Normal size
      s.setAlpha(0.6);
    });
    
    // Highlight selected icon
    icon.setDisplaySize(52, 52);  // Slightly bigger
    icon.setAlpha(1);
    
    // Pulse animation on selected
    this.tweens.add({
      targets: icon,
      displayWidth: 56,
      displayHeight: 56,
      duration: 200,
      yoyo: true,
      ease: 'Sine.easeInOut',
    });

    // Update preview sprite (large version on left)
    if (this.previewSprite) {
      this.previewSprite.destroy();
    }
    
    this.previewSprite = this.add.sprite(
      170,           // Centered in preview box
      380,           // Lower position (was 300)
      `pokemon-${pokemon.name.toLowerCase()}`
    );
    this.previewSprite.setScale(2.5);  // Smaller scale (was 3.5)
    this.previewSprite.setFlipX(true);
    this.previewSprite.setOrigin(0.5, 1); // Bottom-center anchor
    
    // Idle bounce animation for preview
    this.tweens.add({
      targets: this.previewSprite,
      y: 370,        // Bounce range adjusted
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Update preview name text
    if (this.previewNameText) {
      this.previewNameText.destroy();
    }
    
    this.previewNameText = this.add.text(
      170,
      420,          // Below the sprite (was 350)
      pokemon.name,
      {
        fontSize: '24px',  // Slightly smaller (was 28px)
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
      }
    );
    this.previewNameText.setOrigin(0.5);

    // Update preview ID text
    if (this.previewIdText) {
      this.previewIdText.destroy();
    }
    
    this.previewIdText = this.add.text(
      170,
      450,          // Below the name (was 380)
      `#${pokemon.id.toString().padStart(3, '0')}`,
      {
        fontSize: '18px',
        color: '#95a5a6',
        fontStyle: 'bold',
      }
    );
    this.previewIdText.setOrigin(0.5);
  }

  update() {
    const cols = 5;

    // Navigation
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
      this.updateSelection();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
      this.selectedIndex = Math.min(POKEMON_SPRITES.length - 1, this.selectedIndex + 1);
      this.updateSelection();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
      this.selectedIndex = Math.max(0, this.selectedIndex - cols);
      this.updateSelection();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
      this.selectedIndex = Math.min(POKEMON_SPRITES.length - 1, this.selectedIndex + cols);
      this.updateSelection();
    }

    // Confirm selection
    if (Phaser.Input.Keyboard.JustDown(this.confirmKey) || 
        Phaser.Input.Keyboard.JustDown(this.input.keyboard!.addKey('ENTER'))) {
      this.selectPokemon();
    }
  }

  private selectPokemon() {
    const selectedPokemon = POKEMON_SPRITES[this.selectedIndex];
    console.log(`✅ Selected: ${selectedPokemon.name}`);
    
    // Flash effect
    this.cameras.main.flash(300, 46, 144, 226); // Blue flash
    
    // Store selection in registry
    this.registry.set('selectedPokemon', selectedPokemon.name);
    
    // Initialize game progress
    const initialProgress = {
      currentRound: 1,
      selectedRewards: [],
      playerPower: 1.0,
    };
    this.registry.set('gameProgress', initialProgress);
    
    // Transition to battle
    this.time.delayedCall(300, () => {
      this.scene.start('BattleScene');
    });
  }
}