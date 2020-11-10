
var monkey , monkey_running,ground,groundImg;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var monkeyStop;
var survivaltime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisible;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg=loadImage("ground.jpg");
  monkeyStop=loadImage("sprite_1.png");
 
}



function setup() {
    //ground
  ground=createSprite(400,350,900,10);
 // ground.addImage("ground",groundImg);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //console.log(ground.x);
  
  invisible=createSprite(400,390,900,10);
  invisible.visible=false;
  
  //monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
  createEdgeSprites();
  background("white");
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,50,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate());
  text("Survival Time "+survivalTime,100,50);

    if (ground.x<0){
      ground.x = ground.width/2;
    }
  
  //playyy
  if(gameState===PLAY){
  if(frameCount%80===0){
    createBanana();
  }
  
  if(frameCount%300===0){
    createStone();
  }
  
  if(keyWentDown('Space')){
    monkey.velocityY=-12;
  }
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    //console.log(gameState+"gamestate");
    
    if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  monkey.velocityY=monkey.velocityY+0.8;
  }else if(gameState===END){
   ground.velocityX=0;
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
    monkey.velocityY=0;
}
   drawSprites();
}
function createBanana(){
  banana=createSprite(200,200,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.y=round(random(120,200));
  banana.x=round(random(100,200));
  banana.velocityX=-2;
  foodGroup.add(banana);
  foodGroup.lifetime=200;
}
function createStone(){
  obstacle=createSprite(10,330,20,20);
  obstacle.collide(invisible);
  obstacle.addImage("stone",obstacleImage);
  obstacle.x=round(random(200,300));
  obstacle.velocityX=-2;
  obstacle.scale=0.1;
  obstacle.debug=false;
  obstacleGroup.add(obstacle);
}