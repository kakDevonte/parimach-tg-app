export default class ImpactForce {
  private scene: Phaser.Scene;
  private bg: Phaser.GameObjects.Sprite;
  private scale: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene) {
    this.scene = scene;

    const { centerX, centerY } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite(centerX, 120, 'impact-scale')
      .setOrigin(0.5, 0.5)
      .setScale(0.7);

    this.scale = this.scene.add
      .sprite(centerX * 0.5 + 15, 50, 'scale-line')
      .setOrigin(0, -0.5)
      .setScale(0.7);

    this.scale.setVisible(false);

    this.text = this.scene.add
      .text(centerX, 190, '0', {
        fontSize: '56px',
        fontFamily: 'ParimatchBold',
      })
      .setColor('#F8FF13')
      .setOrigin(0.5);
  }

  public setScale(value: number, points: number): void {
    if (value > 100) return;

    this.scale.setVisible(true);
    this.scale.setDisplaySize(value * 3.3, 70);
    this.text.text = points + '';
  }

  public setPoints(value: number): void {
    this.text.text = value + '';
  }

  public resetScale(): void {
    this.scale.setDisplaySize(0, 70);
  }
}
