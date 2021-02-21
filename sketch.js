var ghost, ghost_image, ghost_jumping;
var tower, tower_image;
var climber, climber_image;
var door, door_image;
var invisible_block;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var sound;
var invisible_blockG, doorG, climberG;

function preload()
{
  ghost_image = loadImage("ghost-standing.png");
  tower_image = loadImage("tower.png");
  climber_image = loadImage("climber.png");
  door_image = loadImage("door.png");
  ghost_jumping = loadImage("ghost-jumping.png");
  sound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(width/2,height/2);
  tower.addImage(tower_image);

  ghost = createSprite(width/2, height/2, 10, 10);
  ghost.addImage(ghost_image);
  ghost.scale = 0.5;
  ghost.debug = false;
  ghost.setCollider("circle", 0, 30, 140)


  invisible_blockG = new Group();
  doorG = new Group();
  climberG = new Group();


}

function draw()
{
  background("black");


  if (gameState === PLAY)
  {

    tower.velocityY = 3;
    if (tower.y >500) 
    {
      tower.y =width/2;
    }
    if (keyDown("space")) 
    {
      ghost.velocityY = -6;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    if (keyWentDown("left")) 
    {
      ghost.velocityX = -5;
    }
    if (keyWentDown("right"))
    {
      ghost.velocityX = 5;
    }
    doors();
    if (ghost.isTouching(climberG))
    {
      //ghost.velocityX=0;
      // ghost.velocityY=0;
    }
    ghost.collide(climberG);
    if (ghost.collide(climberG))
    {
      doorG.setVelocityYEach(1);
      climberG.setVelocityYEach(1);
      invisible_blockG.setVelocityYEach(1);

    }
    if (ghost.isTouching(invisible_blockG))
    {
      gameState = END;
    }
    if(ghost.x<width-width-50 || ghost.x>width-50 || ghost.y>height || ghost.y<0)
      {
        gameState=END;
        
      }

  }

  console.log(tower.y);
  drawSprites();
  if (gameState === END)
  {
    fill("white")
    stroke("yellow")
    textSize(60);
    text("Gameover", 190, 300);
    ghost.velocityY=0;
    ghost.velocityX=0;
    tower.velocityY = 0;
    doorG.setVelocityYEach(0);
    climberG.setVelocityYEach(0);
    invisible_blockG.setVelocityYEach(0);
    doorG.setLifetimeEach(1000);
    climberG.setLifetimeEach(1000);
    invisible_blockG.setLifetimeEach(1000);
  }
}

function doors() 
{
  if (frameCount % 200 === 0) 
  {
    door = createSprite(200, -50, 10, 10);
    door.addImage(door_image);
    door.velocityY = 2;
    door.lifetime = 550;
    doorG.add(door);


    climber = createSprite(200, 10, 10, 10);
    climber.addImage(climber_image);
    climber.velocityY = 2;
    climber.lifetime = 550;
    climberG.add(climber);
    climber.debug = false;
    climber.setCollider("rectangle", 0, 0, 100, 10);



    invisible_block = createSprite(200, 15, 40, 10);
    invisible_block.visible = false;
    invisible_block.velocityY = 2;
    invisible_block.lifetime = 550;
    invisible_blockG.add(invisible_block)
    invisible_block.debug = false;
    door.x = Math.round(random(width-600, width-300))
    climber.x = door.x;
    invisible_block.x = climber.x;

  }

}