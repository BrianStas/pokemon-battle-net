import Phaser from 'phaser';
import { GameProgress } from '@/types';

export class RewardScene extends Phaser.Scene {
  private gameProgress!: GameProgress;

  constructor() {
    super({ key: 'RewardScene' });
  }

  create() {
    console.log('🎁 RewardScene started');
    
    this.gameProgress = this.registry.get('gameProgress');
    
    const title = this.add.text(
      this.cameras.main.centerX,
      80,
      'Victory!',
      {
        fontSize: '48px',
        color: '#2ecc71',
        fontStyle: 'bold',
      }
    );
    title.setOrigin(0.5);

    const message = this.add.text(
      this.cameras.main.centerX,
      150,
      `Round ${this.gameProgress.currentRound} Complete!`,
      {
        fontSize: '24px',
        color: '#ffffff',
      }
    );
    message.setOrigin(0.5);

    const rewardsText = this.add.text(
      this.cameras.main.centerX,
      250,
      'Choose a Reward:\n\n(Reward system will be implemented here)',
      {
        fontSize: '20px',
        color: '#ffffff',
        align: 'center',
      }
    );
    rewardsText.setOrigin(0.5);

    const continueText = this.add.text(
      this.cameras.main.centerX,
      450,
      'Press SPACE to continue to next round',
      {
        fontSize: '18px',
        color: '#4a90e2',
      }
    );
    continueText.setOrigin(0.5);

    this.tweens.add({
      targets: continueText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.gameProgress.currentRound += 1;
      this.registry.set('gameProgress', this.gameProgress);
      
      console.log(`🎮 Starting round ${this.gameProgress.currentRound}`);
      this.scene.start('BattleScene');
    });
  }
}
