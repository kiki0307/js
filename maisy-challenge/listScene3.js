class listScene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene3' });
    }

    preload() {
        this.load.image('list_3','assets/list3.png');

        //mp3
        this.load.audio('time3', 'assets/countdown.mp3');

    }

    create () {

        this.add.image(0, 0, 'list_3').setOrigin(0, 0);

           // music
           this.time_Snd = this.sound.add('time3');
           this.time_Snd.play();
           window.count3 = this.time_Snd;
           window.count3.loop = true;

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });

    }

    delay10Seconds(){

        console.log("after 10 secs");
        window.count3.stop();
        this.scene.stop("listScene3");
        this.scene.start("level3");
        }  

}
