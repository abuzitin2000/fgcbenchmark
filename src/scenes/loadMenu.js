class loadMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "load"
        });
    }

    preload() {
        this.load.image("logo", "src/assets/Logo.png");

        let progressbar = this.add.graphics({
            fillStyle: {
                color: 0xB22222
            }
        })

        this.load.on("progress", (percent) => {
            progressbar.fillRect(150, 500, percent * 700, 25);
        });
    }

    create() {
        this.add.image(this.cameras.main.width / 2, 200, "logo");
    }

    update() {
        if (this.load.progress == 1) {
            this.scene.start("main");
        }
    }
}