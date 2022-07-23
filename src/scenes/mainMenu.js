class mainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "main"
        })

        this.buttons = [];
        this.borderSize = 5;
    }

    preload() {
        this.load.image("mixupButton", "src/assets/mixupButton.png");
        this.load.image("motionButton", "src/assets/motionButton.png");
    }

    create() {
        // Logo
        this.logoText = this.add.text(this.cameras.main.width / 2, 125, "The FGC Benchmark", {
            font: "132px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 12,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.logoInfoText = this.add.text(this.cameras.main.width / 2, 265, "Test and improve your fighting game skills!", {
            font: "48px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 8,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        // Top Bar
        this.topOptions = this.add.text(1600, 25, "SETTINGS", {
            font: "72px " + defaultFont,
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

        // Mixup Button
        this.mixupButton = this.add.image(200, 500, "mixupButton");
        this.mixupButton.setInteractive({useHandCursor: true});
        this.buttons.push({
            sprite: this.mixupButton,
            page: "mixup",
            highlights: []
        });

        this.mixupButtonText = this.add.text(200, 585, "Mix-up training", {
            font: "28px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 5,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        // Motion Button
        this.motionButton = this.add.image(500, 500, "motionButton");
        this.motionButton.setInteractive({useHandCursor: true});
        this.buttons.push({
            sprite: this.motionButton,
            page: "motion",
            highlights: []
        });

        this.motionButtonText = this.add.text(500, 585, "Motion training", {
            font: "28px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 5,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        // Setup All Buttons
        this.buttons.forEach(button => {
            this.fillHighlight(button, parseInt(primaryColor.replace(/^#/, ''), 16));
            
            button.sprite.on("pointerdown", (pointer) => {
                this.scene.start(button.page);
            });

            button.sprite.on("pointerover", (pointer) => {
                this.fillHighlight(button, parseInt(tetriaryColor.replace(/^#/, ''), 16));
            });
    
            button.sprite.on("pointerout", (pointer) => {
                this.fillHighlight(button, parseInt(primaryColor.replace(/^#/, ''), 16));
            });
        });
    }

    update(time, delta) {
        
    }

    fillHighlight(button, color) {
        button.highlights.forEach(highlight => {
            highlight.destroy();
        });

        button.highlights = [];

        for (let i = 0; i < 4; i++) {
            button.highlights.push(this.add.graphics({
                fillStyle: {
                    color: color
                }
            }));
        }

        button.highlights[0].fillRect(button.sprite.getTopLeft().x, button.sprite.getTopLeft().y, button.sprite.width + this.borderSize, -this.borderSize);
        button.highlights[1].fillRect(button.sprite.getBottomRight().x, button.sprite.getBottomRight().y, -button.sprite.width - this.borderSize, this.borderSize);
        button.highlights[2].fillRect(button.sprite.getBottomLeft().x, button.sprite.getBottomLeft().y, -this.borderSize, -button.sprite.height - this.borderSize);
        button.highlights[3].fillRect(button.sprite.getTopRight().x, button.sprite.getTopRight().y, this.borderSize, button.sprite.height + this.borderSize);
    }
}