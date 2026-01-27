import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Loading Pokémon Battle Network...',
      {
        fontSize: '24px',
        color: '#ffffff',
      }
    );
    loadingText.setOrigin(0.5);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x4a90e2, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    for (let i = 0; i < 10; i++) {
      this.load.image(`dummy${i}`, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
    }
  }

  create() {
    console.log('✅ BootScene: Assets loaded');
    
    const initialProgress = {
      currentRound: 1,
      selectedRewards: [],
      playerPower: 1.0,
    };
    
    this.showTitleScreen();
  }

  private showTitleScreen() {
    const title = this.add.text(
      this.cameras.main.centerX,
      200,
      'POKÉMON\nBATTLE NETWORK',
      {
        fontSize: '48px',
        color: '#4a90e2',
        fontStyle: 'bold',
        align: 'center',
      }
    );
    title.setOrigin(0.5);

    const subtitle = this.add.text(
      this.cameras.main.centerX,
      320,
      'A Grid-Based Battle Game',
      {
        fontSize: '20px',
        color: '#ffffff',
      }
    );
    subtitle.setOrigin(0.5);

    const startText = this.add.text(
      this.cameras.main.centerX,
      420,
      'Press SPACE to Start',
      {
        fontSize: '24px',
        color: '#2ecc71',
      }
    );
    startText.setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    const instructions = this.add.text(
      this.cameras.main.centerX,
      520,
      'Arrow Keys: Move | Z: Select Move | X: Cancel',
      {
        fontSize: '16px',
        color: '#95a5a6',
      }
    );
    instructions.setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      console.log('🎮 Going to character select!');
      this.scene.start('CharacterSelectScene'); // Changed from 'BattleScene'
    });
  }
}
