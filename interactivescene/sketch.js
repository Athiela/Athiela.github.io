// Rock paper scissors game
// Athiela A.
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//////////// Global Variables ///////////////////////////

let cardR, cardP, cardS, xCardR, yCardR, xCardP, yCardP, xCardS, yCardS, cardWidthRock, cardHR, cardWP, cardHP, cardWS, cardHS, title, cardFrame, playButton, howToPlayButton;
let playButtonWidth, howToPlayButtonWidth, playButtonHeight, howToPlayButtonHeight, xHowToPlayButton, yHowToPlayButton, xPlayButton, yPlayButton;
let hoverHowToPlay, hoverPlay;

let state = "start";

let flashFrame = "firstFlash";
let firstFlash = 1000;
let secondFlash = 1000;
let thirdFlash = 3000;
let switchTime = 0; 

let rockHover = false;
let paperHover = false;
let scissorsHover = false;
let playButtonHover = false;
let howToPlayButtonHover = false;

//////////// Load Images //////////////////////////

function preload() {
  title = loadImage("assets/title.png");
  
  cardR = loadImage("assets/cardRock.png");
  cardP = loadImage("assets/cardPaper.png");
  cardS = loadImage("assets/cardScissors.png");

  cardFrame = loadImage("assets/cardFrame.png");
  
  playButton = loadImage("assets/playButton.png");
  howToPlayButton = loadImage("assets/howToPlayButton.png");
  
  hoverPlay = loadImage("assets/hoverPlayButton.png");
  hoverHowToPlay = loadImage("assets/hoverHowToPlayButton.png");
}

/////////////////// Setup //////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  xCardR = width/4;
  yCardR = height/2;
  
  xCardP = width/2;
  yCardP = height/2;
  
  xCardS = width/1.3;
  yCardS = height/2;
  cardWidthRock = width/6;
  cardHR = height/2.2;
  
  cardWP = width/6;
  cardHP = height/2.2;
  
  cardWS = width/6;
  cardHS = height/2.2;

  xHowToPlayButton = width/2;
  yHowToPlayButton = height/1.3;

  xPlayButton = width/2;
  yPlayButton = height/2;

  playButtonWidth = width/4;
  howToPlayButtonWidth = width/4;

  playButtonHeight = height/5;
  howToPlayButtonHeight = height/5;
}

function draw() {
  background(43);
  gameState();
  
}

/////////////// Game State //////////////////////////////

function gameState() {
  if (state === "start") {
    displayPlayButton();
    displayHowToPlayButton();
    displayStartTitle();

    hoverStartButtons();
    pressPlay();
    
  }
  if (state === "play") {
    hoverCards();
    displayCardR();
    displayCardP();
    displayCardS();
    
    displayTitle();
    displayRockFrame();
    displayPaperFrame();
    displayScissorsFrame();
  }
} 

////////// Display image functions /////////////////

function displayTitle() {
  image(title, width / 2, height /7, 200, 100);
}

function displayCardR() {
  image(cardR, xCardR, yCardR, cardWidthRock, cardHR);
}

function displayCardP() {
  image(cardP, xCardP, yCardP, cardWP, cardHP);
}

function displayCardS() {
  image(cardS, xCardS, yCardS, cardWS, cardHS);
}

function displayRockFrame() {
  if (rockHover === true) {
    image(cardFrame, xCardR, yCardR, cardWidthRock + 105, cardHR + 155);
  }
}

function displayPaperFrame() {
  if (paperHover === true) {
    image(cardFrame, xCardP, yCardP, cardWP + 105, cardHP + 155);
  }
}

function displayScissorsFrame() {
  if (scissorsHover === true) {
    image(cardFrame, xCardS, yCardS, cardWS + 105, cardHS + 155);
  }
}
///////////// Game = Start Functions /////////////////////

function displayPlayButton() {
  image(playButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
}
function displayHowToPlayButton() {
  image(howToPlayButton, xHowToPlayButton, yHowToPlayButton, howToPlayButtonWidth, howToPlayButtonHeight);
}
function displayStartTitle() {
  image(title, width / 2, height / 4, 400, 200);
}
function displayHoverPlay() {
  image(hoverPlay, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
}
function displayHoverHowToPlay() {
  image(hoverHowToPlay, xHowToPlayButton, yHowToPlayButton, howToPlayButtonWidth, howToPlayButtonHeight);
}

///////////// Game = Play Functions /////////////////////

function hoverStartButtons() {
  if (mouseX > xPlayButton - playButtonWidth/2 && mouseX < xPlayButton + playButtonWidth/2 && mouseY > yPlayButton - playButtonHeight/2 && mouseY < yPlayButton + playButtonHeight/2) {
    displayHoverPlay();
  }
  else {
    displayPlayButton();
  }
  if (mouseX > xHowToPlayButton - howToPlayButtonWidth/2 && mouseX < xHowToPlayButton + howToPlayButtonWidth/2 && mouseY > yHowToPlayButton - howToPlayButtonHeight/2 && mouseY < yHowToPlayButton + howToPlayButtonHeight/2) {
    displayHoverHowToPlay();
  }
  else {
    displayHowToPlayButton();
  }
}


function hoverCards() {
  if (
    mouseX > xCardR - cardWidthRock / 2 &&
    mouseX < xCardR + cardWidthRock / 2 &&
    mouseY > yCardR - cardHR / 2 &&
    mouseY < yCardR + cardHR / 2
  ) {
    rockHover = true;
  } 
  else {
    rockHover = false;
  }

  if (
    mouseX > xCardP - cardWP / 2 &&
    mouseX < xCardP + cardWP / 2 &&
    mouseY > yCardP - cardHP / 2 &&
    mouseY < yCardP + cardHP / 2
  ) {
    paperHover = true;
  } 
  else {
    paperHover = false;
  }

  if (
    mouseX > xCardS - cardWS / 2 &&
    mouseX < xCardS + cardWS / 2 &&
    mouseY > yCardS - cardHS / 2 &&
    mouseY < yCardS + cardHS / 2
  ) {
    scissorsHover = true;
  } 
  else {
    scissorsHover = false;
  }
}

////////////// Press Buttons ///////////////

function pressPlay() {
  if (mouseX > xPlayButton - playButtonWidth/2 && mouseX < xPlayButton + playButtonWidth/2 && mouseY > yPlayButton - playButtonHeight/2 && mouseY < yPlayButton + playButtonHeight/2 && mouseIsPressed) {
    state = "play";
  }
}
function chooseRock() {
  if (
    mouseX > xCardR - cardWidthRock / 2 &&
    mouseX < xCardR + cardWidthRock / 2 &&
    mouseY > yCardR - cardHR / 2 &&
    mouseY < yCardR + cardHR / 2 &&
    mouseIsPressed
  ) {
    state = "choseRock";
  }
  if (
    mouseX > xCardP - cardWP / 2 &&
    mouseX < xCardP + cardWP / 2 &&
    mouseY > yCardP - cardHP / 2 &&
    mouseY < yCardP + cardHP / 2
  ) {
    state = "chosePaper";
  }

  if (
    mouseX > xCardS - cardWS / 2 &&
    mouseX < xCardS + cardWS / 2 &&
    mouseY > yCardS - cardHS / 2 &&
    mouseY < yCardS + cardHS / 2
  ) {
    state = "choseScissors";
  } 
}