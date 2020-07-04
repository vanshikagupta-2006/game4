var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner;
var ground;
var ObstaclesGroup;
var count;
var runnerImage;
var obstacleImage;
var invisibleGround;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var groundImage;
var canvas;

function preload(){
  runnerImage = loadImage("images/runner.png");
  obstacle1 = loadImage("images/obstacle1-real.png");
  obstacle2 = loadImage("images/obstacle2-real.png");
  obstacle3 = loadImage("images/obstacle3-actual.png");
  obstacle4 = loadImage("images/obstacle4-real.png");
  groundImage = loadImage("images/background.jpg");
}

function setup(){
canvas = createCanvas(1200, 600);
   invisibleGround = createSprite(400, 380,800,5);
   ground = createSprite(1200 , 550);
  runner = createSprite(100, 370 , 10, 10);
  //obstacle = createSprite(120, 200, 40, 40);
  //obstacle2 = createSprite(140, 200, 40, 40);
  //obstacle3 = createSprite(195, 200, 40, 40);
  //obstacle4 = createSprite(220, 200, 40, 40);
  runner.addImage("runner", runnerImage );
  ground.addImage("ground", groundImage);
  runner.scale = 0.3;
  
  //create Obstacle
 ObstaclesGroup = createGroup();

 //set collision radius for the trex
runner.setCollider("circle",0,0,20);
runner.debug = true;
//scale and position the trex

runner.x = 50;

//create a ground sprite

//ground.setAnimation("ground2");
ground.x = ground.width /2;
ground.scale = 2;
//invisible Ground to support Trex

invisibleGround.visible = false;
//ground.scale = 5;
}


function draw() {
  
  //set background to white
  background("white");
  




//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
 count = 0;
 console.log(getFrameRate);
  //display score
  //count = frameCount;
  count = count + Math.round(getFrameRate());
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6+3*count/100);
    //scoring
    

    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && runner.y >= 285){
      runner.velocityY = -12 ;
      
    }
  
    //add gravity
    runner.velocityY = runner.velocityY + 0.8;
    
    //spawn the clouds
    //spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(runner)){
      gameState = END;
      
    }
   
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    runner.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    //CloudsGroup.setVelocityXEach(0);
    
    
    text("dead", 200, 200 );
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    //CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    //var gameOver = createSprite(200,300);
    //var restart = createSprite(200,340);
    
    //gameOver.setAnimation("gameOver");
    //gameOver.scale = 0.5;
    //restart.setAnimation("restart");
    //restart.scale = 0.5;
  }
  
 // console.log(runner.y);
  
  //stop trex from falling down
  runner.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,340,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*count/100);
    obstacle.setCollider("circle", 0, 0, 100);
    obstacle.debug= true;
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
      default: break;
      
   
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}