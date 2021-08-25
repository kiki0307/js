class storyScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyScene' });
    }

    preload() {

        this.load.image(
            'storyPage1','assets/bg_storyScene.jpg'
          );
        this.load.image('storyPage','assets/story.jpg');

        // this.load.audio('failmusic2', 'assets/fail.mp3');

    }

    create () {
        this.background = this.add.image(400, 300, "storyPage1");

        this.add.image(400, 300, 'storyPage').setScale(0.87);

        // this.failmusic_Snd = this.sound.add('failmusic2');
        // this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("storyScene");
        this.scene.start("introlevelsScene");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
