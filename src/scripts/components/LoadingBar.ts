export default class LoadingBar {
  private scene: Phaser.Scene;
  private progressBar: Phaser.GameObjects.TileSprite;
  private progressScreen: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene) {
    this.scene = scene;
    const { centerX, centerY } = this.scene.cameras.main;
    this.progressScreen = this.scene.add
      .sprite(centerX, centerY + 340, 'progress-bar')
      .setOrigin(0.5, 0.5)
      .setScale(0.7);
    this.progressBar = this.scene.add
      .tileSprite(centerX, centerY + 320, 0, 100, 'bar')
      .setOrigin(0.5, 0.5);

    this.text = this.scene.add
      .text(centerX, centerY + 310, '0%', {
        fontSize: '46px',
        fontFamily: 'ParimatchThin',
        //align: 'center',
      })
      .setColor('#000000')
      .setFontStyle('bold')
      .setOrigin(0.5);

    this.setEvents();
  }

  private setEvents(): void {
    this.scene.load.on('progress', this.showProgressBar, this);
    this.scene.load.on('fileprogress', this.onFileProgress, this);
    this.scene.load.on('complete', this.onLoadComplete, this);
  }

  private showProgressBar(value: number): void {
    this.progressBar.setDisplaySize(654 * value, 100);
    this.text.text = Math.round(value * 100) + '%';
  }

  private onFileProgress(file): void {}

  private onLoadComplete(): void {
    //this.progressBar.destroy();
  }
}
