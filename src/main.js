var config = {
    type: Phaser.AUTO,
    backgroundColor: 0xE6E8F4,
    fps: {
        target: 30
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768
    },
    scene: [
        loadMenu, mainMenu, mixupScene
    ],
    pixelArt: false,
    input: {
        gamepad: true
    }
};

var game = new Phaser.Game(config);

// Theme
const primaryColor = "#2B87D1";
const secondaryColor = "#FFFFFF";
const tetriaryColor = "#000000";