class listScene1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene1' });
    }

    preload() {
        this.load.image('list_1','assets/list1.png');

        //mp3
        this.load.audio('time', 'assets/countdown.mp3');

    }
     

    create () {

        this.add.image(0, 0, 'list_1').setOrigin(0, 0);
        
        // music
        this.time_Snd = this.sound.add('time');
        this.time_Snd.play();
        window.count1 = this.time_Snd;
        window.count1.loop = true;

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });

    }

    

    delay10Seconds(){
    
    // this.timeSnd.play();
    console.log("after 10 secs");
    window.count1.stop();
    this.scene.stop("listScene1");
    this.scene.start("level1");
    }  

}
