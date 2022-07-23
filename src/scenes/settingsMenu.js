class settingsMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "settings"
        });
    }

    init(data) {
        this.lastScene = data.lastScene;
    }

    preload() {

    }

    create() {
        // Top Bar
        this.topText = this.add.text(this.cameras.main.width / 2, 20, "Settings", {
            font: "54px " + defaultFont,
            color: secondaryColor,
            align: "center",
            strokeThickness: 8,
            stroke: primaryColor
        }).setOrigin(0.5, 0);

        this.topBack = this.add.text(35, 25, "BACK", {
            font: "72px " + defaultFont,
            color: secondaryColor,
            align: "left",
            strokeThickness: 8,
            stroke: tetriaryColor
        });

        this.topBack.setInteractive({ useHandCursor: true });

        this.topBack.on("pointerdown", (pointer) => {
            this.scene.start(this.lastScene);
        });

        this.topBack.on("pointerover", (pointer) => {
            this.topBack.setStroke(tetriaryColor, 10);
        });

        this.topBack.on("pointerout", (pointer) => {
            this.topBack.setStroke(tetriaryColor, 8);
        });

        // Option Theme
        this.add.text(100, 125, "Theme: ", {
            font: "72px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 10,
            stroke: primaryColor
        }).setDepth(1);

        this.themeLightText = this.add.text(335, 125, "Light", {
            font: "72px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 10,
            stroke: tetriaryColor
        }).setDepth(1);

        this.themeDarkText = this.add.text(505, 125, "Dark", {
            font: "72px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 10,
            stroke: primaryColor
        }).setDepth(1);

        this.themeClassicText = this.add.text(665, 125, "Classic", {
            font: "72px " + defaultFont,
            color: secondaryColor,
            align: "right",
            strokeThickness: 10,
            stroke: tetriaryColor
        }).setDepth(1);

        this.themeLightText.setInteractive({ useHandCursor: true });

        this.themeLightText.on("pointerdown", (pointer) => {
            theme = "light";
            this.themeChange();
        });

        this.themeLightText.on("pointerover", (pointer) => {
            if (theme != "light") {
                this.themeLightText.setStroke(tetriaryColor, 12);
            }
        });

        this.themeLightText.on("pointerout", (pointer) => {
            if (theme != "light") {
                this.themeLightText.setStroke(tetriaryColor, 10);
            }
        });

        this.themeDarkText.setInteractive({ useHandCursor: true });

        this.themeDarkText.on("pointerdown", (pointer) => {
            theme = "dark";
            this.themeChange();
        });

        this.themeDarkText.on("pointerover", (pointer) => {
            if (theme != "dark") {
                this.themeDarkText.setStroke(tetriaryColor, 12);
            }
        });

        this.themeDarkText.on("pointerout", (pointer) => {
            if (theme != "dark") {
                this.themeDarkText.setStroke(tetriaryColor, 10);
            }
        });

        this.themeClassicText.setInteractive({ useHandCursor: true });

        this.themeClassicText.on("pointerdown", (pointer) => {
            theme = "classic";
            this.themeChange();
        });

        this.themeClassicText.on("pointerover", (pointer) => {
            if (theme != "classic") {
                this.themeClassicText.setStroke(tetriaryColor, 12);
            }
        });

        this.themeClassicText.on("pointerout", (pointer) => {
            if (theme != "classic") {
                this.themeClassicText.setStroke(tetriaryColor, 10);
            }
        });

        if (theme == "light") {
            this.themeLightText.setStroke(primaryColor, 10);
            this.themeDarkText.setStroke(tetriaryColor, 10);
            this.themeClassicText.setStroke(tetriaryColor, 10);
        }
        if (theme == "dark") {
            this.themeLightText.setStroke(tetriaryColor, 10);
            this.themeDarkText.setStroke(primaryColor, 10);
            this.themeClassicText.setStroke(tetriaryColor, 10);
        }
        if (theme == "classic") {
            this.themeLightText.setStroke(tetriaryColor, 10);
            this.themeDarkText.setStroke(tetriaryColor, 10);
            this.themeClassicText.setStroke(primaryColor, 10);
        }
    }

    update() {
        
    }

    themeChange() {
        if (theme == "light") {
            primaryColor = "#0079D3";
            secondaryColor = "#FFFFFF";
            tetriaryColor = "#030303";
            document.body.style.backgroundColor = "#F9F9F9";
        }
        if (theme == "dark") {
            primaryColor = "#BBBBBB";
            secondaryColor = "#0F0F0F";
            tetriaryColor = "#FFFFFF";
            document.body.style.backgroundColor = "#181818";
        }
        if (theme == "classic") {
            primaryColor = "#2B87D1";
            secondaryColor = "#FFFFFF";
            tetriaryColor = "#000000";
            document.body.style.backgroundColor = "#E6E8F4";
        }
        this.scene.restart();
    }
}