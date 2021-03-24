// moving enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        this.liveCount = 3;
        this.meatCount = 0;

    }

preload() {

   // load images
   var map = this.load.tilemapTiledJSON('map3','assets/tiles3.json');
   this.load.spritesheet('tiles3','assets/Tiles3.png',
   {frameWidth:64,frameHeight:64});

//    player animations
   this.load.atlas('player', 'assets/Maisy.png', 'assets/Maisy.json');
   this.load.atlas('cat', 'assets/cat.png', 'assets/cat.json');
// life image
   this.load.image('heart', 'assets/life.png');

}

create() {

// load the map
var map = this.make.tilemap({key:'map3'});
var Tiles = map.addTilesetImage('Tiles3','tiles3');

// create the ground layer
this.groundLayer = map.createDynamicLayer('groundLayer',Tiles,0,0);
this.shelfLayer = map.createDynamicLayer('shelfLayer',Tiles,0,0);
this.meatLayer = map.createDynamicLayer('meatLayer',Tiles,0,0);
this.obstacleLayer = map.createDynamicLayer('obstacleLayer',Tiles,0,0);

//world boundaries
this.physics.world.bounds.width = this.groundLayer.width;
this.physics.world.bounds.height = this.groundLayer.height;

// Set starting and ending position using name
this.startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
this.endPoint = map.findObject("objectLayer", obj => obj.name === "endPoint");
 // cat position
this.cat1 = map.findObject("objectLayer", obj => obj.name === "cat1");
// this.cat2 = map.findObject("objectLayer", obj => obj.name === "cat2");

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

// create cat animation
this.anims.create({
    key:'cat_walk',
    frames:[
        {key: 'cat', frame: 'cat_1'},
        {key: 'cat', frame: 'cat_2'},
        {key: 'cat', frame: 'cat_3'},
       
    ],
    
frameRate:10,
repeat: -1
});


this.time.addEvent({ delay: 1000, callback: this.moveRightLeft1, callbackScope: this, loop: false });
this.time.addEvent({ delay: 1000, callback: this.moveRightLeft2, callbackScope: this, loop: false });

this.cat1 = this.physics.add.sprite(550, 350, 'cat').setScale(0.8).play('cat_walk');
this.cat2 = this.physics.add.sprite(550, 680, 'cat').setScale(0.8).play('cat_walk');

//overlap cat
this.physics.add.overlap(this.player, this.cat1, this.hitcat, null, this );
this.physics.add.overlap(this.player, this.cat2, this.hitcat, null, this );

// collider with cat
this.physics.add.collider(this.shelfLayer, this.cat2, this.hitcat, null, this);

// collide with obstacle layer
this.obstacleLayer.setCollisionByProperty({ obstacle: true });

this.physics.add.collider(this.obstacleLayer, this.player);

//   hit obstacle layer
this.obstacleLayer.setTileIndexCallback(21, this.hitobstacle, this);


// collide with fruit layer
this.meatLayer.setCollisionByProperty({ sausage: true });
this.meatLayer.setCollisionByProperty({ octopus: true });
this.meatLayer.setCollisionByProperty({ jam: true });
this.meatLayer.setCollisionByProperty({ tomatoSauce: true });
this.meatLayer.setCollisionByProperty({ crab: true });
this.meatLayer.setCollisionByProperty({ stingray: true });
this.meatLayer.setCollisionByProperty({ soySauce: true });
this.meatLayer.setCollisionByProperty({ beef: true });
this.meatLayer.setCollisionByProperty({ drumstick: true });
this.meatLayer.setCollisionByProperty({ fish: true });
this.meatLayer.setCollisionByProperty({ milk: true });
this.meatLayer.setCollisionByProperty({ cheese: true });
this.meatLayer.setCollisionByProperty({ salmon: true });

this.physics.add.collider(this.meatLayer, this.player);


//   collect vege items
this.meatLayer.setTileIndexCallback(4, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(5, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(10, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(12, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(13, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(17, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(19, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(20, this.collectmeat, this);
this.meatLayer.setTileIndexCallback(3, this.wrongmeat, this);
this.meatLayer.setTileIndexCallback(6, this.wrongmeat, this);
this.meatLayer.setTileIndexCallback(11, this.wrongmeat, this);
this.meatLayer.setTileIndexCallback(16, this.wrongmeat, this);
this.meatLayer.setTileIndexCallback(18, this.wrongmeat, this);

 // this text will show the score
 this.meatText = this.add.text(750, 50, this.meatCount, {
   fontSize: '30px',
   fill: '#221C48'
   });
  
   // fix the text to the camera
   this.meatText.setScrollFactor(0);
   this.meatText.visible = true;

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

// remove fruit
collectmeat(player, tile) {
    console.log('correctmeat', tile.index );
    this.meatLayer.removeTileAt(tile.x, tile.y); // remove the item
   
    this.meatCount += 1; 
    console.log(this.meatCount);
    this.meatText.setText(this.meatCount);
    return false;
    }
    
    wrongmeat(player, tile) {
    console.log('wrongmeat', this.liveCount );
    this.meatLayer.removeTileAt(tile.x, tile.y); // remove the item
    this.liveCount -= 1;
    
    
    // // Default is 3 lives
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
   //   this.scene.start("failScene3");
    }

   // No more lives, shake screen and restart the game
   if ( this.isDead ) {
   console.log("Player is dead!!!")
   // delay 1 sec
   this.time.delayedCall(2000,function() {
   // Reset counter before a restart
   this.isDead = false;
   this.liveCount = 3;
   this.meatCount = 0
   this.scene.start("failScene3");
   },[], this);
   }
    
    return false;
    }
    
    // remove obstacle
hitobstacle(player, tile) {
    console.log('obstacle', tile.index );
    this.obstacleLayer.removeTileAt(tile.x, tile.y); // remove the item
       // delay 1 sec
       this.time.delayedCall(500,function() {
         this.meatCount = 0
         this.liveCount = 3;
        // this.scene.restart();
       this.scene.start("failScene3");
    },[], this);
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
     if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y && this.meatCount > 7 ) {
      console.log('Collected 8 meat, jump to winScene');
      this.scene.stop("level3");
      this.scene.start("winScene");
  }

      
    
}

// cat movement
moveRightLeft1() {
    console.log('moveleft')
    this.tweens.timeline({
       targets: this.cat1,
       loop: -1, // loop forever
       ease: 'Linear',
       duration: 2000,
        tweens: [
       {
          x: 900,
       },
        {
          x: 550,
       },
     ]
     });
    }

    moveRightLeft2() {
        console.log('moveleft')
        this.tweens.timeline({
         targets: this.cat2,
         loop: -1, // loop forever
         ease: 'Linear',
         duration: 2000,
         tweens: [
         {
            x: 950,
         },
         {
            x: 550,
         },
         {
            x: 950,
         },
         ]
         });
        }

    hitcat(player, sprite){
        console.log("hitcat");
           
        sprite.disableBody (true, true);
        // this.bgmusicSnd.loop = false
        // this.bgmusicSnd.stop();
        // this.hitSnd.play();
        this.time.delayedCall(500,function() {
        this.meatCount = 0
        this.liveCount = 3;
        this.scene.start("failScene3");
        },[], this);
        
           
        return false;
        }


}