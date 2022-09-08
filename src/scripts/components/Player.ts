import Settings from '../data/Settings';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(data: PlayerData) {
    super(data.scene, data.x, data.y, 'player', 0);

    this.init();
    this.punch();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.setScale(Settings.isMobile() ? 0.4 : 0.3);
  }

  private punch(): void {
    // this.scene.input.on('pointerdown', (): void => {
    //   this.anims.play('punch');
    //   setTimeout(() => {
    //     this.anims.play('idle');
    //   }, 100);
    // });
  }
}

type PlayerData = {
  scene: Phaser.Scene;
  x: number;
  y: number;
};
