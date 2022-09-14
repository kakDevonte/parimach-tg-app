export default class ImpactForce {
  private scene: Phaser.Scene;
  private bg: Phaser.GameObjects.Sprite;
  private scale: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private rect: any;
  private circle: any;

  constructor(scene) {
    this.scene = scene;

    const { centerX, centerY } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite(centerX, 120, 'impact-scale')
      .setOrigin(0.5, 0.5)
      .setScale(0.7);

    // @ts-ignore
    this.rect = this.scene.add.rexRoundRectangle(centerX * 0.5 + 15, 50, 0, 70, 0, 0xf8ff13).setOrigin(0, -0.5);
    this.circle = this.scene.add.circle(centerX * 0.5 + 15, 120, 0, 0xf8ff13).setOrigin(0, 0.5);
    this.rect.setVisible(false);

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
    if(value * 1.6 <= 35) {
      this.circle.setRadius(value * 1.6);
    } else {
      this.rect.setVisible(true);
    }
    if(value * 1.6 <= 35) {
     this.rect.setRadius(value * 1.6);
    }
     this.rect.setSize(value * 3.3, 70);
    this.text.text = points + ' ';
  }

  public setPoints(value: number): void {
    this.text.text = value + ' ';
  }

  public resetScale(): void {
    this.rect.setVisible(false);
    this.circle.setRadius(0);
  }
}
