import Settings from '../data/Settings';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(data: PlayerData) {
    super(data.scene, data.x, data.y, 'enemy', 4);

    this.init();
    this.block();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.setScale(Settings.isMobile() ? 0.4 : 0.3);
  }
  0;
  private block(): void {
    // this.scene.input.on('pointerdown', (): void => {
    //   this.anims.play('block');
    //   setTimeout(() => {
    //     this.anims.play('idleEnemy');
    //   }, 200);
    // });
  }
}

type PlayerData = {
  scene: Phaser.Scene;
  x: number;
  y: number;
};
