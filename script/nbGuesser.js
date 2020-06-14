/* 
GAME FUNCTION:
  - Player must guess a number between a min and max
  - Player gets a certain amount guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if loose
  - Let player choose to play again
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const UIgame = document.querySelector("#game"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UIguessBtn = document.querySelector("#guess-btn"),
  UIguessInput = document.querySelector("#guess-input"),
  UImessage = document.querySelector(".message");
//Assign UI min and max

UIminNum.textContent = min;
UImaxNum.textContent = max;

//Paly again event listener
UIgame.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen for guess
UIguessBtn.addEventListener("click", function () {
  let guess = parseInt(UIguessInput.value);
  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter un number between ${min} and ${max}`, "red");
  }
  //Check if won
  if (guess === winningNum) {
    //Game over - won

    gameOver(true, `${winningNum} is the winning number good job`);
  } else {
    //Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game over - lost

      gameOver(
        false,
        `Game over, you lost. The correct answer was ${winningNum}`
      );
    } else {
      //Game continues - answer wrong

      //Change border color
      UIguessInput.style.borderColor = "red";
      //Clear input
      UIguessInput.value = "";
      //Tell user its a wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});
//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //Disable input
  UIguessInput.disable = true;
  //Change border color
  UIguessInput.style.borderColor = color;
  //Set text color
  UImessage.style.color = color;
  //Set message
  setMessage(msg);

  //Paly again
  UIguessBtn.value = "Play Again";
  UIguessBtn.className += "play-again";
}

//Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(m, color) {
  UImessage.textContent = m;
  UImessage.style.color = color;
}
