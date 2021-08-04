class Switch extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, defaultText, clickedText) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        
        this.highlights = [];
        this.borderSize = 5;

        //this.fillHighlight();
        
    }

    fillHighlight() {
        this.highlights.forEach(highlight => {
            highlight.destroy();
        });

        this.highlights = [];

        for (let i = 0; i < 4; i++) {
            this.highlights.push(this.scene.add.graphics({
                fillStyle: {
                    color: 0x000000
                }
            }));
        }

        this.highlights[0].fillRect(this.getTopLeft().x, this.getTopLeft().y, this.width + this.borderSize, -this.borderSize);
        this.highlights[1].fillRect(this.getBottomRight().x, this.getBottomRight().y, -this.width - this.borderSize, this.borderSize);
        this.highlights[2].fillRect(this.getBottomLeft().x, this.getBottomLeft().y, -this.borderSize, -this.height - this.borderSize);
        this.highlights[3].fillRect(this.getTopRight().x, this.getTopRight().y, this.borderSize, this.height + this.borderSize);
    }
}