import Enemy from '../components/Enemy';
import Player from './../components/Player';
import Background from '../components/Background';
import Settings from '../data/Settings';
import Timer from '../components/Timer';
import Utils from '../data/Utils';
import ImpactForce from '../components/ImpactForce';

export default class Game extends Phaser.Scene {
  readonly buttonList: string[];
  private isShowButton: boolean;
  private numberButton: number;
  private impactForce: number;

  constructor() {
    super('Game');
    this.isShowButton = true;
    this.numberButton = 0;
    this.impactForce = 0;
    this.buttonList = [
      'button-tap-screen',
      'button-finish-him',
      'button-last-one',
      'button-you-lose',
    ];
  }

  public button: Phaser.GameObjects.Sprite;
  public player: Player;
  public enemy: Enemy;
  public bg: Background;
  public impactScale: ImpactForce;
  public timer: Timer;
  private timerEvent: Phaser.Time.TimerEvent;

  public init(): void {}

  public create(): void {
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add
      .sprite(centerX, centerY, 'background')
      .setScale(Settings.isMobile() ? 1 : 0.9);

    const height = Settings.isMobile()
      ? displayHeight - 500
      : displayHeight - 300;

    this.timer = new Timer(this);
    this.impactScale = new ImpactForce(this);
    this.enemy = new Enemy({ scene: this, x: 450, y: height });
    this.player = new Player({ scene: this, x: 250, y: height });

    this.button = this.add
      .sprite(centerX, centerY, this.buttonList[this.numberButton])
      .setOrigin(0.5, 0.5);
    if (!Settings.isMobile()) {
      this.button.setScale(0.7);
    }
    Utils.clickButton(this, this.button, () => {
      this.startTimer();
      this.isShowButton = false;
      this.button.setVisible(this.isShowButton);

      if (this.numberButton == 3) {
        this.scene.stop();
        this.scene.start('Start');
      }
    });

    this.tapOnTheScreen();
  }

  public update(): void {
    if (this.timer.timeInSeconds <= 0) {
      this.timer.resetTimer();
      this.numberButton++;
      this.isShowButton = true;
      this.button.setVisible(this.isShowButton);
      this.button.setTexture(this.buttonList[this.numberButton]);
    }

    if (this.numberButton === 3) {
      console.log('Ты проиграл');
    }
  }

  public startTimer(): void {
    this.timer.resetTimer();
    console.log('Старт таймера');
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      args: [this.timer],
      callback: () => {
        this.timer.tick();
      },
      callbackScope: this,
      repeat: 4,
    });
  }

  private tapOnTheScreen(): void {
    this.input.on('pointerdown', (): void => {
      if (this.isShowButton) return;

      this.impactForce++;
      this.impactScale.setScale(this.impactForce);
    });
  }
}
