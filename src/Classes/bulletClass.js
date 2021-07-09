class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        
        // Global Variables
        this.speed = speed;
    }

    moveBullet(deltaTime) {
        let fowardVector = new Phaser.Math.Vector2().setToPolar(this.rotation, 1);

        // Set Position
        this.x += fowardVector.x * this.speed * deltaTime;
        this.y += fowardVector.y * this.speed * deltaTime;
    }
}