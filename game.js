const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.querySelector("#time");
const highScoreDisplay = document.querySelector("#best-score");
const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart-btn");
const messageDisplay = document.querySelector("#message");

let score = 0;
let timeLeft = 30;
let highScore = 0;
let gameTimer = null;
let gameIsRunning = false;

highScore = Number(localStorage.getItem("highScore")) || 0;

function updateDisplay() {
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    highScoreDisplay.textContent = highScore;
}

document.addEventListener("moleHit", function() {
    if (gameIsRunning) {
        score++;
        updateDisplay();
    }
});

function startTimer() {
    gameTimer = setInterval(function() {
        timeLeft--;
        updateDisplay();
        if (timeLeft <=0) {
            endGame();
        }
    }, 1000);
}



function startGame() {
    if (gameIsRunning) {
        return;
    }
    score = 0;
    timeLeft = 30;
    gameIsRunning = true;
    messageDisplay.textContent="Catch as many moles as you can!";

    updateDisplay();
    startMoles();
    startTimer();
}

function endGame() {
    gameIsRunning = false;
    clearInterval(gameTimer);
    stopMoles();
    if (score> highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
      messageDisplay.textContent="Game Over! Your score: " + score;

    updateDisplay();
    console.log("Game over!");
    console.log("Final score:", score);
}

highScore = Number(localStorage.getItem("highScore")) || 0;

function restartGame() {
    clearInterval(gameTimer);
    stopMoles();
    gameIsRunning = false;
    startGame();
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

updateDisplay();