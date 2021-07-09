class battleForest extends Phaser.Scene {
    constructor() {
        super({
            key: "forest"
        });

        this.frameDep = false;
        this.bullets = [];
    }

    init(data) {
        this.frameDep = data.frameDep;
    }

    preload() {
        this.load.image("grass", "src/assets/Grass.png");
        this.load.image("player", "src/assets/MainPistol.png");
        this.load.image("bullet", "src/assets/9mm.png");
    }

    create() {
        this.add.tileSprite(0, 0, 3000, 3000, "grass").setOrigin(0, 0);
        this.player = new Player(this, 1500, 1500, "player").setScale(0.75, 0.75).setOrigin(0.35, 0.6);;

        this.cameras.main.startFollow(this.player).setBounds(0, 0, 3000, 3000);

        // Inputs
        this.moveLeft = this.input.keyboard.addKey("A");
        this.moveRight = this.input.keyboard.addKey("D");
        this.moveUp = this.input.keyboard.addKey("W");
        this.moveDown = this.input.keyboard.addKey("S");
    }

    update(time, delta) {
        // Toggle framerate dependance
        let deltaTime = 1;
        let frameRate = 1 / (delta / 1000);
        if (this.frameDep) {
            deltaTime = 60 / frameRate;
        }
        
        // Follow cursor
        let mousePos = new Phaser.Math.Vector2(this.input.mousePointer.x + this.cameras.main.scrollX, this.input.mousePointer.y + this.cameras.main.scrollY);
        let direction = new Phaser.Math.Vector2(mousePos.x - this.player.x, mousePos.y - this.player.y);
        let angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);
        this.player.setAngle(angle);

        // Player movement
        this.player.movePlayer(this.moveRight.isDown, this.moveLeft.isDown, this.moveUp.isDown, this.moveDown.isDown, deltaTime);
    
        // Shoot bullet
        if (this.input.activePointer.leftButtonDown()) {
            let bullet = this.player.shootGun();
            this.bullets.push(bullet);
        }
        
        // Move bullets and delete bullets that leave the map
        this.bullets.forEach(bullet => {
            bullet.moveBullet(deltaTime);
            
            if (bullet.x < -100 || bullet.x > 3100 || bullet.y < -100 || bullet.y > 3100) {
                bullet.destroy();
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
        });

    }
}