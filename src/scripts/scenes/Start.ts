import Settings from '../data/Settings';
import Utils from '../data/Utils';

type State = {
  tgId: string;
  name: string;
  attempts: integer;
  currentPoints: integer;
};

export default class Start extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Start');
  }

  public init(state: State) {
    this.state = state;
  }

  public preload() {
    this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);

  }

  public create() {
    const { centerX, centerY, height } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'bgModal').setScale(1.1);

    const textStyle = {
      fontSize: Settings.isMobile() ? '48px' : '36px',
          fontFamily: 'ParimatchThin',
        align: 'center',
    }

    const text1Height = Settings.isMobile() ? centerY - 280 : centerY - 150;

    const text2Height = Settings.isMobile() ? centerY : centerY + 70;

    const logo = this.add.sprite(centerX, 100, 'logo').setScale(Settings.isMobile() ? 0.7 : 0.6);

    const text1 = this.add
      .text(centerX, centerY / 2, Settings.lang.title, textStyle)
      .setColor('#F8FF13')
      .setFontStyle('bold')
      .setOrigin(0.5);

    console.log(text1.height)

    const text2 = this.add
      .text(centerX, text1.y + text1.height * 1.7, Settings.lang.direction, {
        fontSize: Settings.isMobile() ? '46px' : '36px',
        fontFamily: 'ParimatchThin',
        align: 'center',
      })
      .setColor('#ffffff')
      .setOrigin(0.5);

    const text3 = this.add
      .text(centerX, text2.y + text2.height, Settings.lang.direction2, {
        fontSize: Settings.isMobile() ? '46px' : '36px',
        fontFamily: 'ParimatchThin',
        align: 'center',
      })
      .setColor('#ffffff')
      .setOrigin(0.5);

    console.log(text2.height)

    const button = this.add.sprite(centerX, height - text3.height, 'buttonStart').setScale(Settings.isMobile() ? 0.6 : 0.5);


    Utils.clickButton(this, button, () => {
      this.scene.stop();
      this.scene.start('Game', this.state);
    });
  }
}
