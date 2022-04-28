//global variables
const guessedLettersElement = document.querySelector(".guessed-letters"); //ul where guessed letters appear
const guessLetterButton = document.querySelector(".guess"); //guess button
const letterInput = document.querySelector(".letter"); //text input where player guesses a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where word in progress appears
const remainingGuessesElement = document.querySelector(".remaining"); //paragraph where remaining guesses are displayed
const remainingGuessesSpan = document.querySelector(".remaining span"); //span inside message paragraph
const message = document.querySelector(".message"); //paragraph where messages appear when player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //button prompting player to play again

const word = "magnolia"
const guessedLetters = [];

//creating dots for the number of letters in the mystery word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//accepting text input, clearing letterInput after guess
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter.";
    } else if (input.length > 1) {
        message.innerText = "One letter at a time!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please!";
    } else {
        return input;
    }
};

//capture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//show the guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//update circle symbols with correctly guessed letters
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//check to see if player won
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word. Congrats!</p>`;
        console.log(wordInProgress.innerText);
        console.log(word);
    };
}