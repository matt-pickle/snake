const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");
let squares = [];
let timerId = 0;
const width = 10;
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let moveInterval = 1000;
let speedIncrease = 0.9;

function createGrid() {
  for (i = 0; i < (width * width); i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
  //Removes the snake
  currentSnake.forEach(index => squares[index].classList.remove("snake"));
  //Removes the apple
  squares[appleIndex].classList.remove("apple");
  //Resets the game
  clearInterval(timerId);
  currentSnake = [2,1,0];
  direction = 1;
  score = 0;
  scoreDisplay.textContent = score;
  moveInterval = 1000;
  //Starts new game
  currentSnake.forEach(index => squares[index].classList.add("snake"));
  generateApple();
  timerId = setInterval(move, moveInterval);
}

function move() {
  //Checks for collision first
  let head = currentSnake[0];
  if (
    (head % width === 0 && direction === -1) || //Snake hits left wall
    (head % width === width - 1 && direction === 1) || //Snake hits right wall
    (head - width < 0 && direction === -width) || //Snake hits bottom wall
    (head + width >= 100 && direction === width) || //Snake hits top wall
    squares[head + direction].classList.contains("snake") //Snake hits itself
  ) {
    return clearInterval(timerId);
  }
  
  //Moves the snake
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");

  //Handles snake eating the apple
  if (currentSnake[0] === appleIndex) {
    //Removes apple
    squares[appleIndex].classList.remove("apple");
    //Grows the snake
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    //Generates a new apple
    generateApple();
    //Increments the score
    score++
    scoreDisplay.textContent = score;
    //Speeds up the snake
    moveInterval = moveInterval * speedIncrease;
    clearInterval(timerId);
    timerId = setInterval(move, moveInterval);
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

generateApple();

function control(e) {
  if (e.keyCode === 39) { //Right key press
    direction = 1;
  } else if (e.keyCode === 38) { //Up key press
    direction = -width;
  } else if (e.keyCode === 37) { //Left key press
    direction = -1;
  } else if (e.keyCode === 40) { //Down key press
    direction = width;
  }
}

document.addEventListener("keydown", control);
startButton.addEventListener("click", startGame);
