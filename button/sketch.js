// button oop demo

let buttonOne, buttonTwo;
let backgroundColor = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonOne = new Button(300, 400, 200, 100);
  buttonTwo = new Button (300, 600, 400, 100);
  buttonTwo.colorNotHover = "2A3D45";
  buttonTwo.colorHover = "BCAC9B";
}

function draw() {
  background(backgroundColor);
  buttonOne.display();
  buttonTwo.display();
}

function mousePressed() {
  if (buttonOne.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "red";
  }
  else if (buttonTwo.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "black";
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colorHover = "#621708";
    this.colorNotHover = "#7B190A";
  }
  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(this.colorHover);
    }
    else {
      fill(this.colorNotHover);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkIfInside(x, y) {
    return x>=this.x && x<=this.x + this.width &&
    y>=this.y && y<=this.y + this.height;
  } 
}
