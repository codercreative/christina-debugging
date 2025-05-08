const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const errorMsg = document.querySelector(".error-msg");

let targetNumber;
let attempts = 0;
//FIXED BUG: Changed const to let
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    //FIXED: Make sure that it says guess (instead of guesses) if 1 attempt has been made
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${
      attempts === 1 ? "guess" : "guesses"
    }`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  //FIXED BUG: Need to make sure that the user input is valid (between 1 - 99) and also not an empty value. I have also added code to the html and css to make sure that an error message appears for better UX.
  if (guess < 1 || guess > 99 || !guess) {
    errorMsg.classList.remove("hidden");
    return;
  } else {
    errorMsg.classList.add("hidden");
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      //FIXED BUG: Make sure that the correct message is displayed if the number guessed is too high (shouldn't display tooLowMessage)
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    //FIXED: Make sure that if there is one remaining attempt it states guess (instead of guesses)
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${
      remainingAttempts === 1 ? "guess" : "guesses"
    } remaining`;
  }

  //FIXED BUG: Deleted extra equal sign
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;

    //FIXED BUG: Make sure that too low and too high messages do not appear. Also, added maxGuesses message for better UX.
    tooLowMessage.style.display = "none";
    tooHighMessage.style.display = "none";
    maxGuessesMessage.style.display = "";
  }

  guessInput.value = "";
  resetButton.style.display = "";
}

function hideAllMessages() {
  for (
    let elementIndex = 0;
    //FIXED BUG: Added -1 to the loop condition so that the loop doesn't access an index that doesn't exist. We have five messages but since arrays are zero-based, the highest index is four
    elementIndex <= messages.length - 1;
    elementIndex++
  ) {
    messages[elementIndex].style.display = "none";
  }
}

//FIXED BUG: Corrected typo in function (from funtion)
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  //FIXED BUG: Corrected number of attempts to 5 (instead of 0)
  // Reset number of attempts
  maxNumberOfAttempts = 5;

  //FIXED BUG: Resetting attempts to 0 to make sure that the reset functions properly
  attempts = 0;

  //FIXED BUG: Corrected typo in disabled (from disabeld in submitButton.disabeld)
  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
