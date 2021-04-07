class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/gameOver1.png');

        this.load.audio('failmusic1', 'assets/fail.mp3');

    }

    create () {

        this.add.image(0, 0, 'gameover').setOrigin(0, 0);

        this.failmusic_Snd = this.sound.add('failmusic1');
        this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is gameoverScene1");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

        aDown.on('down', function(){
            // console.log("A pressed (main menu)");
            this.scene.stop("gameoverScene");
            this.scene.start("mainScene");
            }, this );

    }

}
