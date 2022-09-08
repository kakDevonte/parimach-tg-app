import Settings from '../data/Settings';
import LoadingBar from '../components/LoadingBar';
import player from '../../assets/images/player.png';
import enemy from '../../assets/images/enemy3.png';
import background from '../../assets/images/bg3.jpg';
import bgModal from '../../assets/images/bg-modal.png';
import buttonStart from '../../assets/images/button-battle.png';
import logo from '../../assets/images/logo.png';
import bgTimer from '../../assets/images/bg-timer.png';
import buttonTapScreen from '../../assets/images/button-tap-screen.png';
import buttonLastOne from '../../assets/images/button-last-one.png';
import buttonFinishHin from '../../assets/images/button-finish-him.png';
import impactScale from '../../assets/images/impact-scale.png';
import scaleLine from '../../assets/images/scale.png';
import buttonYouLose from '../../assets/images/button-you-lose.png';

type State = {
  tgId: string;
  name: string;
  attempts: integer;
  currentPoints: integer;
};

export default class Preload extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Preload');
  }

  public init(state: State) {
    this.state = state;
  }

  public preload(): void {
    this.add
      .sprite(0, 0, 'bgStart')
      .setOrigin(0, 0)
      .setScale(Settings.isMobile() ? 0.95 : 0.88);
    new LoadingBar(this);
    this.preloadAssets();
  }

  private preloadAssets(): void {
    this.load.spritesheet('player', player, {
      frameWidth: 1169,
      frameHeight: 1651,
    });
    this.load.spritesheet('enemy', enemy, {
      frameWidth: 1028,
      frameHeight: 1653,
    });
    this.load.image('background', background);
    this.load.image('button-tap-screen', buttonTapScreen);
    this.load.image('button-last-one', buttonLastOne);
    this.load.image('button-finish-him', buttonFinishHin);
    this.load.image('button-you-lose', buttonYouLose);
    this.load.image('bg-timer', bgTimer);
    this.load.image('scale-line', scaleLine);
    this.load.image('impact-scale', impactScale);
    this.load.image('bgModal', bgModal);
    this.load.image('buttonStart', buttonStart);
    this.load.image('logo', logo);
  }

  public create(): void {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'punch',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: 'idleEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 4 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'block',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
      frameRate: 15,
      repeat: 0,
    });

    this.scene.stop();
    this.scene.start('Start', this.state);
  }
}
