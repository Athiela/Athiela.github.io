// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;
let shootSound, bgMusic;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
  shootSound = loadSound("assets/laser1.mp3");
  // bgMusic = loadSound("assets/OrbitalColossus.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2, shipImage);
  // bgMusic.setVolume(0.5);
  bgMusic.loop();
}

function draw() {
  background(0);
  enterprise.update();
  enterprise.display();
}

function keyPressed() {
  enterprise.handleKeyPress();
}

function keyReleased() {
  enterprise.handleKeyRelease();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.theImage = theImage;
    this.dx = 5;
    this.dy = 5;
    this.theBullets = [];
  }

  handleKeyPress() {
    // handle WASD key presses -- you will likely want to change booleans here
    if (key === " ") {
      // shootSound.play();
      let middleX = this.x + this.theImage.width/2;
      let bullet = new Bullet(middleX, this.y, 0, -5, bulletImage);
      this.theBullets.push(bullet);
    }
  }

  handleKeyRelease() {
    // handle WASD key release -- you will likely want to change booleans here
  }

  update() {
    // move ship
    if (keyIsDown(87)) { //w
      this.y -= this.dy;
    }
    if (keyIsDown(83)) { //s
      this.y += this.dy;
    }
    if (keyIsDown(65)) { //a
      this.x -= this.dx;
    }
    if (keyIsDown(68)) { //d
      this.x += this.dx;
    }

  }
  
  display() {
    // show the ship
    image(this.theImage, this.x, this.y);
    
    // if doing extra for experts, show bullet(s)
    for (let i=this.theBullets.length-1; i>=0; i--) {
      if (this.theBullets[i].isOnScreen()) {
        this.theBullets[i].update();
        this.theBullets[i].display();
      }
      else {
        this.theBullets.splice(i, 1);
      }
    }
  }

}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.theImage = theImage;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.y += this.dy;
  }

  display() {
    // show the bullet
    image(this.theImage, this.x, this.y);
  }

  isOnScreen() {
    // check if the bullet is still on the screen
    return this.y > 0 && this.y < height;
  }
}