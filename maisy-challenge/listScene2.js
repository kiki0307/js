class listScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene2' });
    }

    preload() {
        this.load.image('list_2','assets/list2.png');

         //mp3
         this.load.audio('time2', 'assets/countdown.mp3');

    }

    create () {

        this.add.image(0, 0, 'list_2').setOrigin(0, 0);

         // music
         this.time_Snd = this.sound.add('time2');
         this.time_Snd.play();
         window.count2 = this.time_Snd;
         window.count2.loop = true;

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });


    }

    delay10Seconds(){

        console.log("after 10 secs");
        window.count2.stop();
        this.scene.stop("listScene2");
        this.scene.start("level2");
        }  

}
