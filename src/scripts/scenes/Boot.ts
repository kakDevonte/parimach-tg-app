import * as Webfont from '../libs/Webfonts.js';
import progressBar from '../../assets/images/preload-screen.png';
import bgStart from '../../assets/images/bg-start.png';
import bar from '../../assets/images/bar.png';

export default class Boot extends Phaser.Scene {
  private fontsReady: boolean;

  constructor() {
    super('Boot');
  }

  public init(): void {
    Webfont.load({
      custom: { families: ['ParimatchThin', 'ParimatchBold'] },
      active: () => {
        this.fontsReady = true;
      },
    });
  }

  public preload(): void {
    this.load.image('progress-bar', progressBar);
    this.load.image('bgStart', bgStart);
    this.load.image('bar', bar);
  }

  public create(): void {}
  public update(): void {
    if (!this.fontsReady) return;
    this.scene.stop();
    this.scene.start('Preload');
  }
}
