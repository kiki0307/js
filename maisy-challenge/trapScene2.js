class trapScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'trapScene2' });
    }

    preload() {
        this.load.image('trap_2','assets/failTrap2.png');

        this.load.audio('failmusic2', 'assets/fail.mp3');

    }

    create () {

        this.add.image(0, 0, 'trap_2').setOrigin(0, 0);

        this.failmusic_Snd = this.sound.add('failmusic2');
        this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is trapScene2");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("trapScene2");
        this.scene.start("level2");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
