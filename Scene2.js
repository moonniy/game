class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
    this.background.setOrigin(0, 0);

    this.asteroid1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "asteroid");
    this.asteroid2 = this.add.sprite(config.width / 2, config.height / 2, "asteroid02");
    this.asteroid3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "asteroid03");


    this.asteroid1.setInteractive();
    this.asteroid2.setInteractive();
    this.asteroid3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();


    for (var i = 0; i < gameSettings.maxPowerups; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
       powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);

    }


    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
//    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // 4.1 create group to hold all our projectiles
    this.projectiles = this.add.group();


  }

  update() {

    this.moveShip(this.asteroid1, 1);
    this.moveShip(this.asteroid2, 2);
    this.moveShip(this.asteroid3, 3);
    // this.ship1.alpha = 0;
    // this.ship2.alpha = 0;
    // this.ship3.alpha = 0;

    this.background.tilePositionY -= 0.5;


    this.movePlayerManager();


    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
        // 2.1 call a function to create a beam instance
        this.shootBeam();
    }
    // 4.2 update all the beams
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }


  }

  // 2.2 create the shootBeam function
  shootBeam(){
    // 4.2 add the beam to the croup
    var beam = new Beam(this);
  }


  movePlayerManager(){

    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }



  moveShip(asteroid, speed) {
    asteroid.y += speed;
    if (asteroid.y > config.height) {
      this.resetShipPos(asteroid);
    }
  }

  resetShipPos(asteroid) {
    asteroid.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    asteroid.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }


}
