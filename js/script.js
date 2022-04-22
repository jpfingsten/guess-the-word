//global variables
const guessedList = document.querySelector(".guessed-letters"); //ul where guessed letters appear
const guessButton = document.querySelector(".guess"); //guess button
const textInput = document.querySelector(".letter"); //text input where player guesses a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where word in progress appears
const remaining = document.querySelector(".remaining"); //paragraph where remaining guesses are displayed
const span = document.querySelector("span"); //span inside message paragraph
const message = document.querySelector(".message"); //paragraph where messages appear when player guesses a letter
const playAgain = document.querySelector(".play-again"); //button prompting player to play again
const word = "magnolia"
const guessedLetters = [];

//creating dots for the number of letters in the mystery word
const wordThisRound = function () {
    const wordArray = word.split("");
    for (let letter in wordArray) {
        wordInProgress.append("●")
    }
}

wordThisRound(word);

//accepting text input, clearing textInput after guess
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = textInput.value;
    textInput.value = "";
    message.innerText = "";
    const validatedGuess = validateInput(guessedLetter); //is this "the variable mapped to the result of the function?"
    makeGuess(validatedGuess);
})

//validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please guess a letter.";
    } else if (input.length >= 2) {
        message.innerText = "One letter at a time!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please!";
    }

    return input;
}

//capture input
const makeGuess = function (letter) {
    letter.toUpperCase();
    if (guessedLetters.includes(letter) === true) {
        message.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
}