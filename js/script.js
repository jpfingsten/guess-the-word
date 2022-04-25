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
    const playerGuess = textInput.value;
    textInput.value = "";
    message.innerText = "";
    const validatedGuess = validateInput(playerGuess);
    if (validatedGuess) {
        makeGuess(validatedGuess);
    }
})

//validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please guess a letter.";
    } else if (input.length >= 2) {
        message.innerText = "One letter at a time!";
        input = "";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please!";
        input = "";
    };

    return input;
}

//capture input
const makeGuess = function (letter) {
    const thisLetter = letter;
    const upperCaseLetter = thisLetter.toUpperCase();
    if (guessedLetters.includes(upperCaseLetter)) {
        message.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(upperCaseLetter);
        updateGuessedList();
    }
    console.log(guessedLetters);
}

//show the guessed letters
const updateGuessedList = function () {
    guessedList.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = `${letter}`;
        guessedList.append(li);
    }
}

//update circle symbols with correctly guessed letters, NOT COMPLETE
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const guessedLettersArray = [];
    for (let letter of wordArray) { //start from here on next attempt
        if (guessedLetters.includes(letter)) {
            guessedLettersArray.append(`${letter}`)
        } else {
            guessedLettersArray.append("●")
        };
    };
    const newGuessedList = guessedLettersArray.join();
    wordInProgress.innerText = newGuessedList;
}