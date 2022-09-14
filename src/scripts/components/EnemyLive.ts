export default class EnemyLive {
  private scene: Phaser.Scene;
  private live: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private cropWidth: number;
  private cropHeight: number;
  private cropRect: any;

  constructor(scene) {
    this.scene = scene;
    this.cropWidth = 400;
    this.cropHeight = 400;
    const { centerX, centerY } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite(centerX + 280, 80, 'enemy-face-op')
      .setScale(0.36);
    this.live = this.scene.add
      .sprite(centerX + 280, 80, 'enemy-face')
      .setScale(0.36);
    //this.live.setCrop(this.cropRect);

    //this.live.setCrop(0, 0, this.cropWidth, this.cropHeight);

    //offset = bob.getTopLeft();
  }

  public setLives(value: number): void {
    let result = (this.cropHeight / 100) * value;
    //this.live.setCrop(this.cropRect);

    this.live.setCrop(0, 0, this.cropWidth,result);
    // console.log(result)
    // let interval = this.scene.time.addEvent({ delay: 10, callback: () => {
    //       let scale: number = 1 + 0.1;
    //       console.log(scale)
    //
    //       if (scale >= result) interval.remove(false);
    //   }, callbackScope: this.scene, loop: true });
  }
}
