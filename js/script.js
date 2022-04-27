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
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

wordThisRound(word);

//accepting text input, clearing textInput after guess
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const playerGuess = textInput.value;
    message.innerText = "";
    const validatedGuess = validateInput(playerGuess);
    if (validatedGuess) {
        makeGuess(validatedGuess);
    }
    textInput.value = "";
});

//validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please guess a letter.";
    } else if (input.length >= 2) {
        message.innerText = "One letter at a time!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please!";
    } else {
        return input;
    }
}

//capture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        updateGuessedList();
        updateWordInProgress(guessedLetters);
    }
}

//show the guessed letters
const updateGuessedList = function () {
    guessedList.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
}

//update circle symbols with correctly guessed letters
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const guessedLettersArray = [];
    console.log(wordArray);
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            guessedLettersArray.push(letter.toUpperCase());
        } else {
            guessedLettersArray.push("●");
        }
    }
    console.log(guessedLettersArray);
    wordInProgress.innerText = guessedLettersArray.join("");
}
updateWordInProgress();