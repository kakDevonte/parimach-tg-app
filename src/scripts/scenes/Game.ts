import Enemy from '../components/Enemy';
import Player from './../components/Player';
import Background from '../components/Background';
import Settings from '../data/Settings';
import Timer from '../components/Timer';
import User from '../data/User';
import ImpactForce from '../components/ImpactForce';
import Lives from '../components/Lives';
import EnemyLive from '../components/EnemyLive';

export default class Game extends Phaser.Scene {
  readonly buttonList: string[];
  private isShowButton: boolean;
  private isWin: boolean;
  private numberButton: number;
  private impactForce: number;
  private points: number;
  private pause: boolean;
  private enemyHealth: number;
  private playerLives: number;

  constructor() {
    super('Game');
    this.buttonList = [
      'button-tap-screen',
      'button-finish-him',
      'button-last-one',
      'button-you-lose',
      'you-win',
    ];
    this.init();
  }

  public button: Phaser.GameObjects.Sprite;
  public player: Player;
  public enemy: Enemy;
  public lives: Lives;
  public bg: Background;
  public enemyLive: EnemyLive;
  public bgBlack: Phaser.GameObjects.Sprite;
  public impactScale: ImpactForce;
  public timer: Timer;
  private timerEvent: Phaser.Time.TimerEvent;
  private tween: Phaser.Tweens.Tween;

  public init(): void {
    this.isWin = false;
    this.pause = false;
    this.isShowButton = true;
    this.points = 0;
    this.numberButton = 0;
    this.impactForce = 0;
    this.enemyHealth = 100;
    this.playerLives = -1;
  }

  public create(): void {
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add
      .sprite(centerX, centerY, 'background')
      .setScale(Settings.isMobile() ? 1 : 0.9);

    const height = Settings.isMobile()
      ? displayHeight - 520
      : displayHeight - 300;

    this.timer = new Timer(this);
    this.impactScale = new ImpactForce(this);
    this.lives = new Lives(this);
    this.enemyLive = new EnemyLive(this);
    this.enemy = new Enemy({ scene: this, x: 490, y: height });
    this.player = new Player({ scene: this, x: 280, y: height - 30 });

    this.bgBlack = this.add
      .sprite(centerX, centerY, 'bg-black')
      .setAlpha(0.8)
      .setVisible(this.isShowButton);

    this.button = this.add
      .sprite(centerX, centerY, this.buttonList[this.numberButton])
      .setOrigin(0.5, 0.5)
      .setScale(Settings.isMobile() ? 0.8 : 0.6);

    this.tween = this.tweens.add({
      targets: this.button,
      scale: Settings.isMobile() ? 0.6 : 0.4,
      loop: -1,
      yoyo: true,
      duration: 700,
      ease: 'Sine.easeInOut'
    });


    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.buttonPause();
      },
    });

    this.tapOnTheScreen();
   // this.animateMainMenuButtons();
  }

  public update(): void {
    if (this.pause) return;

    if (this.timer.timeInSeconds <= 0) {
      this.pause = true;
      this.player.punch(this.impactForce);
      this.enemy.block(this.impactForce);
      this.addingPoints();
      this.impactScale.resetScale();
      this.playerLives++;

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.pause = false;
          this.resetRound();
        },
      });
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
      if (this.isWin) return;
      if (this.timer.timeInSeconds <= 0) return;
      this.impactForce++;
      this.points++;
      this.enemyHealth--;

      this.impactScale.setScale(this.impactForce, this.points);
    });
  }

  private addingPoints(): void {
    const punchCount = Math.floor(this.impactForce / 10);
    this.points += punchCount * 3;
    this.impactScale.setScale(0, this.points);
  }

  private resetRound(): void {
    this.timer.resetTimer();
    this.numberButton++;
    if(this.enemyHealth <= 0) {
      this.numberButton = 4;
    }

    this.isShowButton = true;
    this.button.setVisible(this.isShowButton);
    this.bgBlack.setVisible(this.isShowButton);
    this.button.setTexture(this.buttonList[this.numberButton]);
    this.impactForce = 0;


    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.numberButton === 4) {
          if(this.playerLives === 3) {
            this.points *= 3;
            this.impactScale.setPoints(this.points)
          }if(this.playerLives === 2) {
            this.points *= 2;
            this.impactScale.setPoints(this.points)
          }
          User.setIsWin(true);
          this.scene.stop();
          this.scene.start('End');
        }
        else if (this.numberButton === 3) {
          User.setIsWin(false);
          this.scene.stop();
          this.scene.start('End');
        } else {
          this.buttonPause();
        }
      },
    });
  }

  private buttonPause(): void {
      this.startTimer();
      this.isShowButton = false;
      this.button.setVisible(this.isShowButton);
      this.bgBlack.setVisible(this.isShowButton);

      if (this.numberButton !== 0) {
        this.lives.setLive(this.playerLives);
        this.enemyLive.setLives(this.enemyHealth);
      }
  }
}
