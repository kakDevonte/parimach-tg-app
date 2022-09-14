import Settings from '../data/Settings';
import Utils from '../data/Utils';
import User from '../data/User';

type State = {
    tgId: string;
    name: string;
    attempts: integer;
    currentPoints: integer;
};

export default class End extends Phaser.Scene {
    public state: State;

    constructor() {
        super('End');
    }

    public init(state: State) {
        this.state = state;
    }

    public create() {
        const isWin = User.getIsWin();

        const { centerX, centerY, height } = this.cameras.main;
        this.add.sprite(centerX, centerY, 'bgModal').setScale(1.1);


        const textStyle = {
            fontSize: Settings.isMobile() ? '42px' : '28px',
            fontFamily: 'ParimatchThin',
        };

        const logo = this.add.sprite(centerX, 100, 'logo').setScale(Settings.isMobile() ? 0.6 : 0.5);

        const type = this.add.sprite(centerX, logo.y + centerY / 2, isWin ? 'you-win' : 'you-lose')
            .setScale(Settings.isMobile() ? 0.7 : 0.5);

        if (isWin) {
            const text1 = this.add
                .text(centerX, type.y + type.height / 3 + 50, Settings.lang.trilogy, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text2 = this.add
                .text(centerX, text1.y + text1.height, Settings.lang.incredible, textStyle)
                .setFontStyle('bold')
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text3 = this.add
                .text(centerX, text2.y + text2.height, Settings.lang.hero, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text4 = this.add
                .text(centerX / (Settings.isMobile() ? 1.5 : 1.3), text3.y + text3.height + 20, Settings.lang.timeToWin, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text5 = this.add
                .text(text4.x + text4.width / 2 + 10, text4.y, Settings.lang.bonus, textStyle)
                .setColor('#ffffff').setOrigin(0, 0.5).setFontStyle('bold');

            const text6 = this.add
                .text(text4.x / (Settings.isMobile() ? 1.5 : 1.2), text4.y + text4.height, Settings.lang.i, textStyle)
                .setColor('#ffffff').setOrigin(0.5);


            const text7 = this.add
                .text(text6.x + text6.width, text6.y, Settings.lang.iphone14, textStyle)
                .setColor('#ffffff')
                .setOrigin(0, 0.5).setFontStyle('bold');

            const text8 = this.add
                .text(text7.x + text7.width + 5, text6.y, Settings.lang.ot, textStyle)
                .setColor('#ffffff')
                .setOrigin(0, 0.5);

            const text9 = this.add
                .text(text8.x + text8.width + 5, text6.y, Settings.lang.parimatch, textStyle)
                .setColor('#ffffff')
                .setOrigin(0, 0.5).setFontStyle('bold');

            const text10 = this.add
                .text(centerX, text6.y + text6.height, Settings.lang.pressButtonDown, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);
        } else {
            const text1 = this.add
                .text(centerX, type.y + type.height / 3, Settings.lang.playNow, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text2 = this.add
                .text(centerX, text1.y + text1.height + 10, Settings.lang.kanello, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

            const text3 = this.add
                .text(centerX, text2.y + text2.height, Settings.lang.nose, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text4 = this.add
                .text(centerX - text3.width / 5, text3.y + text3.height + 10, Settings.lang.andWin, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text5 = this.add
                .text(text4.x + text4.width * 1.5, text4.y, Settings.lang.bonus, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

            const text6 = this.add
                .text(centerX - text3.width / 5, text4.y + text4.height + 10, Settings.lang.i, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text7 = this.add
                .text(text6.x + text6.width, text6.y, Settings.lang.iphone14, textStyle)
                .setColor('#ffffff').setOrigin(0, 0.5).setFontStyle('bold');

            const text8 = this.add
                .text(centerX - text3.width / 6, text6.y + text6.height + 10, Settings.lang.ot, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text9 = this.add
                .text(text8.x + text8.width, text8.y, Settings.lang.parimatch2, textStyle)
                .setColor('#ffffff').setOrigin(0, 0.5).setFontStyle('bold');

        }

        const button1 = this.add.sprite(centerX, height - height * 0.2, 'btn-content')
            .setScale(Settings.isMobile() ? 0.65 : 0.4);

        const button2 = this.add.sprite(centerX, Settings.isMobile() ? button1.y + button1.height / 2 : button1.y + button1.height / 3, 'btn-game-now')
            .setScale(Settings.isMobile() ? 0.65 : 0.4);




        Utils.clickButton(this, button1, () => {
            const link = 'https://www.youtube.com/c/Parimatchesports';
            const a = document.createElement('a');
            a.setAttribute('target', '_blank');
            document.body.appendChild(a);
            a.href = link;
            a.click();
            document.body.removeChild(a);
        });


        Utils.clickButton(this, button2, () => {
            this.scene.stop();
            this.scene.start('Game', this.state);
        });
    }
}
