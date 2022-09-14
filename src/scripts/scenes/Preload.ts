import Settings from '../data/Settings';
import LoadingBar from '../components/LoadingBar';
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
import hit from '../../assets/images/punch.png';
import player from '../../assets/images/player/player.png';
import bgBlack from '../../assets/images/bg-black.png';
import life from '../../assets/images/life.png';
import emptyLife from '../../assets/images/empty-life.png';
import enemyFace from '../../assets/images/enemyFace.png';
import enemyFaceOp from '../../assets/images/enemyFaceOpacity.png';
import fallEnemy from '../../assets/images/fall-enemy3.png';
import youWin from '../../assets/images/you-win.png';
import btnContent from '../../assets/images/btn-contest.png';
import btnGameNow from '../../assets/images/btn-game-now.png';
import youLose from '../../assets/images/you-lose.png';

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
      frameWidth: 1796,
      frameHeight: 2220,
    });
    this.load.spritesheet('enemy', enemy, {
      frameWidth: 1028,
      frameHeight: 1653,
    });
    this.load.spritesheet('fall-enemy-sprite', fallEnemy, {
      frameWidth: 1698,
      frameHeight: 1653,
    });
    this.load.image('background', background);
    this.load.image('button-tap-screen', buttonTapScreen);
    this.load.image('button-last-one', buttonLastOne);
    this.load.image('button-finish-him', buttonFinishHin);
    this.load.image('button-you-lose', buttonYouLose);
    this.load.image('bg-timer', bgTimer);
    this.load.image('bg-black', bgBlack);
    this.load.image('scale-line', scaleLine);
    this.load.image('impact-scale', impactScale);
    this.load.image('bgModal', bgModal);
    this.load.image('buttonStart', buttonStart);
    this.load.image('logo', logo);
    this.load.image('live', life);
    this.load.image('empty-live', emptyLife);
    this.load.image('hit', hit);
    this.load.image('enemy-face', enemyFace);
    this.load.image('enemy-face-op', enemyFaceOp);
    this.load.image('you-win', youWin);
    this.load.image('btn-content', btnContent);
    this.load.image('btn-game-now', btnGameNow);
    this.load.image('you-lose', youLose);
  }

  public create(): void {
    this.createAnimations('player', 'idle', [0, 0], -1);
    this.createAnimations('player', 'punch', [1, 2, 3], 0);
    this.createAnimations('player', 'punch-1', [1, 0], 0);
    this.createAnimations('player', 'punch-2', [2, 2], 0);
    this.createAnimations('player', 'punch-3', [3, 0], 0);

    this.createAnimations('enemy', 'idleEnemy', [4, 4], -1);
    this.createAnimations('enemy', 'block-1', [0, 4], 0);
    this.createAnimations('enemy', 'block-2', [1, 4], 0);
    this.createAnimations('enemy', 'block-3', [2, 4], 0);
    this.createAnimations('enemy', 'block-4', [3, 4], 0);
    this.createAnimations('fall-enemy-sprite', 'fall-enemy', [0, 1, 2], 0, 8);

    this.scene.stop();
    this.scene.start('Start', this.state);
  }

  private createAnimations(
    type: string,
    key: string,
    frames: number[],
    repeat: number,
    frameRate: number = 11
  ): void {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(type, { frames }),
      frameRate: 11,
      repeat,
    });
  }
}
