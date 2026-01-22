import Phaser from 'phaser';
import { gameConfig } from '@/config/gameConfig';

// Create the game instance
const game = new Phaser.Game(gameConfig);

// Make game instance available globally for debugging
(window as any).game = game;

console.log('🎮 Pokémon Battle Network initialized!');
console.log('📊 Game dimensions:', gameConfig.width, 'x', gameConfig.height);
