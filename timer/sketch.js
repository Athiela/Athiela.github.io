// Timer oop demo

let backgroundTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTimer = new Timer(3000);
}

function draw() {
  if (backgroundTimer.isDone()) {
    background("red");
  }
  else {
    background("black");
  }
}

function mousePressed() {
  backgroundTimer.reset();
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.StartTime = millis();
  }
  isDone() {
    return millis() > this.waitTime + this.StartTime;
  }

  reset() {
    this.StartTime = millis();
  }

  setDuration(waitTime) {
    this.WaitTime = waitTime;
  }
}