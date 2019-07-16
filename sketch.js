var trex_anim, trex_lost, trex, bottom_I, bottom, ground, gameState, count, highcount, obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5, obstacle_6, rand, cloud_I, cloud, cloGroup, ObsGroup, restart_I, restart, gameOver_I, gameOver;

function preload() {
  trex_anim = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_lost = loadImage("trex_collided.png");
  bottom_I = loadImage("ground2.png");
  obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");
  cloud_I = loadImage("cloud.png");
  restart_I = loadImage("restart.png");
  gameOver_I = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 400);
  rand = random(1, 6);
  //cloGroup = createGroup;
  trex = createSprite(50, 299, 50, 50);
  trex.addAnimation("trex", trex_anim);
  bottom = createSprite(300, 300, 600, 5);
  bottom.addImage("bottom__", bottom_I);
  bottom.velocityX = -6;
  bottom.x = bottom.width / 2;
  ground = createSprite(300, 310, 600, 1);
  ground.visible = false;
  gameState = "Play";
  count = 0;
  highcount = 0;
  restart = createSprite(300,200);
  restart.addImage("restart_", restart_I);
  restart.visible = false;
  restart.scale=0.5;
  gameOver = createSprite(300,230);
  gameOver.addImage("gameOver_", gameOver_I);
  gameOver.visible=false;
  gameOver.scale=0.5;
}

function draw() {
  spawnClouds();
  spawnObstacle();
  background(255);
  trex.scale = 0.5;
  fill("black");
  noStroke();
  textStyle(BOLD);
  textSize(20);
  textFont(" Calibri");
  text("Score: " + count, 270, 175);
  text("High Score: " + highcount, 230, 155);
  if (gameState === "Play") {
    bottom.velocityX = -(6 + 3 * count / 100);
    
    if (bottom.x < 0) {
      bottom.x = bottom.width / 2;
    }
    if (keyDown("space") && trex.y > 280) {
      trex.velocityY = -15;
    }
    trex.velocityY = trex.velocityY + 0.5;

    count = count + Math.round(World.frameRate / 60);
    if(keyDown("enter")) {
      gameState="End"; 
    }
  } else if (gameState === "End") {
    gameOver.visible=true;
    restart.visible=true;
    bottom.velocityX=0;
  if (count > highcount) {
      highcount = count
    }
  }
  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(ground);

  drawSprites();
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(640, 285, 50, 50);
    obstacle.scale = 0.5
    obstacle.velocityX = -(6 + 3 * count / 100);
    var rand1 = Math.round(random(1, 6));
    switch (rand1) {
      case 1:
        obstacle.addImage(obstacle_1);
        break;
      case 2:
        obstacle.addImage(obstacle_2);
        break;
      case 3:
        obstacle.addImage(obstacle_3);
        break;
      case 4:
        obstacle.addImage(obstacle_4);
        break;
      case 5:
        obstacle.addImage(obstacle_5);
        break;
      case 6:
        obstacle.addImage(obstacle_6);
        break;
      default:
        break;
    }
    obstacle.lifetime = 110;

  }
}

function spawnClouds() {
  if (World.frameCount % 60 === 0) {
    cloud = createSprite(600, 200, 10, 10);
    cloud.addImage("clo", cloud_I);
    cloud.y = random(120, 240);
    cloud.scale = 0.6;
    cloud.velocityX = -6;
    cloud.lifetime = 105;
  }
}