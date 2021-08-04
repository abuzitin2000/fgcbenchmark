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
    }

    create() {
        // Logo
        this.logoText = this.add.text(this.cameras.main.width / 2, 85, "The FGC Benchmark", {
            font: "100px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 10,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.logoInfoText = this.add.text(this.cameras.main.width / 2, 200, "Test and improve your fighting game skills!", {
            font: "36px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 5,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        // Top Bar
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

        // Mixup Button
        this.mixupButton = this.add.image(200, 400, "mixupButton");
        this.mixupButton.setInteractive({useHandCursor: true});
        this.buttons.push({
            sprite: this.mixupButton,
            page: "mixup",
            highlights: []
        });

        this.mixupButtonText = this.add.text(200, 480, "Mix-up training", {
            font: "28px Impact",
            color: secondaryColor,
            align: "center",
            strokeThickness: 5,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        // Setup All Buttons
        this.buttons.forEach(button => {
            this.fillHighlight(button, 0xE6E8F4);
            
            button.sprite.on("pointerdown", (pointer) => {
                this.scene.start(button.page);
            });

            button.sprite.on("pointerover", (pointer) => {
                this.fillHighlight(button, 0x000000);
            });
    
            button.sprite.on("pointerout", (pointer) => {
                this.fillHighlight(button, 0xE6E8F4);
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