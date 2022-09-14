export default class Lives {
  private scene: Phaser.Scene;
  private live1: Phaser.GameObjects.Sprite;
  private live2: Phaser.GameObjects.Sprite;
  private live3: Phaser.GameObjects.Sprite;
  private lives: Phaser.GameObjects.Sprite[];
  private tween: Phaser.Tweens.Tween;
  constructor(scene) {
    this.lives = [];
    this.scene = scene;
    const { centerX, centerY } = this.scene.cameras.main;

    this.scene.add.sprite(centerX - 115, 60, 'empty-live').setScale(0.65);
    this.scene.add.sprite(centerX - 3, 60, 'empty-live').setScale(0.65);
    this.scene.add.sprite(centerX + 110, 60, 'empty-live').setScale(0.65);

    this.live1 = this.scene.add
      .sprite(centerX - 115, 60, 'live')
      .setScale(0.65);
    this.live2 = this.scene.add.sprite(centerX - 3, 60, 'live').setScale(0.65);
    this.live3 = this.scene.add
      .sprite(centerX + 110, 60, 'live')
      .setScale(0.65);

    this.lives.push(this.live3);
    this.lives.push(this.live2);
    this.lives.push(this.live1);
  }

  public setLive(value: number): void {

    this.tween = this.scene.tweens.add({
      targets: this.lives[value],
      alpha: 0.1,
      delay: 100,
      duration: 1000
    });
    // for (let i = 0; i < value; i++) {
    //   this.lives[i].setVisible(false);
    // }
  }
}
