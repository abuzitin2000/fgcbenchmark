var config = {
    type: Phaser.AUTO,
    "transparent": true,
    fps: {
        target: 30
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [
        loadMenu, mainMenu, settingsMenu, mixupScene, motionScene
    ],
    pixelArt: false,
    input: {
        gamepad: true
    }
};

var game = new Phaser.Game(config);

// Theme
var theme = "light";
var primaryColor = "#2B87D1";
var secondaryColor = "#FFFFFF";
var tetriaryColor = "#000000";
var defaultFont = "Impact";
var mobileFont = "sans-serif";