class mixupScene extends Phaser.Scene {
    constructor() {
        super({
            key: "mixup"
        });
    }

    preload() {
        this.load.spritesheet('KenStanding', 'src/assets/characters/Ken/KenStanding.png', { frameWidth: 78, frameHeight: 111 });
        this.load.spritesheet('KenCrouching', 'src/assets/characters/Ken/KenCrouching.png', { frameWidth: 87, frameHeight: 73 });
        this.load.spritesheet('KenToCrouching', 'src/assets/characters/Ken/KenToCrouching.png', { frameWidth: 88, frameHeight: 109 });
        this.load.spritesheet('KenToStanding', 'src/assets/characters/Ken/KenToStanding.png', { frameWidth: 88, frameHeight: 109 });
        this.load.spritesheet('KenBlockHigh', 'src/assets/characters/Ken/KenBlockHigh.png', { frameWidth: 78, frameHeight: 105 });
        this.load.spritesheet('KenBlockLow', 'src/assets/characters/Ken/KenBlockLow.png', { frameWidth: 88, frameHeight: 74 });
        this.load.spritesheet('KenHitHigh', 'src/assets/characters/Ken/KenHitHigh.png', { frameWidth: 142, frameHeight: 110 });
        this.load.spritesheet('KenHitLow', 'src/assets/characters/Ken/KenHitLow.png', { frameWidth: 114, frameHeight: 77 });
        this.load.spritesheet('RyuStanding', 'src/assets/characters/Ryu/RyuStanding.png', { frameWidth: 78, frameHeight: 111 });
        this.load.spritesheet('RyuToCrouching', 'src/assets/characters/Ryu/RyuToCrouching.png', { frameWidth: 88, frameHeight: 109 });
        this.load.spritesheet('RyuToStanding', 'src/assets/characters/Ryu/RyuToStanding.png', { frameWidth: 88, frameHeight: 109 });
        this.load.spritesheet('RyuLow', 'src/assets/characters/Ryu/RyuLow.png', { frameWidth: 176, frameHeight: 80 });
        this.load.spritesheet('RyuHigh', 'src/assets/characters/Ryu/RyuHigh.png', { frameWidth: 130, frameHeight: 113 });
        this.load.image("bg-3rd", 'src/assets/bg-3rdstrike.png');
        this.load.image("fightStickLayout", 'src/assets/fightStickLayout.png');
        this.load.image("fightStickBall", 'src/assets/fightStickBall.png');
        this.load.image("fightStickButton", 'src/assets/fightStickButton.png');
        this.load.image("switch", 'src/assets/Switch.png');
    }

    create() {
        // Global Variables
        this.inputHor = 0;
        this.inputVer = 0;
        this.pad1;
        this.interval = 1.5;
        this.curInterval = 0;
        this.stunned = false;
        this.start = false;
        this.curCount = 0;
        this.results = [];
        this.reactionStart = 0;
        this.reactionEnd = 0;
        this.reactionCalc = 0;
        this.state = "middlefalse";
        this.average = 0;
        this.times = 0;
        this.success = 0;
        this.mirror = false;
        this.blockButton = false;
        this.manuelBLock = false;
        this.bgOn = true;
        this.highStartup = 18;
        this.lowStartup = 12;
        this.rep = 5;
        this.track = "high";
        this.lastTrack = "";

        // Top Bar
        this.topText = this.add.text(this.cameras.main.width / 2, 25, "Mixup Training", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 10,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.topBack = this.add.text(35, 15, "BACK", {
            font: "58px Impact",
            color: secondaryColor,
            align: "left",
            strokeThickness: 8,
            stroke: tetriaryColor
        });

        this.topBack.setInteractive({ useHandCursor: true });

        this.topBack.on("pointerdown", (pointer) => {
            this.scene.start("main");
        });

        this.topBack.on("pointerover", (pointer) => {
            this.topBack.setStroke(tetriaryColor, 10);
        });

        this.topBack.on("pointerout", (pointer) => {
            this.topBack.setStroke(tetriaryColor, 8);
        });

        this.topOptions = this.add.text(1100, 15, "SETTINGS", {
            font: "58px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 8,
            stroke: tetriaryColor
        });

        this.topOptions.setInteractive({ useHandCursor: true });

        this.topOptions.on("pointerdown", (pointer) => {
            this.scene.start("main");
        });

        this.topOptions.on("pointerover", (pointer) => {
            this.topOptions.setStroke(tetriaryColor, 10);
        });

        this.topOptions.on("pointerout", (pointer) => {
            this.topOptions.setStroke(tetriaryColor, 8);
        });

        // Start
        this.startText = this.add.text(660, 130, "START", {
            font: "42px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 6,
            stroke: tetriaryColor
        }).setDepth(1).setOrigin(1, 0);

        this.startText.setInteractive({ useHandCursor: true });

        this.startText.on("pointerdown", (pointer) => {
            this.start = !this.start;
            if (this.start && this.rep != -1) {
                this.results.forEach(resulty => {
                    resulty.destroy();
                });

                this.results = [];
                this.curCount = 0;
                this.reactionStart = 0;
                this.times = 0;
                this.average = 0;
                this.success = 0;
            }
        });

        this.startText.on("pointerover", (pointer) => {
            this.startText.setStroke(tetriaryColor, 10);
        });

        this.startText.on("pointerout", (pointer) => {
            this.startText.setStroke(tetriaryColor, 8);
        });

        // Texts
        this.stateText = this.add.text(35, 590, "State: ", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 6,
            stroke: primaryColor
        });

        this.averageText = this.add.text(35, 640, "Average: ", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 6,
            stroke: primaryColor
        });

        this.successText = this.add.text(35, 690, "Success Rate: ", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 6,
            stroke: primaryColor
        });

        // Sub Options
        this.add.text(1115, 365, "OPTIONS", {
            font: "58px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 8,
            stroke: primaryColor
        }).setDepth(1).setOrigin(1, 0);

        // Option Game
        this.add.text(700, 450, "Select Game: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.gameSFText = this.add.text(885, 450, "SF", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.gameGGText = this.add.text(930, 450, "GG", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: "#888888"
        }).setDepth(1);

        this.gameGGText = this.add.text(980, 450, "MK", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: "#888888"
        }).setDepth(1);

        // Option Side Switch
        this.add.text(1065, 495, "P1 Side: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.mirrorTrueText = this.add.text(1240, 495, "RIGHT", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.mirrorFalseText = this.add.text(1175, 495, "LEFT", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.mirrorTrueText.setInteractive({ useHandCursor: true });

        this.mirrorTrueText.on("pointerdown", (pointer) => {
            if (!this.mirror) {
                this.mirror = true;
                this.mirrorTrueText.setStroke(primaryColor, 4);
                this.mirrorFalseText.setStroke(tetriaryColor, 4);
                let tempx = this.ken.x;
                this.ken.x = this.ryu.x;
                this.ryu.x = tempx;
                this.ken.setFlipX(true);
                this.ryu.setFlipX(false);
            }
        });

        this.mirrorTrueText.on("pointerover", (pointer) => {
            if (!this.mirror) {
                this.mirrorTrueText.setStroke(tetriaryColor, 5);
            }
        });

        this.mirrorTrueText.on("pointerout", (pointer) => {
            if (!this.mirror) {
                this.mirrorTrueText.setStroke(tetriaryColor, 4);
            }
        });

        this.mirrorFalseText.setInteractive({ useHandCursor: true });

        this.mirrorFalseText.on("pointerdown", (pointer) => {
            if (this.mirror) {
                this.mirror = false;
                this.mirrorFalseText.setStroke(primaryColor, 4);
                this.mirrorTrueText.setStroke(tetriaryColor, 4);
                let tempx = this.ken.x;
                this.ken.x = this.ryu.x;
                this.ryu.x = tempx;
                this.ken.setFlipX(false);
                this.ryu.setFlipX(true);
            }
        });

        this.mirrorFalseText.on("pointerover", (pointer) => {
            if (this.mirror) {
                this.mirrorFalseText.setStroke(tetriaryColor, 5);
            }
        });

        this.mirrorFalseText.on("pointerout", (pointer) => {
            if (this.mirror) {
                this.mirrorFalseText.setStroke(tetriaryColor, 4);
            }
        });

        // Option Block Type
        this.add.text(700, 495, "Block Type: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.blockButtonText = this.add.text(860, 495, "BUTTON", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.blockStickText = this.add.text(970, 495, "STICK", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.blockButtonText.setInteractive({ useHandCursor: true });

        this.blockButtonText.on("pointerdown", (pointer) => {
            if (!this.blockButton) {
                this.blockButton = true;
                this.blockButtonText.setStroke(primaryColor, 4);
                this.blockStickText.setStroke(tetriaryColor, 4);
            }
        });

        this.blockButtonText.on("pointerover", (pointer) => {
            if (!this.blockButton) {
                this.blockButtonText.setStroke(tetriaryColor, 5);
            }
        });

        this.blockButtonText.on("pointerout", (pointer) => {
            if (!this.blockButton) {
                this.blockButtonText.setStroke(tetriaryColor, 4);
            }
        });

        this.blockStickText.setInteractive({ useHandCursor: true });

        this.blockStickText.on("pointerdown", (pointer) => {
            if (this.blockButton) {
                this.blockButton = false;
                this.blockButtonText.setStroke(tetriaryColor, 4);
                this.blockStickText.setStroke(primaryColor, 4);
            }
        });

        this.blockStickText.on("pointerover", (pointer) => {
            if (this.blockButton) {
                this.blockStickText.setStroke(tetriaryColor, 5);
            }
        });

        this.blockStickText.on("pointerout", (pointer) => {
            if (this.blockButton) {
                this.blockStickText.setStroke(tetriaryColor, 4);
            }
        });

        // Option Background
        this.add.text(1065, 450, "Background: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.bgOnText = this.add.text(1242, 450, "ON", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.bgOffText = this.add.text(1290, 450, "OFF", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.bgOnText.setInteractive({ useHandCursor: true });

        this.bgOnText.on("pointerdown", (pointer) => {
            if (!this.bgOn) {
                this.bgOn = true;
                this.bgOnText.setStroke(primaryColor, 4);
                this.bgOffText.setStroke(tetriaryColor, 4);
                this.bg.setAlpha(1);
            }
        });

        this.bgOnText.on("pointerover", (pointer) => {
            if (!this.bgOn) {
                this.bgOnText.setStroke(tetriaryColor, 5);
            }
        });

        this.bgOnText.on("pointerout", (pointer) => {
            if (!this.bgOn) {
                this.bgOnText.setStroke(tetriaryColor, 4);
            }
        });

        this.bgOffText.setInteractive({ useHandCursor: true });

        this.bgOffText.on("pointerdown", (pointer) => {
            if (this.bgOn) {
                this.bgOn = false;
                this.bgOnText.setStroke(tetriaryColor, 4);
                this.bgOffText.setStroke(primaryColor, 4);
                this.bg.setAlpha(0);
            }
        });

        this.bgOffText.on("pointerover", (pointer) => {
            if (this.bgOn) {
                this.bgOffText.setStroke(tetriaryColor, 5);
            }
        });

        this.bgOffText.on("pointerout", (pointer) => {
            if (this.bgOn) {
                this.bgOffText.setStroke(tetriaryColor, 4);
            }
        });

        // Option High Startup
        this.add.text(700, 540, "High Startup: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.highStartupText = this.add.text(962, 542, "18 frames", {
            font: "28px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1).setOrigin(0.5, 0);

        this.highStartupDecreaseText = this.add.text(880, 528, "-", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.highStartupIncreaseText = this.add.text(1025, 530, "+", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.highStartupDecreaseText.setInteractive({ useHandCursor: true });

        this.highStartupDecreaseText.on("pointerdown", (pointer) => {
            if (this.highStartup > 3) {
                this.highStartup--;
                this.highStartupText.text = this.highStartup + " frames";
                if (this.highStartup == 3) {
                    this.highStartupDecreaseText.setStroke(primaryColor, 4);
                }
                this.ryuHigh.frameRate = (this.ryuHigh.getTotalFrames() * 0.5) * (60 / this.highStartup);
            }
        });

        this.highStartupDecreaseText.on("pointerover", (pointer) => {
            if (this.highStartup > 3) {
                this.highStartupDecreaseText.setStroke(tetriaryColor, 5);
            }
        });

        this.highStartupDecreaseText.on("pointerout", (pointer) => {
            if (this.highStartup > 3) {
                this.highStartupDecreaseText.setStroke(tetriaryColor, 4);
            }
        });

        this.highStartupIncreaseText.setInteractive({ useHandCursor: true });

        this.highStartupIncreaseText.on("pointerdown", (pointer) => {
            this.highStartup++;
            this.highStartupText.text = this.highStartup + " frames";
            this.highStartupDecreaseText.setStroke(tetriaryColor, 4);
            this.ryuHigh.frameRate = (this.ryuHigh.getTotalFrames() * 0.5) * (60 / this.highStartup);
        });

        this.highStartupIncreaseText.on("pointerover", (pointer) => {
            this.highStartupIncreaseText.setStroke(tetriaryColor, 5);
        });

        this.highStartupIncreaseText.on("pointerout", (pointer) => {
            this.highStartupIncreaseText.setStroke(tetriaryColor, 4);
        });

        // Option Low Startup
        this.add.text(700, 585, "Low Startup: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.lowStartupText = this.add.text(952, 587, "12 frames", {
            font: "28px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1).setOrigin(0.5, 0);

        this.lowStartupDecreaseText = this.add.text(870, 573, "-", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.lowStartupIncreaseText = this.add.text(1015, 575, "+", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.lowStartupDecreaseText.setInteractive({ useHandCursor: true });

        this.lowStartupDecreaseText.on("pointerdown", (pointer) => {
            if (this.lowStartup > 3) {
                this.lowStartup--;
                this.lowStartupText.text = this.lowStartup + " frames";
                if (this.lowStartup == 3) {
                    this.lowStartupDecreaseText.setStroke(primaryColor, 4);
                }
                this.ryuLow.frameRate = (this.ryuLow.getTotalFrames() * 0.5) * (60 / this.lowStartup);
            }
        });

        this.lowStartupDecreaseText.on("pointerover", (pointer) => {
            if (this.lowStartup > 3) {
                this.lowStartupDecreaseText.setStroke(tetriaryColor, 5);
            }
        });

        this.lowStartupDecreaseText.on("pointerout", (pointer) => {
            if (this.lowStartup > 3) {
                this.lowStartupDecreaseText.setStroke(tetriaryColor, 4);
            }
        });

        this.lowStartupIncreaseText.setInteractive({ useHandCursor: true });

        this.lowStartupIncreaseText.on("pointerdown", (pointer) => {
            this.lowStartup++;
            this.lowStartupText.text = this.lowStartup + " frames";
            this.lowStartupDecreaseText.setStroke(tetriaryColor, 4);
            this.ryuLow.frameRate = (this.ryuLow.getTotalFrames() * 0.5) * (60 / this.lowStartup);
        });

        this.lowStartupIncreaseText.on("pointerover", (pointer) => {
            this.lowStartupIncreaseText.setStroke(tetriaryColor, 5);
        });

        this.lowStartupIncreaseText.on("pointerout", (pointer) => {
            this.lowStartupIncreaseText.setStroke(tetriaryColor, 4);
        });

        // Option Interval
        this.add.text(700, 630, "Interval: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.intervalText = this.add.text(918, 632, "1.5 seconds", {
            font: "28px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1).setOrigin(0.5, 0);

        this.intervalDecreaseText = this.add.text(820, 618, "-", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.intervalIncreaseText = this.add.text(1000, 620, "+", {
            font: "48px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.intervalDecreaseText.setInteractive({ useHandCursor: true });

        this.intervalDecreaseText.on("pointerdown", (pointer) => {
            if (this.interval > 0.2) {
                this.interval -= 0.1;
                this.intervalText.text = Number(this.interval).toFixed(1) + " seconds";
                if (this.interval < 0.2) {
                    this.intervalDecreaseText.setStroke(primaryColor, 4);
                }
            }
        });

        this.intervalDecreaseText.on("pointerover", (pointer) => {
            if (this.interval > 0.2) {
                this.intervalDecreaseText.setStroke(tetriaryColor, 5);
            }
        });

        this.intervalDecreaseText.on("pointerout", (pointer) => {
            if (this.interval > 0.2) {
                this.intervalDecreaseText.setStroke(tetriaryColor, 4);
            }
        });

        this.intervalIncreaseText.setInteractive({ useHandCursor: true });

        this.intervalIncreaseText.on("pointerdown", (pointer) => {
            this.interval += 0.1;
            this.intervalText.text = Number(this.interval).toFixed(1) + " seconds";
            this.intervalDecreaseText.setStroke(tetriaryColor, 4);
        });

        this.intervalIncreaseText.on("pointerover", (pointer) => {
            this.intervalIncreaseText.setStroke(tetriaryColor, 5);
        });

        this.intervalIncreaseText.on("pointerout", (pointer) => {
            this.intervalIncreaseText.setStroke(tetriaryColor, 4);
        });

        // Option Rep Length
        this.add.text(700, 675, "Rep Length: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.repInfText = this.add.text(860, 675, "Infinite", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.repFiveText = this.add.text(965, 675, "5", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.repOneText = this.add.text(995, 675, "1", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.repInfText.setInteractive({ useHandCursor: true });

        this.repInfText.on("pointerdown", (pointer) => {
            this.repInfText.setStroke(primaryColor, 4);
            this.repFiveText.setStroke(tetriaryColor, 4);
            this.repOneText.setStroke(tetriaryColor, 4);
            this.rep = -1;
        });

        this.repInfText.on("pointerover", (pointer) => {
            if (this.rep != -1) {
                this.repInfText.setStroke(tetriaryColor, 5);
            }
        });

        this.repInfText.on("pointerout", (pointer) => {
            if (this.rep != -1) {
                this.repInfText.setStroke(tetriaryColor, 4);
            }
        });

        this.repFiveText.setInteractive({ useHandCursor: true });

        this.repFiveText.on("pointerdown", (pointer) => {
            this.repInfText.setStroke(tetriaryColor, 4);
            this.repFiveText.setStroke(primaryColor, 4);
            this.repOneText.setStroke(tetriaryColor, 4);
            this.rep = 5;
        });

        this.repFiveText.on("pointerover", (pointer) => {
            if (this.rep != 5) {
                this.repFiveText.setStroke(tetriaryColor, 5);
            }
        });

        this.repFiveText.on("pointerout", (pointer) => {
            if (this.rep != 5) {
                this.repFiveText.setStroke(tetriaryColor, 4);
            }
        });

        this.repOneText.setInteractive({ useHandCursor: true });

        this.repOneText.on("pointerdown", (pointer) => {
            this.repInfText.setStroke(tetriaryColor, 4);
            this.repFiveText.setStroke(tetriaryColor, 4);
            this.repOneText.setStroke(primaryColor, 4);
            this.rep = 1;
        });

        this.repOneText.on("pointerover", (pointer) => {
            if (this.rep != 1) {
                this.repOneText.setStroke(tetriaryColor, 5);
            }
        });

        this.repOneText.on("pointerout", (pointer) => {
            if (this.rep != 1) {
                this.repOneText.setStroke(tetriaryColor, 4);
            }
        });

        // Option Track
        this.add.text(700, 720, "Track: ", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.trackBothText = this.add.text(790, 720, "Both", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.trackHighText = this.add.text(865, 720, "Highs", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        }).setDepth(1);

        this.trackLowText = this.add.text(955, 720, "Lows", {
            font: "32px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: tetriaryColor
        }).setDepth(1);

        this.trackBothText.setInteractive({ useHandCursor: true });

        this.trackBothText.on("pointerdown", (pointer) => {
            this.trackBothText.setStroke(primaryColor, 4);
            this.trackHighText.setStroke(tetriaryColor, 4);
            this.trackLowText.setStroke(tetriaryColor, 4);
            this.track = "both";
        });

        this.trackBothText.on("pointerover", (pointer) => {
            if (this.track != "both") {
                this.trackBothText.setStroke(tetriaryColor, 5);
            }
        });

        this.trackBothText.on("pointerout", (pointer) => {
            if (this.track != "both") {
                this.trackBothText.setStroke(tetriaryColor, 4);
            }
        });

        this.trackHighText.setInteractive({ useHandCursor: true });

        this.trackHighText.on("pointerdown", (pointer) => {
            this.trackBothText.setStroke(tetriaryColor, 4);
            this.trackHighText.setStroke(primaryColor, 4);
            this.trackLowText.setStroke(tetriaryColor, 4);
            this.track = "high";
        });

        this.trackHighText.on("pointerover", (pointer) => {
            if (this.track != "high") {
                this.trackHighText.setStroke(tetriaryColor, 5);
            }
        });

        this.trackHighText.on("pointerout", (pointer) => {
            if (this.track != "high") {
                this.trackHighText.setStroke(tetriaryColor, 4);
            }
        });

        this.trackLowText.setInteractive({ useHandCursor: true });

        this.trackLowText.on("pointerdown", (pointer) => {
            this.trackBothText.setStroke(tetriaryColor, 4);
            this.trackHighText.setStroke(tetriaryColor, 4);
            this.trackLowText.setStroke(primaryColor, 4);
            this.track = "low";
        });

        this.trackLowText.on("pointerover", (pointer) => {
            if (this.track != "low") {
                this.trackLowText.setStroke(tetriaryColor, 5);
            }
        });

        this.trackLowText.on("pointerout", (pointer) => {
            if (this.track != "low") {
                this.trackLowText.setStroke(tetriaryColor, 4);
            }
        });

        this.bg = this.add.image(25, 120, "bg-3rd").setScale(2).setOrigin(0, 0);
        this.ken = this.add.sprite(150, 550, "").setScale(2.5).setOrigin(0.5, 1);
        this.ryu = this.add.sprite(350, 550, "").setScale(2.5).setOrigin(0.5, 1);
        this.ryu.flipX = true

        // Ken Animations
        this.anims.create({
            key: 'KenStanding',
            frames: this.anims.generateFrameNumbers('KenStanding', { start: 0, end: 9, first: 0 }),
            duration: 540,
            repeat: -1
        });

        this.anims.create({
            key: 'KenToCrouching',
            frames: this.anims.generateFrameNumbers('KenToCrouching', { frames: [1, 2, 3] }),
            duration: 100,
            repeat: 0
        });

        this.anims.create({
            key: 'KenCrouching',
            frames: this.anims.generateFrameNumbers('KenCrouching', { start: 0, end: 4, first: 0 }),
            duration: 1000,
            repeat: -1
        });

        this.anims.create({
            key: 'KenToStanding',
            frames: this.anims.generateFrameNumbers('KenToStanding', { start: 0, end: 1, first: 0 }),
            duration: 100,
            repeat: 0
        });

        this.anims.create({
            key: 'KenBlockHigh',
            frames: this.anims.generateFrameNumbers('KenBlockHigh', { start: 0, end: 3, first: 0 }),
            duration: 350,
            repeat: 0
        });

        this.anims.create({
            key: 'KenBlockLow',
            frames: this.anims.generateFrameNumbers('KenBlockLow', { start: 0, end: 4, first: 0 }),
            duration: 400,
            repeat: 0
        });

        this.anims.create({
            key: 'KenBlockLowStill',
            frames: this.anims.generateFrameNumbers('KenBlockLow', { frames: [4] }),
            duration: 1000,
            repeat: -1
        });

        this.anims.create({
            key: 'KenBlockHighStill',
            frames: this.anims.generateFrameNumbers('KenBlockHigh', { frames: [1] }),
            duration: 1000,
            repeat: -1
        });

        this.anims.create({
            key: 'KenHitHigh',
            frames: this.anims.generateFrameNumbers('KenHitHigh', { frames: [34, 35, 36] }),
            duration: 300,
            repeat: 0
        });

        this.anims.create({
            key: 'KenHitLow',
            frames: this.anims.generateFrameNumbers('KenHitLow', { frames: [1, 2, 3] }),
            duration: 400,
            repeat: 0
        });

        // Ryu Animations
        this.anims.create({
            key: 'RyuStanding',
            frames: this.anims.generateFrameNumbers('RyuStanding', { start: 0, end: 9, first: 0 }),
            duration: 610,
            repeat: -1
        });

        this.anims.create({
            key: 'RyuToCrouching',
            frames: this.anims.generateFrameNumbers('RyuToCrouching', { start: 0, end: 2, first: 0 }),
            duration: 100,
            repeat: 0
        });

        this.anims.create({
            key: 'RyuToStanding',
            frames: this.anims.generateFrameNumbers('RyuToStanding', { start: 0, end: 2, first: 0 }),
            duration: 200,
            repeat: 0
        });

        this.ryuLow = this.anims.create({
            key: 'RyuLow',
            frames: this.anims.generateFrameNumbers('RyuLow', { start: 0, end: 9, first: 0 }),
            duration: 700,
            repeat: 0
        });
        this.ryuLow.frameRate = (this.ryuLow.getTotalFrames() * 0.5) * (60 / this.lowStartup);

        this.ryuHigh = this.anims.create({
            key: 'RyuHigh',
            frames: this.anims.generateFrameNumbers('RyuHigh', { start: 0, end: 10, first: 0 }),
            duration: 770,
            repeat: 0
        });
        this.ryuHigh.frameRate = (this.ryuHigh.getTotalFrames() * 0.5) * (60 / this.highStartup);

        this.ken.play("KenStanding");
        this.ryu.play("RyuStanding");

        this.fgLayout = this.add.sprite(1175, 225, "fightStickLayout").setScale(0.85);
        this.fgBall = this.add.sprite(1175, 225, "fightStickBall").setScale(0.85);
        this.fgButtonBack = this.add.sprite(975, 175, "fightStickButton");
        this.fgButton = this.add.sprite(975, 175, "fightStickBall");

        // Touch
        this.fgBall.setInteractive();
        this.fgBall.on("pointerdown", (pointer) => {
            this.touchBall = true;
        });
        this.input.on("pointerup", (pointer) => {
            this.touchBall = false;
        });
        this.fgButtonBack.setInteractive();
        this.fgButtonBack.on("pointerdown", (pointer) => {
            this.touchButton = true;
        });
        this.fgButtonBack.on("pointerup", (pointer) => {
            this.touchButton = false;
        });
        this.input.addPointer(1);

        // Inputs
        this.cursors = this.input.keyboard.createCursorKeys();

        this.moveUp = this.input.keyboard.addKey("W");
        this.moveDown = this.input.keyboard.addKey("S");
        this.moveLeft = this.input.keyboard.addKey("A");
        this.moveRight = this.input.keyboard.addKey("D");

        this.input.gamepad.once('down', (pad, button, index) => {
            this.pad1 = pad;
        });

        this.input.keyboard.on('keydown', (event) => {
            if (event.key != 'w' && event.key != 'a' && event.key != 's' && event.key != 'd' && event.key != "ArrowUp" && event.key != "ArrowLeft" && event.key != "ArrowDown" && event.key != "ArrowRight") {
                this.manuelBLock = true;
            }
        });

        this.input.keyboard.on('keyup', (event) => {
            if (event.key != 'w' && event.key != 'a' && event.key != 's' && event.key != 'd' && event.key != "ArrowUp" && event.key != "ArrowLeft" && event.key != "ArrowDown" && event.key != "ArrowRight") {
                this.manuelBLock = false;
            }
        });
    }

    update(time, delta) {
        this.inputVer = 0;
        this.inputHor = 0;

        // Keyboard
        if (this.cursors.up.isDown || this.moveUp.isDown) {
            this.inputVer = -1;
        } else if (this.cursors.down.isDown || this.moveDown.isDown) {
            this.inputVer = 1;
        }

        if (this.cursors.left.isDown || this.moveLeft.isDown) {
            this.inputHor = -1;
        } else if (this.cursors.right.isDown || this.moveRight.isDown) {
            this.inputHor = 1;
        }

        // Gamepad
        if (this.pad1) {
            if (this.pad1.up) {
                this.inputVer = -1;
            } else if (this.pad1.down) {
                this.inputVer = 1;
            }

            if (this.pad1.left) {
                this.inputHor = -1;
            } else if (this.pad1.right) {
                this.inputHor = 1;
            }

            if (this.pad1.axes.length) {
                this.inputHor = this.pad1.axes[0].getValue();
                this.inputVer = this.pad1.axes[1].getValue();
            }
        }

        this.fgBall.setX(1175 + this.inputHor * 60);
        this.fgBall.setY(225 + this.inputVer * 60);

        // Touch
        if (this.touchBall) {
            if (this.sys.game.device.os.desktop) {
                this.fgBall.setPosition(this.input.mousePointer.x, this.input.mousePointer.y);
            } else {
                this.fgBall.setPosition(this.input.pointer1.x, this.input.pointer1.y);
            }
            
            if (this.fgBall.x > 1175 + 60) {
                this.fgBall.setX(1175 + 60);
            }
            if (this.fgBall.x < 1175 - 60) {
                this.fgBall.setX(1175 - 60);
            }
            if (this.fgBall.y > 225 + 60) {
                this.fgBall.setY(225 + 60);
            }
            if (this.fgBall.y < 225 - 60) {
                this.fgBall.setY(225 - 60);
            }

            if (this.fgBall.x > 1175 + 20) {
                this.inputHor = 1;
            }
            if (this.fgBall.x < 1175 - 20) {
                this.inputHor = -1;
            }
            if (this.fgBall.y > 225 + 20) {
                this.inputVer = 1;
            }
            if (this.fgBall.y < 225 - 20) {
                this.inputVer = -1;
            }
        }

        // Block
        let crouching = false;
        let direction = "middle";
        let blocking = false;

        if (this.inputVer > 0.5) {
            crouching = true;
        } else {
            crouching = false;
        }

        if (this.inputHor > 0.5) {
            direction = "right";
        } else if (this.inputHor < -0.5) {
            direction = "left";
        } else {
            direction = "middle";
        }

        // Keyboard Block
        if (this.blockButton == false) {
            if (direction == "left" && !this.mirror) {
                blocking = true;
            }
            if (direction == "right" && this.mirror) {
                blocking = true;
            }
        } else {
            if (this.manuelBLock == true) {
                blocking = true;
            }
        }

        // Gamepad Block
        if (this.blockButton == false && this.pad1) {
            if (this.pad1.A || this.pad1.B || this.pad1.X || this.pad1.Y || this.pad1.R1 || this.pad1.L1 || this.pad1.R2 || this.pad1.L2) {
                blocking = true;
            }
        }

        // Touch Block
        if (this.blockButton == true && this.touchButton) {
            blocking = true;
        }

        if (this.blockButton) {
            this.fgButtonBack.setAlpha(1);
            if (blocking == true) {
                this.fgButton.setAlpha(1);
            } else {
                this.fgButton.setAlpha(0);
            }
        } else {
            this.fgButtonBack.setAlpha(0);
            this.fgButton.setAlpha(0);
        }

        // Animations
        if (crouching == true && (this.ken.anims.getName() == "KenStanding" || this.ken.anims.getName() == "KenBlockHighStill")) {
            this.ken.play("KenToCrouching");
        }
        if (this.ken.anims.getName() == "KenToCrouching" && this.ken.anims.getProgress() == 1) {
            this.ken.play("KenCrouching");
        }
        if (crouching == false && (this.ken.anims.getName() == "KenCrouching" || this.ken.anims.getName() == "KenBlockLowStill")) {
            this.ken.play("KenToStanding");
        }
        if (this.ken.anims.getName() == "KenToStanding" && this.ken.anims.getProgress() == 1) {
            this.ken.play("KenStanding");
        }
        if (this.ken.anims.getProgress() == 1) {
            if (this.ken.anims.getName() == "KenBlockLow" || this.ken.anims.getName() == "KenHitLow") {
                this.ken.play("KenCrouching");
            }
            if (this.ken.anims.getName() == "KenBlockHigh" || this.ken.anims.getName() == "KenHitHigh") {
                this.ken.play("KenStanding");
            }
        }
        if (this.blockButton == true) {
            if (this.manuelBLock == true && (this.ken.anims.getName() == "KenStanding" || this.ken.anims.getName() == "KenCrouching")) {
                if (crouching) {
                    this.ken.play("KenBlockLowStill");
                } else {
                    this.ken.play("KenBlockHighStill");
                }
            } else if (this.manuelBLock == false && (this.ken.anims.getName() == "KenBlockHighStill" || this.ken.anims.getName() == "KenBlockLowStill")) {
                if (crouching) {
                    this.ken.play("KenCrouching");
                } else {
                    this.ken.play("KenStanding");
                }
            }
        }

        if (this.ryu.anims.getProgress() == 1) {
            if (this.ryu.anims.getName() == "RyuHigh") {
                this.ryu.play("RyuStanding");
                this.stunned = false;
            }
            if (this.ryu.anims.getName() == "RyuToStanding") {
                this.ryu.play("RyuStanding");
            }
            if (this.ryu.anims.getName() == "RyuLow") {
                this.ryu.play("RyuToStanding");
                this.ryu.setOrigin(0.5, 1);
                this.stunned = false;
            }
            if (this.ryu.anims.getName() == "RyuToCrouching") {
                this.ryu.play("RyuLow");
                if (!this.mirror) {
                    this.ryu.setOrigin(0.7, 1);
                } else {
                    this.ryu.setOrigin(0.3, 1);
                }
                this.reactionStart = time;
                this.reactionEnd = time;
                this.reactionCalc = 1;
            }
        }

        // Ryu AI
        if (this.start) {
            this.curInterval += delta;

            if (this.curInterval >= this.interval * 1000) {
                if (this.ryu.anims.getName() == "RyuStanding") {
                    if (this.curCount < this.rep || this.rep == -1) {
                        let overhead = Math.random() < 0.5;

                        if (overhead) {
                            this.ryu.play("RyuHigh");
                        } else {
                            this.ryu.play("RyuToCrouching");
                        }

                        this.lastTrack = overhead;
                    } else {
                        this.start = false;
                    }

                    if (this.reactionCalc == 2) {
                        this.printReaction(true);
                    }

                    this.reactionStart = time;
                    this.reactionEnd = time;
                    this.reactionCalc = 1;

                    this.curInterval = 0;
                }
            }
        }

        // Results
        let curState = direction.concat(crouching);
        if (this.state != curState) {
            if (this.reactionCalc > 0) {
                this.reactionEnd = time;
            }

            if (this.reactionCalc == 2) {
                this.printReaction(true);
            }

            this.state = curState;
        }

        // Hit detection
        if (this.ryu.anims.getProgress() > 0.4 && !this.stunned && (this.ryu.anims.getName() == "RyuHigh" || this.ryu.anims.getName() == "RyuLow")) {
            this.stunned = true;

            let gotHit = false;
            if (!blocking) {
                gotHit = true;
            }
            if (crouching == true && this.ryu.anims.getName() == "RyuHigh") {
                gotHit = true;
            }
            if (crouching == false && this.ryu.anims.getName() == "RyuLow") {
                gotHit = true;
            }

            if (gotHit) {
                if (crouching) {
                    this.ken.play("KenHitLow");
                    //this.hitStop();
                } else {
                    this.ken.play("KenHitHigh");
                    //this.hitStop();
                }

                if (this.reactionEnd == this.reactionStart) {
                    this.reactionCalc = 2;
                } else {
                    this.printReaction(true);
                }
            } else {
                if (crouching) {
                    this.ken.play("KenBlockLow");
                    //this.hitStop();
                } else {
                    this.ken.play("KenBlockHigh");
                    //this.hitStop();
                }

                this.printReaction(false);
            }
        }

        // Texts
        if (this.start) {
            this.startText.text = "STOP";
        } else {
            this.startText.text = "START";
        }

        let stateText = "State: ";
        if (crouching) {
            stateText = stateText.concat("Crouch");
        } else {
            stateText = stateText.concat("Stand");
        }
        if (blocking) {
            stateText = stateText.concat(" Block");
        }
        stateText = stateText.concat("ing");
        this.stateText.setText(stateText);

        let averageText = "Average: ";
        if (this.times != 0) {
            averageText = averageText.concat(Number(this.average / this.times).toFixed(2));
        } else {
            averageText = averageText.concat(0);
        }

        averageText = averageText.concat(" frames");
        this.averageText.setText(averageText);

        let successText = "Success Rate: ";
        successText = successText.concat(this.success + "/" + this.times);

        this.successText.setText(successText);
    }

    hitStop() {
        let hitStop = 50;

        let kenAnim = this.ken.anims.getName();
        let ryuAnim = this.ryu.anims.getName();
        let kenAnimProg = this.ken.anims.getProgress();
        let ryuAnimProg = this.ryu.anims.getProgress();

        this.ken.stop();
        this.ryu.stop();
        setTimeout(() => {
            this.ken.play(kenAnim);
            this.ryu.play(ryuAnim);
            this.ken.anims.setProgress(kenAnimProg);
            this.ryu.anims.setProgress(ryuAnimProg);
        }, hitStop);
    }

    printReaction(gotHit) {
        if (!this.start) {
            return;
        }
        if (this.track == "high" && !this.lastTrack) {
            return;
        }
        if (this.track == "low" && this.lastTrack) {
            return;
        }

        // Setup text
        let result = "Result: ";
        if (gotHit) {
            result = result.concat("Hit in ");
        } else {
            result = result.concat("Block in ");
        }

        let finalResult = this.reactionEnd - this.reactionStart;
        let finalFrame = (finalResult * 60 / 1000);
        if (finalFrame < 0) {
            finalFrame = 0;
        }

        result = result.concat(Math.floor(finalFrame));

        result = result.concat(" frames");

        if (finalFrame != 0) {
            this.average += finalFrame;
            this.times++;
        }
        if (!gotHit) {
            this.success++;
        }

        if (this.curCount == 0) {
            this.results.forEach(resulty => {
                resulty.destroy();
            });

            this.results = [];
        }

        let resultText = this.add.text(395, 575 + this.curCount * 35, result, {
            font: "26px Impact",
            color: secondaryColor,
            align: "right",
            strokeThickness: 4,
            stroke: primaryColor
        });

        this.results.push(resultText);

        this.curCount++;
        if (this.curCount > this.rep && this.rep != -1) {
            this.curCount = 0;
        }
        if (this.rep == -1 && this.curCount > 4) {
            this.curCount = 0;
        }

        this.reactionCalc = 0;
    }
}