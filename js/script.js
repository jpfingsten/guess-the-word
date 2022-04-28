//global variables
const guessedLettersElement = document.querySelector(".guessed-letters"); //ul where guessed letters appear
const guessLetterButton = document.querySelector(".guess"); //guess button
const letterInput = document.querySelector(".letter"); //text input where player guesses a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where word in progress appears
const remainingGuessesElement = document.querySelector(".remaining"); //paragraph where remaining guesses are displayed
const remainingGuessesSpan = document.querySelector(".remaining span"); //span inside message paragraph
const message = document.querySelector(".message"); //paragraph where messages appear when player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //button prompting player to play again

let word = "magnolia"
const guessedLetters = [];

let remainingGuesses = 8;

//pull word from API list
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    word = selectRandomWord(wordArray);
    word.trim();
    placeholder(word);
};

//select a random word from wordArray, above
const selectRandomWord = function (wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    return randomWord;
}

//creating dots for the number of letters in the mystery word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

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
        guessCount(guess)
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

//count remaining guesses
const guessCount = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! This word contains the letter ${guess}.`
    } else {
        message.innerText = `Sorry, this word does not contain the letter ${guess}.`
        remainingGuesses--;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${wordUpper}.`;
        remainingGuessesSpan.innerText = "0 guesses";
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess";
    } else if (remainingGuesses > 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
}

//check to see if player won
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word. Congrats!</p>`;
    };
}