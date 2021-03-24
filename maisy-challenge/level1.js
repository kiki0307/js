// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.liveCount = 3;
        this.vegeCount = 0;
    }

preload() {

    // load images
    var map = this.load.tilemapTiledJSON('map','assets/tiles1.json');
    this.load.spritesheet('tiles','assets/Tiles1.png',
    {frameWidth:64,frameHeight:64});

    this.load.atlas('player', 'assets/Maisy.png', 'assets/Maisy.json');

    this.load.image('heart', 'assets/life.png');


}

create() {

        // load the map
        var map = this.make.tilemap({key:'map'});
        var Tiles = map.addTilesetImage('Tiles1','tiles');
        
        // create the ground layer
        this.groundLayer = map.createDynamicLayer('groundLayer',Tiles,0,0);
        this.shelfLayer = map.createDynamicLayer('shelfLayer',Tiles,0,0);
        this.vegeLayer = map.createDynamicLayer('vegeLayer',Tiles,0,0);

        //world boundaries
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        //object layers
        // var right = map.findObject("objectLayer", obj => obj.name === "Right");
        // var left = map.findObject("objectLayer", obj => obj.name === "Left");
        this.startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
        this.endPoint = map.findObject("objectLayer", obj => obj.name === "endPoint");

    
        //character sprites
        this.player = this.physics.add.sprite(this.startPoint.x, this.startPoint.y, 'player')
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);

        window.player = this.player;
    
        // create the player sprite
        // this.player = this.add.sprite(280, 40, 'player');
        
        // create life
        this.heart1 = this.add.image(50,530, 'heart').setScrollFactor(0);
        this.heart2 = this.add.image(120,530,'heart').setScrollFactor(0);
        this.heart3 = this.add.image(190,530,'heart').setScrollFactor(0);
    
       
        // create player animation
        this.anims.create({
        key:'side',
        frames:[
            {key: 'player', frame: 'side_1'},
            {key: 'player', frame: 'side_2'},
            {key: 'player', frame: 'side_3'},
            {key: 'player', frame: 'side_4'},
            {key: 'player', frame: 'side_5'},
            {key: 'player', frame: 'side_6'},
            {key: 'player', frame: 'side_7'},
            {key: 'player', frame: 'side_8'},
           
        ],
    
        frameRate:10,
        repeat: -1
        });
    
        this.anims.create({
        key:'front',
        frames:[
            {key: 'player', frame: 'front_1'},
            {key: 'player', frame: 'front_2'},
            {key: 'player', frame: 'front_3'},
            {key: 'player', frame: 'front_4'},
           
        ],
    
        frameRate:10,
        repeat: -1
        });
    
        this.anims.create({
        key:'back',
        frames:[
            {key: 'player', frame: 'back_1'},
            {key: 'player', frame: 'back_2'},
            {key: 'player', frame: 'back_3'},
            {key: 'player', frame: 'back_4'},
           
        ],
    
        frameRate:10,
        repeat: -1
        });

      // the this.player will collide with vege layer
      this.vegeLayer.setCollisionByProperty({ onion: true });
      this.vegeLayer.setCollisionByProperty({ carrot: true });
      this.vegeLayer.setCollisionByProperty({ brinjal: true });
      this.vegeLayer.setCollisionByProperty({ broccoli: true });
      this.vegeLayer.setCollisionByProperty({ pumpkin: true });
    
      this.physics.add.collider(this.vegeLayer, this.player);

      
    //   collect vege items
      this.vegeLayer.setTileIndexCallback(7, this.collectvege, this);
      this.vegeLayer.setTileIndexCallback(8, this.wrongvege, this);
      this.vegeLayer.setTileIndexCallback(11, this.collectvege, this);
      this.vegeLayer.setTileIndexCallback(12, this.wrongvege, this);
      this.vegeLayer.setTileIndexCallback(13, this.collectvege, this);

 
      this.vegeText = this.add.text(750, 50, this.vegeCount, {
        fontSize: '30px',
        fill: '#221C48'
        });
       
        // fix the text to the camera
        this.vegeText.setScrollFactor(0);
        this.vegeText.visible = true; 
  
  
      this.cursors = this.input.keyboard.createCursorKeys();

      // camera view
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);

      // create collder
      this.shelfLayer.setCollisionByProperty({shelf:true})
      this.shelfLayer.setCollisionByProperty({shelf2:true})
      this.shelfLayer.setCollisionByProperty({shelf3:true})
      this.shelfLayer.setCollisionByProperty({shelf4:true})

      this.physics.add.collider(this.shelfLayer,this.player);   
    
  }

  collectvege(player, tile) {
    console.log('correctvege', tile.index );
    this.vegeLayer.removeTileAt(tile.x, tile.y); // remove the item
    this.vegeCount += 1; 
   
    console.log(this.vegeCount);
    this.vegeText.setText(this.vegeCount);
    return false;
}

wrongvege(player, tile) {
    console.log('wrongvege', this.liveCount );
    this.vegeLayer.removeTileAt(tile.x, tile.y); // remove the item
    this.liveCount -= 1;
    

    // Default is 3 lives
    if ( this.liveCount === 2) {
        // this.explodeSnd.play();
        this.cameras.main.shake(200);
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
        // this.explodeSnd.play();
        this.cameras.main.shake(200);
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
        // this.explodeSnd.play();
        this.cameras.main.shake(1000);
        this.heart1.setVisible(false);
        this.isDead = true;
    }

// No more lives, shake screen and restart the game
if ( this.isDead ) {
    console.log("Player is dead!!!")
   // delay 1 sec
   this.time.delayedCall(2000,function() {
   // Reset counter before a restart
   this.isDead = false;
   this.liveCount = 3;
   this.scene.start("gameoverScene");
   },[], this);
   }



    return false;
}







update() {

    if (this.cursors.left.isDown)
    {
       console.log("left");
       this.player.body.setVelocityX(-300);
       this.player.anims.play('side', true); // walk left
       this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
       console.log("right");
       this.player.body.setVelocityX(300);
       this.player.anims.play('side', true);
       this.player.flipX = false; // use the original sprite looking to the right
    } 
    else if (this.cursors.up.isDown)
    {
       console.log("back");
       this.player.body.setVelocityY(-300);
       this.player.anims.play('back', true);
    }
    else if (this.cursors.down.isDown)
    {
       console.log("front");
       this.player.body.setVelocityY(300);
       this.player.anims.play('front', true);
    }

    else {
       this.player.body.setVelocity(0);
       this.player.anims.stop();
    } 

     // Check for the vegeCount
     if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y && this.vegeCount > 2 ) {
        console.log('Collected 3 vege, jump to level 2');
        this.scene.stop("level1");
        this.scene.start("listScene2");
    }

       // Check for reaching endPoint object
    // if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
    //     console.log('Reached endPoint, loading next level');
    //     this.scene.stop("level1");
    //     this.scene.start("level2");
    // }
        // this text will show the score
     
      


    
}

 


}