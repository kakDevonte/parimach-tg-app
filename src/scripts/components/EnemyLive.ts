export default class EnemyLive {
  private scene: Phaser.Scene;
  private live: Phaser.GameObjects.Sprite;
  private live2: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private cropWidth: number;
  private cropHeight: number;

  constructor(scene) {
    this.scene = scene;
    this.cropWidth = 400;
    this.cropHeight = 400;
    const { centerX, centerY, height, width } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite(centerX + 280, 80, 'enemy-face-op')
      .setScale(0.36);
    this.live = this.scene.add
      .sprite(centerX + 280, 80, 'enemy-face')
      .setScale(0.36);

    this.live2 = this.scene.add
      .sprite(centerX + 280, 80, 'enemy-face')
      .setScale(0.36);

    this.live2.setVisible(false);
  }

  public setLives(value: number): void {
    this.live2.setVisible(true);
    this.scene.tweens.add({
      targets: this.live2,
      alpha: 0,
      delay: 100,
      duration: 200,
      yoyo: true,
      loop: 2,
      onComplete: () => {
        this.live2.setVisible(false);
      }
    });

    let result = (this.cropHeight / 100) * value;
    this.live.setCrop(0, 0, this.cropWidth,result);
  }
}
