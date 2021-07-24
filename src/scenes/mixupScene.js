class mixupScene extends Phaser.Scene {
    constructor() {
        super({
            key: "mixup"
        });

        this.inputHor = 0;
        this.inputVer = 0;
        this.pad1;
    }

    preload() {
        this.load.spritesheet('KenStanding', 'src/assets/characters/Ken/KenStanding.png', { frameWidth: 78, frameHeight: 111 });
        this.load.spritesheet('RyuStanding', 'src/assets/characters/Ryu/RyuStanding.png', { frameWidth: 78, frameHeight: 111 });
        this.load.image("bg-3rd", 'src/assets/bg-3rdstrike.png');
        this.load.image("fightStickLayout", 'src/assets/fightStickLayout.png');
        this.load.image("fightStickBall", 'src/assets/fightStickBall.png');
    }

    create() {
        // Top Bar
        this.topText = this.add.text(this.cameras.main.width / 2, 25, "Mixup Training", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 10,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.bg = this.add.image(0, 120, "bg-3rd").setScale(2).setOrigin(0, 0);
        this.ken = this.add.sprite(150, 400, "").setScale(2.5);
        this.ryu = this.add.sprite(350, 400, "").setScale(2.5);
        this.ryu.flipX = true

        this.anims.create({
            key: 'KenStanding',
            frames: this.anims.generateFrameNumbers('KenStanding', { start: 0, end: 9, first: 0 }),
            frameRate: 12,
            repeat: -1
        });

        this.ken.play("KenStanding");

        this.anims.create({
            key: 'RyuStanding',
            frames: this.anims.generateFrameNumbers('RyuStanding', { start: 0, end: 9, first: 0 }),
            frameRate: 12,
            repeat: -1
        });

        this.ryu.play("RyuStanding");

        this.fgLayout = this.add.sprite(900, 225, "fightStickLayout").setScale(0.75);
        this.fgBall = this.add.sprite(900, 225, "fightStickBall").setScale(0.75);

        // Inputs
        this.cursors = this.input.keyboard.createCursorKeys();

        this.moveUp = this.input.keyboard.addKey("W");
        this.moveDown = this.input.keyboard.addKey("S");
        this.moveLeft = this.input.keyboard.addKey("A");
        this.moveRight = this.input.keyboard.addKey("D");

        this.input.gamepad.once('down', (pad, button, index) => {
            this.pad1 = pad;
        });
    }

    update() {
        // Keyboard
        if (this.cursors.up.isDown || this.moveUp.isDown) {
            this.inputVer = -1;
        } else if (this.cursors.down.isDown || this.moveDown.isDown) {
            this.inputVer = 1;
        } else {
            this.inputVer = 0;
        }

        if (this.cursors.left.isDown || this.moveLeft.isDown) {
            this.inputHor = -1;
        } else if (this.cursors.right.isDown || this.moveRight.isDown) {
            this.inputHor = 1;
        } else {
            this.inputHor = 0;
        }

        // Gamepad
        if (this.pad1) {
            if (this.pad1.up) {
                this.inputVer = -1;
            } else if (this.pad1.down) {
                this.inputVer = 1;
            } else {
                this.inputVer = 0;
            }

            if (this.pad1.left) {
                this.inputHor = -1;
            } else if (this.pad1.right) {
                this.inputHor = 1;
            } else {
                this.inputHor = 0;
            }
        
            if (this.pad1.axes.length) {
                this.inputHor = gamepad.axes[0].getValue();
                this.inputVer = gamepad.axes[1].getValue();
            }
        }

        this.fgBall.setX(900 + this.inputHor * 60);
        this.fgBall.setY(225 + this.inputVer * 60);
    }
}