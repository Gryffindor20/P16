var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var pinkCyclist, pinkCyclistImg, pinkCyclistImg2, pinkGroup;
var redCyclist, redCyclistImg, redCyclistImg2, redGroup;
var yellowCyclist, yellowCyclistImg, yellowCyclistImg2, yellowGroup;

var obstacles, obstacle1, obstacle2, obstacle3, obstacleG;

var gameOver, gameOverImg;

var bellSound;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");


  mainRacerImg1 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer3.png");
  pinkCyclistImg = loadAnimation("opponent1.png", "opponent2.png");
  redCyclistImg = loadAnimation("opponent7.png", "opponent8.png");
  yellowCyclistImg = loadAnimation("opponent4.png", "opponent5.png");

  pinkCyclistImg2 = loadAnimation("opponent3.png");
  redCyclistImg2 = loadAnimation("opponent9.png");
  yellowCyclistImg2 = loadAnimation("opponent6.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");

  gameOverImg = loadImage("gameOver.png");

  bellSound = loadSound("bell.mp3");


}

function setup() {

  createCanvas(1250, 300);

  // Moving background
  path = createSprite(300, 150);
  path.addImage(pathImg);


  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("main", mainRacerImg1);
  mainCyclist.addAnimation("main2", mainRacerImg2);
  mainCyclist.scale = 0.07;

  gameOver = createSprite(625, 150, 0, 0);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  yellowGroup = createGroup();
  redGroup = createGroup();
  pinkGroup = createGroup();
  obstacleG = createGroup();

  mainCyclist.setCollider("rectangle", 0, 0, 1300, 1300)
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);


  if (gameState === PLAY) {
    mainCyclist.y = World.mouseY;
    cyclists();
    obstacle();
    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    path.velocityX = -(5 + 2 * distance / 150);

    gameOver.visible = false;

    if (keyWentDown("space")) {
      bellSound.play();
    }

    distance = round(frameCount / 50);

    if (mainCyclist.isTouching(redGroup)) {

      redCyclist.changeAnimation("red2", redCyclistImg2);
      gameState = END
    }
    if (mainCyclist.isTouching(pinkGroup)) {
      pinkCyclist.changeAnimation("pink2", pinkCyclistImg2);
      gameState = END;
    }
    if (mainCyclist.isTouching(yellowGroup)) {
      yellowCyclist.changeAnimation("yellow2", yellowCyclistImg2);
      gameState = END;
    }
    if(mainCyclist.isTouching(obstacleG)){
      gameState = END;
    }
    if (path.x < 0) {
      path.x = width / 2;
    }

  }
  if (gameState == END) {
    path.velocityX = 0;
    mainCyclist.changeAnimation("main2", mainRacerImg2);
    redGroup.setVelocityXEach(0);
    pinkGroup.setVelocityXEach(0);
    yellowGroup.setVelocityXEach(0);
    obstacleG.setVelocityXEach(0);

    redGroup.setLifetimeEach(-1);
    pinkGroup.setLifetimeEach(-1);
    yellowGroup.setLifetimeEach(-1);
    obstacleG.setLifetimeEach(-1);

    gameOver.visible = true;
    text("Press the up arrow to restart", 500, 210);

    if (keyWentDown("up")) {
      reset();
    }
  }
}

function cyclists() {
  if (frameCount % 250 == 0) {
    var num = round(random(1, 3));
    console.log(num);

    switch (num) {
      case 1:
        redCyclists();
        break;
      case 2:
        yellowCyclists();
        break;
      case 3:
        pinkCyclists();
        break;
    }
  }
}

function redCyclists() {
  redCyclist = createSprite(1250, random(58, 213));
  redCyclist.addAnimation("red", redCyclistImg);
  redCyclist.addAnimation("red2", redCyclistImg2);
  redCyclist.scale = 0.06;
  redCyclist.velocityX = -(5 + 2 * distance / 150);
  redCyclist.lifetime = 250;
   redCyclist.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
  redGroup.add(redCyclist);
}

function pinkCyclists() {
  pinkCyclist = createSprite(1250, random(58, 213));
  pinkCyclist.addAnimation("pink", pinkCyclistImg);
  pinkCyclist.addAnimation("pink2", pinkCyclistImg2);
  pinkCyclist.scale = 0.06;
  pinkCyclist.velocityX = -(5 + 2 * distance / 150);
  pinkCyclist.lifetime = 250;
   pinkCyclist.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
  pinkGroup.add(pinkCyclist);
}

function yellowCyclists() {
  yellowCyclist = createSprite(1250, random(58, 213));
  yellowCyclist.addAnimation("yellow", yellowCyclistImg);
  yellowCyclist.addAnimation("yellow2", yellowCyclistImg2);
  yellowCyclist.velocityX = -(5 + 2 * distance / 150);
  yellowCyclist.scale = 0.06
  yellowCyclist.lifetime = 250;
   yellowCyclist.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
  yellowGroup.add(yellowCyclist);
}

function reset() {
  redGroup.destroyEach();
  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  obstacleG.destroyEach();

  mainCyclist.changeAnimation("main", mainRacerImg1);

  gameState = PLAY;

  distance = 0;

  frameCount = 0;
}

function obstacle() {
  if (frameCount % 150 == 0) {
    obstacles = createSprite(1250, random(58, 213))
    var num2 = round(random(1, 3))
    obstacles.scale = 0.08
    obstacles.velocityX = -(5 + 2 * distance / 150);

    switch (num2) {

      case 1:
        obstacles.addImage(obstacle1);
        break;
      case 2:
        obstacles.addImage(obstacle2);
        break;
      case 3:
        obstacles.addImage(obstacle3);
        break;
    }
     obstacles.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    obstacles.lifetime = 250;
    obstacleG.add(obstacles);
  }
}