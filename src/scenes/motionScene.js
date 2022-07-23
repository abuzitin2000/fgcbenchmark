class motionScene extends Phaser.Scene {
    constructor() {
        super({
            key: "motion"
        });

        this.borderSize = 5;
    }

    preload() {
        this.load.image("fightStickLayout", 'src/assets/fightStickLayout.png');
        this.load.image("fightStickArrow", 'src/assets/fightStickArrow.png');
        this.load.image("fightStickBall", 'src/assets/fightStickBall.png');
        this.load.image("fightStickButton", 'src/assets/fightStickButton.png');
        this.load.image("switch", 'src/assets/Switch.png');
        this.load.image("Button", "src/assets/Button.png");
    }

    create() {
        // Global Variables
        this.inputHor = 0;
        this.inputVer = 0;
        this.pad1;

        // Top Bar
        this.topText = this.add.text(this.cameras.main.width / 2, 25, "Motion Training", {
            font: "36px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 10,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.topBack = this.add.text(35, 15, "BACK", {
            font: "58px " + defaultFont,
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
            font: "58px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 8,
            stroke: tetriaryColor
        });

        this.topOptions.setInteractive({ useHandCursor: true });

        this.topOptions.on("pointerdown", (pointer) => {
            this.scene.start("settings", { lastScene: this.scene.key });
        });

        this.topOptions.on("pointerover", (pointer) => {
            this.topOptions.setStroke(tetriaryColor, 10);
        });

        this.topOptions.on("pointerout", (pointer) => {
            this.topOptions.setStroke(tetriaryColor, 8);
        });

        // Options
        this.add.text(650, 575, "OPTIONS", {
            font: "46px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 8,
            stroke: primaryColor
        });

        // Selection
        this.selectMotiion = this.add.text(950, 375, "SELECT MOTION", {
            font: "58px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 8,
            stroke: primaryColor
        });

        // Area
        this.area = this.add.sprite(450, 350, "Button").setScale(4.25, 3);

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
        
    }
}