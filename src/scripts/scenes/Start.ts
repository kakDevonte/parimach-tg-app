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

  public create() {
    const { centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'bgModal');

    const text1Height = Settings.isMobile() ? centerY - 280 : centerY - 150;

    const text2Height = Settings.isMobile() ? centerY : centerY + 70;

    const text1 = this.add
      .text(centerX, text1Height, Settings.lang.title, {
        fontSize: Settings.isMobile() ? '56px' : '46px',
        fontFamily: 'ParimatchThin',
        align: 'center',
      })
      .setColor('#F8FF13')
      .setFontStyle('bold')
      .setOrigin(0.5);

    const text2 = this.add
      .text(centerX, text2Height, Settings.lang.direction, {
        fontSize: Settings.isMobile() ? '46px' : '36px',
        fontFamily: 'ParimatchThin',
        align: 'center',
      })
      .setColor('#ffffff')
      .setOrigin(0.5);

    const button = this.add.sprite(centerX, centerY + 370, 'buttonStart');
    const logo = this.add.sprite(centerX, 150, 'logo');
    if (!Settings.isMobile()) {
      button.setScale(0.7);
      logo.setScale(0.8);
    }

    Utils.clickButton(this, button, () => {
      this.scene.stop();
      this.scene.start('Game', this.state);
    });
  }
}
