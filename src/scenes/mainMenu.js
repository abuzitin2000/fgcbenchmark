class mainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "main"
        })

        // Global Variables
        this.clock = 4;
        this.cloudTimer = 0;
        this.cloudPeriod = 60;
        this.clouds = [];
        this.frameDep = false;
    }

    preload() {
        this.load.image("mapOverlay", "src/assets/MapOverlay.png");
        this.load.image("mapHome", "src/assets/Home.png");
        this.load.image("mapHomeHigh", "src/assets/HomeHighlight.png");
        this.load.image("mapGunShop", "src/assets/GunShop.png");
        this.load.image("mapGunShopHigh", "src/assets/GunShopHighlight.png");
        this.load.image("mapBusStop", "src/assets/Bus Stop.png");
        this.load.image("mapSun", "src/assets/Sun.png");
        this.load.image("mapCloud1", "src/assets/cloud1.png");
        this.load.image("mapCloud2", "src/assets/cloud2.png");
        this.load.image("mapCloud3", "src/assets/cloud3.png");
        this.load.image("mapForest", "src/assets/MapForest.png");
    }

    create() {
        // Create Sky
        let backgroundSky = this.add.graphics({
            fillStyle: {
                color: 0x87ceeb
            }
        });

        backgroundSky.fillRect(0, 0, 800, 600).setDepth(-2);

        this.add.image(400, 300, "mapOverlay").setScale(0.85, 0.85);
        this.mapHome = this.add.sprite(200, 238, "mapHome").setScale(0.65, 0.65).setDepth(1);
        this.mapShop = this.add.sprite(500, 251, "mapGunShop").setScale(0.65, 0.65).setDepth(1);
        this.mapBus = this.add.sprite(700, 262, "mapBusStop").setScale(0.075, 0.075).setDepth(1);
        this.sun = this.add.sprite(100, 50, "mapSun").setDepth(-1);
        this.add.image(600, 220, "mapForest").setScale(0.75, 0.75);
        this.add.image(75, 220, "mapForest").setScale(0.75, 0.75);

        this.mapHome.setInteractive({useHandCursor: true});
        this.mapShop.setInteractive({useHandCursor: true});
        this.mapBus.setInteractive({useHandCursor: true});

        // Click on Home
        this.mapHome.on("pointerdown", (pointer) => {
            this.scene.start("forest", {frameDep: this.frameDep});
        });

        // Hover on Home
        this.mapHome.on("pointerover", (pointer) => {
            this.mapHome.setTexture("mapHomeHigh");
        });

        this.mapHome.on("pointerout", (pointer) => {
            this.mapHome.setTexture("mapHome");
        });

        // Click on Shop
        this.mapShop.on("pointerdown", (pointer) => {
            this.scene.start("main");
        });

        // Hover on Shop
        this.mapShop.on("pointerover", (pointer) => {
            this.mapShop.setTexture("mapGunShopHigh");
        });

        this.mapShop.on("pointerout", (pointer) => {
            this.mapShop.setTexture("mapGunShop");
        });

        // Click on Bus Stop
        this.mapBus.on("pointerdown", (pointer) => {
            this.frameDep = !this.frameDep;
            console.log("Frame Dependency: ", this.frameDep);
        });

        // Fill clouds
        for (let i = 0; i < 15; i++) {
            // Randomizer
            let randCloud = ["mapCloud1", "mapCloud2", "mapCloud3"][Math.round(Math.random() * 2)]
            let randX = Math.random() * 900;
            let randY = Math.random() * 175;

            // Create clouds
            let tempCloud = this.add.sprite(randX, randY, randCloud).setScale(0.25).setAlpha(0.65).setDepth(-1);
            this.clouds.push(tempCloud);   
        }
    }

    update(time, delta) {
        // Toggle framerate dependance
        let deltaTime = 1;
        let frameRate = 1 / (delta / 1000);
        if (this.frameDep) {
            deltaTime = 60 / frameRate;
        }

        // Move the sun
        this.sun.x = 375 * Math.cos(this.clock) + 400;
        this.sun.y = 275 * Math.sin(this.clock) + 300;

        // Advance time
        if (this.clock < 6.5) {
            this.clock += 0.0001 * deltaTime;
        }

        // Spawn clouds periodically
        if (this.cloudTimer > this.cloudPeriod) {
            this.cloudTimer = 0;
            
            // Randomizer
            let randCloud = ["mapCloud1", "mapCloud2", "mapCloud3"][Math.round(Math.random() * 2)]
            let randPeriod = Math.random() * 70 + 30;
            let randY = Math.random() * 175;

            // Create clouds
            let tempCloud = this.add.sprite(900, randY, randCloud).setScale(0.25).setAlpha(0.65).setDepth(-1);
            this.clouds.push(tempCloud);

            this.cloudPeriod = randPeriod;
        } else {
            this.cloudTimer += 1 * deltaTime;
        }

        // Move and destroy clouds
        this.clouds.forEach(cloud => {
            cloud.x -= 1 * deltaTime;

            if (cloud.x < -100) {
                cloud.destroy();
                this.clouds.splice(this.clouds.indexOf(cloud), 1);
            }
        });
    }
}