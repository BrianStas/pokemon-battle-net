import Phaser from 'phaser';
import { GAME } from '@/utils/constants';
import { BootScene } from '@/scenes/BootScene';
import { BattleScene } from '@/scenes/BattleScene';
import { RewardScene } from '@/scenes/RewardScene';
import { CharacterSelectScene } from '@/scenes/CharacterSelectScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME.WIDTH,
  height: GAME.HEIGHT,
  backgroundColor: GAME.BACKGROUND_COLOR,
  scene: [BootScene, CharacterSelectScene, BattleScene, RewardScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  roundPixels: true,
};
