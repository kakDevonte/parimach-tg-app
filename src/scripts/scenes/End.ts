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

        const { centerX, centerY } = this.cameras.main;
        this.add.sprite(centerX, centerY, 'bgModal');
        this.add.sprite(centerX, Settings.isMobile() ? centerY - 300 : centerY - 180, isWin ? 'you-win' : 'you-lose').setScale(Settings.isMobile() ? 0.7 : 0.5);

        const textStyle = {
            fontSize: Settings.isMobile() ? '42px' : '28px',
            fontFamily: 'ParimatchThin',
            align: 'center',
        };


        if (isWin) {
            const text1 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 110 : centerY - 70, Settings.lang.trilogy, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text2 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 70 : centerY - 30, Settings.lang.incredible, textStyle)
                .setFontStyle('bold')
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text3 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 30 : centerY + 10, Settings.lang.hero, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text4 = this.add
                .text(Settings.isMobile() ? centerX - 150 : centerX - 100, Settings.isMobile() ? centerY + 50 : centerY + 40, Settings.lang.timeToWin, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text5 = this.add
                .text(Settings.isMobile() ? centerX + 180 : centerX + 120, Settings.isMobile() ? centerY + 70 : centerY + 55, Settings.lang.bonus, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5)
                .setFontStyle('bold');

            const text6 = this.add
                .text(Settings.isMobile() ? centerX - 230 : centerX - 160, Settings.isMobile() ? centerY + 90 : centerY + 80, Settings.lang.i, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);


            const text7 = this.add
                .text(Settings.isMobile() ? centerX - 105 : centerX - 75, Settings.isMobile() ? centerY + 90 : centerY + 80, Settings.lang.iphone14, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5).setFontStyle('bold');

            const text8 = this.add
                .text(Settings.isMobile() ? centerX + 25 : centerX + 15, Settings.isMobile() ? centerY + 90 : centerY + 80, Settings.lang.ot, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);

            const text9 = this.add
                .text(Settings.isMobile() ? centerX + 115 : centerX + 80, Settings.isMobile() ? centerY + 110 : centerY + 95, Settings.lang.parimatch, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5).setFontStyle('bold');

            const text10 = this.add
                .text(centerX, Settings.isMobile() ? centerY + 130 : centerY + 125, Settings.lang.pressButtonDown, textStyle)
                .setColor('#ffffff')
                .setOrigin(0.5);
        } else {
            const text1 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 110 : centerY - 70, Settings.lang.playNow, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text2 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 75 : centerY - 35, Settings.lang.kanello, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

            const text3 = this.add
                .text(centerX, Settings.isMobile() ? centerY - 40 : centerY - 5, Settings.lang.nose, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text4 = this.add
                .text(centerX - 100, Settings.isMobile() ? centerY : centerY + 25, Settings.lang.andWin, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text5 = this.add
                .text(Settings.isMobile() ? centerX + 90 : centerX + 30, Settings.isMobile() ? centerY + 20 : centerY + 40, Settings.lang.bonus, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

            const text6 = this.add
                .text(Settings.isMobile() ? centerX - 100 : centerX - 100, Settings.isMobile() ? centerY + 40 : centerY + 60, Settings.lang.i, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text7 = this.add
                .text(Settings.isMobile() ? centerX + 30 : centerX - 15, Settings.isMobile() ? centerY + 40 : centerY + 60, Settings.lang.iphone14, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

            const text8 = this.add
                .text(Settings.isMobile() ? centerX - 80 : centerX - 80, Settings.isMobile() ? centerY + 75 : centerY + 95, Settings.lang.ot, textStyle)
                .setColor('#ffffff').setOrigin(0.5);

            const text9 = this.add
                .text(Settings.isMobile() ? centerX + 15 : centerX - 15, Settings.isMobile() ? centerY + 75 : centerY + 95, Settings.lang.parimatch2, textStyle)
                .setColor('#ffffff').setOrigin(0.5).setFontStyle('bold');

        }


        const button1 = this.add.sprite(centerX, Settings.isMobile() ? centerY + 350 : centerY + 250, 'btn-content')
            .setScale(Settings.isMobile() ? 0.7 : 0.5);

        const button2 = this.add.sprite(centerX, Settings.isMobile() ? centerY + 470 : centerY + 340, 'btn-game-now')
            .setScale(Settings.isMobile() ? 0.7 : 0.5);

        const logo = this.add.sprite(centerX, 100, 'logo').setScale(Settings.isMobile() ? 0.8 : 0.6);

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
