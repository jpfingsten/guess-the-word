const guessedLetters = document.querySelector(".guessed-letters"); //ul where guessed letters appear
const guessButton = document.querySelector(".guess"); //guess button
const textInput = document.querySelector(".letter"); //text input where player guesses a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where word in progress appears
const remaining = document.querySelector(".remaining"); //paragraph where remaining guesses are displayed
const span = document.querySelector("span"); //span inside message paragraph
const message = document.querySelector(".message"); //paragraph where messages appear when player guesses a letter
const playAgain = document.querySelector(".play-again"); //button prompting player to play again
const word = "magnolia"

const wordThisRound = function () {
    const wordArray = word.split("");
    for (let letter in wordArray) {
        wordInProgress.append("●")
    }
}

wordThisRound(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = textInput.value;
    console.log(guessedLetter);
    textInput.value = "";
})

