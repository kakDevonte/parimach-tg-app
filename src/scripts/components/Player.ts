import Settings from '../data/Settings';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public animArray: string[];

  constructor(data: PlayerData) {
    super(data.scene, data.x, data.y, 'player', 0);
    this.animArray = [
      'punch-1',
      'punch-2',
      'punch-1',
      'punch-2',
      'punch-3',
      'punch-1',
      'punch-2',
      'punch-3',
      'punch-1',
      'punch-2',
    ];
    this.init();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.setScale(Settings.isMobile() ? 0.35 : 0.27);
    this.anims.play('idle');
  }

  public punch(force: number): void {
    const punchCount = Math.floor(force / 10);

    if (punchCount === 0) return;

    if (this.anims.getName() === 'idle') {
      this.anims.playAfterRepeat('punch-1');
      this.chain(this.animArray.slice(0, punchCount - 1)).chain('idle');
    }
  }
}

type PlayerData = {
  scene: Phaser.Scene;
  x: number;
  y: number;
};
