import Phaser from 'phaser';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  private damage: number;

  constructor(scene: Phaser.Scene, x: number, y: number, damage: number = 10) {
    super(scene, x, y, 'projectile');
    
    this.damage = damage;
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Configure physics
    this.setScale(1);
    this.setDepth(50); // Render above sprites
  }

  getDamage(): number {
    return this.damage;
  }

  fire(velocityX: number, velocityY: number) {
    this.setVelocity(velocityX, velocityY);
  }
}