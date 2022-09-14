export default class Timer {
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;
  private bg: Phaser.GameObjects.Sprite;
  public timeInSeconds: number;

  constructor(scene) {
    this.scene = scene;
    this.timeInSeconds = 5;

    const { centerX, centerY } = this.scene.cameras.main;
    this.bg = this.scene.add
      .sprite(20, 20, 'bg-timer')
      .setOrigin(0, 0)
      .setScale(0.8);

    this.text = this.scene.add
      .text(65, 30, this.timeInSeconds.toString(), {
        fontSize: '100px',
        fontFamily: 'ParimatchBold',
      })
      .setColor('#F8FF13')
      //.setFontStyle()
      .setOrigin(0, 0);
  }

  public tick(): void {
    this.timeInSeconds--;
    this.text.text = this.timeInSeconds + ' ';
  }

  public resetTimer(): void {
    this.timeInSeconds = 5;
    this.text.text = this.timeInSeconds + ' ';
  }
}
