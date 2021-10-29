// Rock paper scissors game
// Athiela A.
// Date 09/26/2021


//////////// Global Variables ///////////////////////////

let cardR, cardP, cardS, xCardRock, yCardRock, xCardPaper, yCardPaper, xCardScissors, yCardScissors, cardWidth, cardHeight, title, cardFrame, playButton, howToPlayButton;
let playButtonWidth, howToPlayButtonWidth, playButtonHeight, howToPlayButtonHeight, xHowToPlayButton, yHowToPlayButton, xPlayButton, yPlayButton;
let hoverHowToPlay, hoverPlay, startTitle, pressEsc;
let menuButton, youWin, youLose, playAgain, howToPlayMenu, exitMenu, xExitMenu, yExitMenu, exitMenuWidth, exitMenuHeight;
let exitButton, hoverExit, hoverKeybind, keybind, keybindMenu, pressEnter;
let xExitButton, yExitButton, exitButtonWidth, exitButtonHeight, xKeybind, yKeybind, keybindWidth, keybindHeight, xMenu, yMenu, menuWidth, menuHeight, areYouSureExit, otherPressEnter, youChoseRock, youChosePaper, youChoseScissors;

let state = "start";

let result = ["win", "lose"];

let rockHover = false;
let paperHover = false;
let scissorsHover = false;
let playButtonHover = false;
let howToPlayButtonHover = false;
let HowPlayMenu = false;

//////////// Load Images //////////////////////////

function preload() {

  startTitle = loadImage("assets/startTitle.png");
  title = loadImage("assets/title.png");
  menuButton = loadImage("assets/menuButton.png");
  howToPlayMenu = loadImage("assets/howPlayMenu.png");
  exitMenu = loadImage("assets/exitMenuButton.png");
  
  cardR = loadImage("assets/cardRock.png");
  cardP = loadImage("assets/cardPaper.png");
  cardS = loadImage("assets/cardScissors.png");

  cardFrame = loadImage("assets/cardFrame.png");
  
  playButton = loadImage("assets/playButton.png");
  howToPlayButton = loadImage("assets/howToPlayButton.png");
  
  hoverPlay = loadImage("assets/hoverPlayButton.png");
  hoverHowToPlay = loadImage("assets/hoverHowToPlayButton.png");

  playAgain = loadImage("assets/playAgainButton.png");
  youLose = loadImage("assets/youLose.png");
  youWin = loadImage("assets/youWin.png");

  hoverExit = loadImage("assets/hoverExitButton.png");
  hoverKeybind = loadImage("assets/hoverKeybindsButton.png");
  keybind = loadImage("assets/keybindButton.png");
  keybindMenu = loadImage("assets/keybindMenu.png");
  pressEnter = loadImage("assets/pressEnter.png");
  exitButton = loadImage("assets/exitButton.png");
  areYouSureExit = loadImage("assets/areYouSureExit.png");
  otherPressEnter = loadImage("assets/otherPressEnter.png");
  youChoseRock = loadImage("assets/youChoseRock.png");
  youChosePaper = loadImage("assets/youChosePaper.png");
  youChoseScissors = loadImage("assets/youChoseScissors.png");
  pressEsc = loadImage("assets/pressEscExit.png");
}

/////////////////// Setup //////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  xCardRock = width/4;
  yCardRock = height/2;
  
  xCardPaper = width/2;
  yCardPaper = height/2;
  
  xCardScissors = width/1.3;
  yCardScissors = height/2;
  cardWidth = width/6;
  cardHeight = height/2.2;

  xHowToPlayButton = width/2;
  yHowToPlayButton = height/1.3;

  xPlayButton = width/2;
  yPlayButton = height/2;

  playButtonWidth = width/4;
  howToPlayButtonWidth = width/4;

  playButtonHeight = height/5;
  howToPlayButtonHeight = height/5;

  xExitMenu = width/20;
  yExitMenu = height/12;
  exitMenuWidth = width/15;
  exitMenuHeight = height/10;

  xExitButton = width/2;
  yExitButton = height/2;
  exitButtonWidth = width/4;
  exitButtonHeight = height/5;

  xKeybind = width/2;
  yKeybind = height/1.3;
  keybindWidth = width/4;
  keybindHeight = height/5;

  xMenu = width/20;   
  yMenu = height/12;
  menuWidth = width/15;
  menuHeight = height/10;
}

function draw() {
  background(43);
  gameState();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/////////////// Game State //////////////////////////////

function gameState() {
  if (state === "start") {
    restoreResult();
    displayPlayButton();
    displayHowToPlayButton();
    displayStartTitle();

    hoverStartButtons();
    pressPlay();
    pressHowToPlay();
  }
  else if (state === "howToPlayMenu") {
    displayStartTitle();
    displayhowToMenu();  
    displayExitMenu();
    
    pressExitHowToPlayMenu();
  }
  else if (state === "pressEnter") {
    displayPressEnter();
    pressKeyEnter();
  }
  else if (state === "play") {
    displayCardRock();
    displayCardPaper();
    displayCardScissors();
    displayRockFrame();
    displayPaperFrame();
    displayScissorsFrame();
    displayMenuButton();

    displayTitle();
    hoverCards();
    
    pressRockCard();
    pressPaperCard();
    pressScissorsCard();
    pressMenu();
  }
  else if (state === "menu") {
    displayExitButton();
    displayHoverExitButton();
    displayKeybindButton();
    displayHoverKeybindButton();
    
    hoverMenuButtons();
    displayStartTitle();
    
    pressExitButton();
    pressKeybindButton();
  }
  else if (state === "areYouSureExit") {
    displayAreYouSureExit();
    pressEnterToExit();
  }
  else if (state === "keybind") {
    displayKeybindMenu();
    pressExitKeybindMenu();
  }
  else if (state === "choseRock") {
    displayCardRock();
    displayYouChoseRock();
    displayOtherPressEnter();
    changeCardRockPos();
    alreadyChoseCard();
  }
  else if (state === "chosePaper") {
    displayCardPaper();
    displayYouChosePaper();
    displayOtherPressEnter();
    alreadyChoseCard();
  }
  else if (state === "choseScissors") {
    displayCardScissors();
    displayYouChoseScissors();
    displayOtherPressEnter();
    changeCardScissorsPos();
    alreadyChoseCard();
  }
  else if (state === "results") {
    randomResult();

  }
  else if (state === "youWin") {
    displayYouWin();
    displayPressEsc();
    pressEscExit();
    restoreCardPos();
  }
  else if (state === "youLose") {
    displayYouLose();
    displayPressEsc();
    pressEscExit();
    restoreCardPos();
  }
}

////////// Display image functions /////////////////

function displayTitle() {
  image(title, width / 2, height /7, 200, 100);
}

function displayCardRock() {
  image(cardR, xCardRock, yCardRock, cardWidth, cardHeight);
}

function displayCardPaper() {
  image(cardP, xCardPaper, yCardPaper, cardWidth, cardHeight);
}

function displayCardScissors() {
  image(cardS, xCardScissors, yCardScissors, cardWidth, cardHeight);
}

function displayRockFrame() {
  if (rockHover === true) {
    image(cardFrame, xCardRock, yCardRock, cardWidth + 105, cardHeight + 155);
  }
}

function displayPaperFrame() {
  if (paperHover === true) {
    image(cardFrame, xCardPaper, yCardPaper, cardWidth + 105, cardHeight + 155);
  }
}

function displayScissorsFrame() {
  if (scissorsHover === true) {
    image(cardFrame, xCardScissors, yCardScissors, cardWidth + 105, cardHeight + 155);
  }
}

function displayhowToMenu() {
  image(howToPlayMenu, width/2, height/2, width/2, height/1.5);
}
function displayExitMenu() {
  image(exitMenu, width/20, height/12, width/15, height/10);
}

function displayPlayButton() {
  image(playButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
}
function displayHowToPlayButton() {
  image(howToPlayButton, xHowToPlayButton, yHowToPlayButton, howToPlayButtonWidth, howToPlayButtonHeight);
}
function displayStartTitle() {
  image(startTitle, width / 2, height / 4, 400, 200);
}
function displayHoverPlay() {
  image(hoverPlay, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
}
function displayHoverHowToPlay() {
  image(hoverHowToPlay, xHowToPlayButton, yHowToPlayButton, howToPlayButtonWidth, howToPlayButtonHeight);
}

function displayMenuButton() {
  image(menuButton, xMenu, yMenu, menuWidth, menuHeight);
}

function displayExitButton() {
  image(exitButton, xExitButton, yExitButton, exitButtonWidth, exitButtonHeight);
}

function displayHoverExitButton() {
  image(hoverExit, xExitButton, yExitButton, exitButtonWidth, exitButtonHeight);
}

function displayKeybindButton() {
  image(keybind, xKeybind, yKeybind, keybindWidth, keybindHeight);
}

function displayHoverKeybindButton() {
  image(hoverKeybind, xKeybind, yKeybind, keybindWidth, keybindHeight);
}

function displayKeybindMenu() {
  image(keybindMenu, width/2, height/2, width/2, height/1.5);
}

function displayPressEnter() {
  image(pressEnter, width /2, height /2, width/3, height/3);
}

function displayAreYouSureExit() {
  image(areYouSureExit, width/2, height/2, width/2, height/1.5);
}

function displayOtherPressEnter() {
  image(otherPressEnter, width/2, height/1.3, width/10, height/6);
}

function displayYouChoseRock() {
  image(youChoseRock, width/2, yCardScissors/2.5, width/10, height/6);
}

function displayYouChosePaper() {
  image(youChosePaper, width/2, yCardScissors/2.5, width/10, height/6);
}

function displayYouChoseScissors() {
  image(youChoseScissors, width/2, yCardScissors/2.5, width/10, height/6);
}

function displayYouWin() {
  image(youWin, width/2, height/7, width/2.5, height/2.5);
}

function displayYouLose() {
  image(youLose, width/2, height/7, width/2.5, height/2.5);
}

function displayPressEsc() {
  image(pressEsc, width /2, height /2, width/3, height/3);
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

function hoverMenuButtons() {
  if (mouseX > xExitButton - exitButtonWidth/2 && mouseX < xExitButton + exitButtonWidth/2 && mouseY > yExitButton - exitButtonHeight/2 && mouseY < yExitButton + exitButtonHeight/2) {
    displayHoverExitButton();
  }
  else {
    displayExitButton();
  }
  if (mouseX > xKeybind - keybindWidth/2 && mouseX < xKeybind + keybindWidth/2 && mouseY > yKeybind - keybindHeight/2 && mouseY < yKeybind + keybindHeight/2) {
    displayHoverKeybindButton();
  }
  else {
    displayKeybindButton();
  }
}

////////////// Chose card/Change functions ////////////////////

function hoverCards() {
  if (mouseX > xCardRock - cardWidth / 2 && mouseX < xCardRock + cardWidth / 2 && mouseY > yCardRock - cardHeight / 2 && mouseY < yCardRock + cardHeight / 2) {
    rockHover = true;
  }
  else {
    rockHover = false;
  }
  if (mouseX > xCardPaper - cardWidth / 2 && mouseX < xCardPaper + cardWidth / 2 && mouseY > yCardPaper - cardHeight / 2 && mouseY < yCardPaper + cardHeight / 2) {
    paperHover = true;
  }
  else {
    paperHover = false;
  }
  if (mouseX > xCardScissors - cardWidth / 2 && mouseX < xCardScissors + cardWidth / 2 && mouseY > yCardScissors - cardHeight / 2 && mouseY < yCardScissors + cardHeight / 2) {
    scissorsHover = true;
  } 
  else {
    scissorsHover = false;
  }
}

function changeCardRockPos() {
  xCardRock = width/2;
  yCardRock = height/2;
}

function changeCardScissorsPos() {
  xCardScissors = width/2;
  yCardScissors = height/2;
}

function restoreCardPos() {
  xCardRock = width/4;
  yCardRock = height/2;

  xCardPaper = width/2;
  yCardPaper = height/2;

  xCardScissors = width/1.3;
  yCardScissors = height/2;
  cardWidth = width/6;
  cardHeight = height/2.2;

  cardWidth = width/6;
  cardHeight = height/2.2;
}

function restoreResult() {
  result = ["win", "lose"];
}

function randomResult() {
  if (state === "results") {
    result = random(result);
    if (result === "win") {
      state = "youWin";
    }
    if (result === "lose") {
      state = "youLose";
    }
  }
}
////////////// Press Buttons ///////////////

function pressPlay() {
  if (mouseX > xPlayButton - playButtonWidth/2 && mouseX < xPlayButton + playButtonWidth/2 && mouseY > yPlayButton - playButtonHeight/2 && mouseY < yPlayButton + playButtonHeight/2 && mouseIsPressed) {
    state = "pressEnter";
  }
}
function pressHowToPlay() {
  if (mouseX > xHowToPlayButton - howToPlayButtonWidth/2 && mouseX < xHowToPlayButton + howToPlayButtonWidth/2 && mouseY > yHowToPlayButton - howToPlayButtonHeight/2 && mouseY < yHowToPlayButton + howToPlayButtonHeight/2 && mouseIsPressed) {
    state = "howToPlayMenu";
  }
}
function pressExitHowToPlayMenu() {
  if (mouseX > xExitMenu - exitMenuWidth/2 && mouseX < xExitMenu + exitMenuWidth/2 && mouseY > yExitMenu - exitMenuHeight/2 && mouseY < yExitMenu + exitMenuHeight/2 && mouseIsPressed || keyIsDown(27)) {
    state = "start";
  }
}

function pressRockCard() {
  if (mouseX > xCardRock - cardWidth / 2 && mouseX < xCardRock + cardWidth / 2 && mouseY > yCardRock - cardHeight / 2 && mouseY < yCardRock + cardHeight / 2 && mouseIsPressed || keyIsDown(49)) {
    state = "choseRock";
  }
}

function pressPaperCard() {
  if (mouseX > xCardPaper - cardWidth / 2 && mouseX < xCardPaper + cardWidth / 2 && mouseY > yCardPaper - cardHeight / 2 && mouseY < yCardPaper + cardHeight / 2 && mouseIsPressed || keyIsDown(50)) {
    state = "chosePaper";
  }
}

function pressScissorsCard() {
  if (mouseX > xCardScissors - cardWidth / 2 && mouseX < xCardScissors + cardWidth / 2 && mouseY > yCardScissors - cardHeight / 2 && mouseY < yCardScissors + cardHeight / 2 && mouseIsPressed || keyIsDown(51)) {
    state = "choseScissors";
  }
}

function pressMenu() {
  if (mouseX > xMenu - menuWidth/2 && mouseX < xMenu + menuWidth/2 && mouseY > yMenu - menuHeight/2 && mouseY < yMenu + menuHeight/2 && mouseIsPressed) {
    state = "menu";
  }
}

function pressExitButton() {
  if (mouseX > xExitButton - exitButtonWidth/2 && mouseX < xExitButton + exitButtonWidth/2 && mouseY > yExitButton - exitButtonHeight/2 && mouseY < yExitButton + exitButtonHeight/2 && mouseIsPressed) {
    state = "areYouSureExit";
  }
}

function pressKeybindButton() {
  if (mouseX > xKeybind - keybindWidth/2 && mouseX < xKeybind + keybindWidth/2 && mouseY > yKeybind - keybindHeight/2 && mouseY < yKeybind + keybindHeight/2 && mouseIsPressed) {
    state = "keybind";
  }
}

function pressKeyEnter() {
  if (keyIsDown(13)) {
    state = "play";
  }
}

function pressEnterToExit() {
  if (keyIsDown(13)) {
    state = "start";
  }
}

function pressExitKeybindMenu() {
  if (keyIsDown(27)) {
    state = "play";
  }
}

function alreadyChoseCard() {
  if (keyIsDown(13)) {
    state = "results";
  }
}

function pressEscExit() {
  if (keyIsDown(27)) {
    state = "start";
  }
}