// Sudoku

let initialGrid;
let gridDimensions = 9;
let cellSize;
let grid;

function preload() {
  initialGrid = loadStrings("assets/level2.txt");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }

  initialGrid = convertedToIntGrid(initialGrid);

  grid = initialGrid;
  cellSize = width/gridDimensions;
}

function draw() {
  background(220);
  displayGrid();
}

function convertedToIntGrid(initialGrid) {
  // assume it's a rectangular array
  let rows = initialGrid.length;
  let columns = initialGrid[0].length;

  let newGrid = [];
  for (let y=0; y<rows; y++) {
    newGrid.push([]);
    for (let x=0; x<columns; x++) {
      newGrid[y].push(int(initialGrid[y][x]));
    }
  }
  return newGrid;
}

function windowResized() {
  setup();
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++){
    for (let x=0; x<gridDimensions; x++) {
      strokeWeight(1);
      fill("white");
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

      if (grid[y][x] !== 0) {
        fill("black");
        textSize(cellSize*0.75);
        textAlign(CENTER, CENTER);
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }
  thickerLines();
}

function thickerLines(){
  strokeWeight(4);
  for (let location=0; location<=9; location+=3){
    line(0, location*cellSize, width, location*cellSize);
    line(location*cellSize, 0, location*cellSize, height);
  }
  // // horizontal lines
  // line(0, 0*cellSize, width, 0*cellSize);
  // line(0, 3*cellSize, width, 3*cellSize);
  // line(0, 6*cellSize, width, 6*cellSize);
  // line(0, 9*cellSize, width, 9*cellSize);

  // // vertical lines
  // line(0*cellSize, 0, 0*cellSize, height);
  // line(3*cellSize, 0, 3*cellSize, height);
  // line(6*cellSize, 0, 6*cellSize, height);
  // line(9*cellSize, 0, 9*cellSize, height);

}