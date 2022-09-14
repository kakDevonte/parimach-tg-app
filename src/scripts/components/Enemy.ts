import Settings from '../data/Settings';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public animArray: string[];
  private health: number;
  constructor(data: PlayerData) {
    super(data.scene, data.x, data.y, 'enemy', 4);
    this.animArray = [
      'block-2',
      'block-3',
      'block-4',
      'block-1',
      'block-2',
      'block-3',
      'block-4',
      'block-1',
      'block-2',
      'block-3',
    ];
    this.health = 100;
    this.init();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.setScale(Settings.isMobile() ? 0.43 : 0.34);
    this.anims.play('idleEnemy');
  }

  public block(force: number): void {
    this.health -= force;
    const punchCount = Math.floor(force / 10);

    if (punchCount === 0) return;

    if (this.anims.getName() === 'idleEnemy') {
      this.anims.playAfterRepeat('block-1');
      if(this.health <= 0) {
        this.chain(this.animArray.slice(0, punchCount - 1)).chain('fall-enemy');
      } else {
        this.chain(this.animArray.slice(0, punchCount - 1)).chain('idleEnemy');
      }
    }
  }
}

type PlayerData = {
  scene: Phaser.Scene;
  x: number;
  y: number;
};
