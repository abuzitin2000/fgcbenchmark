class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        
        // Global Variables
        this.acceleration = 0.5;
        this.deceleration = 0.5;
        this.maxspeed = 6;
        this.velocity = new Phaser.Math.Vector2(0, 0);
    }

    movePlayer(moveRight, moveLeft, moveUp, moveDown, deltaTime) {
        // Accelerate Right
        if (moveRight && this.velocity.x < this.maxspeed) {
            this.velocity.x += this.acceleration * deltaTime;
        }

        // Accelerate Left
        if (moveLeft && -1.0 * this.velocity.x < this.maxspeed) {
            this.velocity.x -= this.acceleration * deltaTime;
        }

        // Accelerate Up
        if (moveUp && this.velocity.y < this.maxspeed) {
            this.velocity.y += this.acceleration * deltaTime;
        }

        // Accelerate Down
        if (moveDown && -1.0 * this.velocity.y < this.maxspeed) {
            this.velocity.y -= this.acceleration * deltaTime;
        }

        // Decelerate Right
        if (!moveRight) {
            if (this.velocity.x > 0) {
                this.velocity.x -= this.deceleration * deltaTime;

                // Fix when decelerating over 0
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }
        }

        // Decelerate Left
        if (!moveLeft) {
            if (this.velocity.x < 0) {
                this.velocity.x += this.deceleration * deltaTime;

                // Fix when decelerating over 0
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            }
        }

        // Decelerate Up
        if (!moveUp) {
            if (this.velocity.y > 0) {
                this.velocity.y -= this.deceleration * deltaTime;

                // Fix when decelerating over 0
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
            }
        }

        // Decelerate Down
        if (!moveDown) {
            if (this.velocity.y < 0) {
                this.velocity.y += this.deceleration * deltaTime;

                // Fix when decelerating over 0
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                }
            }
        }

        // If an error happens and this.maxspeed is exceeded, set them back to max speed
        if (this.velocity.x > this.maxspeed) {
            this.velocity.x = this.maxspeed;
        } else if (-1.0 * this.velocity.x > this.maxspeed) {
            this.velocity.x = -1.0 * this.maxspeed;
        }

        if (this.velocity.y > this.maxspeed) {
            this.velocity.y = this.maxspeed;
        } else if (-1.0 * this.velocity.y > this.maxspeed) {
            this.velocity.y = -1.0 * this.maxspeed;
        }

        // Update the values
        let tempVelocity = new Phaser.Math.Vector2(this.velocity.x, this.velocity.y).normalize();
        tempVelocity.x *= Math.max(Math.abs(this.velocity.x), Math.abs(this.velocity.y));
        tempVelocity.y *= Math.max(Math.abs(this.velocity.x), Math.abs(this.velocity.y));

        // Set Position
        this.x += tempVelocity.x * deltaTime;
        this.y -= tempVelocity.y * deltaTime;
    }

    shootGun() {
        let bullet = new Bullet(this.scene, this.x, this.y, "bullet", 0, 10);
        bullet.setScale(0.1, 0.1).setAngle(this.angle);
        let fowardVector = new Phaser.Math.Vector2().setToPolar(bullet.rotation, 1);
        bullet.x += 50 * fowardVector.x; bullet.y += 50 * fowardVector.y;
        return bullet;
    }
}