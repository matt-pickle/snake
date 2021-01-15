const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
let squares = [];
let width = 10;
let currentSnake = [2,1,0];
let direction = 1;

function createGrid() {
  for (i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"));

function move() {
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");
}

move();

let timerId = setInterval(move, 1000);

function control(e) {
  if (e.keyCode === 39) {
    //Right key press
    direction = 1;
  } else if (e.keyCode === 38) {
    //Up key press
    direction = -width;
  } else if (e.keyCode === 37) {
    //Left key press
    direction = -1;
  } else if (e.keyCode === 40) {
    //Down key press
    direction = width;
  }
}

document.addEventListener("keydown", control);
