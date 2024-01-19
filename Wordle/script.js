// Sample word to guess
const validWords = ["apple", "banana", "orange", "grape", "kiwi", "pear", "peach", "plum", "cherry", "strawberry", "blueberry", "raspberry"];

// Function to select a random word from the array
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * validWords.length);
    return validWords[randomIndex];
}

// Sample word to guess (initialized with a random word)
let secretWord = getRandomWord();

const maxGuesses = 5;
let currentGuesses = 0;

// Function to create a word holder for each letter
function createWordHolders() {
    const wordHoldersContainer = document.getElementById("word-holders-container");
    wordHoldersContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const wordHolder = document.createElement("div");
        wordHolder.className = "word-holder";

        for (let j = 0; j < secretWord.length; j++) {
            const letterBox = document.createElement("div");
            letterBox.className = "letter-box";
            wordHolder.appendChild(letterBox);
        }

        wordHoldersContainer.appendChild(wordHolder);
    }
}

// Call the function to create initial word holders when the page loads
window.onload = function () {
    createWordHolders();
};

// Function to update the word holder with the guessed word
function updateWordHolder(wordHolder, guessedWord) {
    const letterBoxes = wordHolder.querySelectorAll(".letter-box");

    for (let i = 0; i < guessedWord.length; i++) {
        const letterBox = letterBoxes[i];
        letterBox.textContent = guessedWord[i];

        if (guessedWord[i] === secretWord[i]) {
            letterBox.classList.add("green");
        } else if (secretWord.includes(guessedWord[i])) {
            letterBox.classList.add("yellow");
        } else {
            letterBox.classList.add("grey");
        }
    }
}

// Function to handle the guess submission
function submitGuess() {
    const guessInput = document.getElementById("guess-input");
    const guessedWord = guessInput.value.toLowerCase();

    if (guessedWord.length === secretWord.length && currentGuesses < maxGuesses) {
        // Get the current word holder based on the number of guesses
        const wordHolderIndex = currentGuesses;
        const wordHolder = document.querySelectorAll(".word-holder")[wordHolderIndex];

        updateWordHolder(wordHolder, guessedWord);

        // Increment the number of guesses
        currentGuesses++;

        // Clear the input for the next guess
        guessInput.value = "";

        // Check if the guessed word matches the secret word after updating the word holder
        if (guessedWord === secretWord) {
            // Delay the alert for 1 second (1000 milliseconds)
            setTimeout(function () {
                alert("Congratulations! You guessed the word!");
                // You can add more logic for game continuation or ending here
            }, 10);
        }

        // Check if the maximum number of guesses has been reached
        if (currentGuesses === maxGuesses) {
            // Delay the alert for 1 second (1000 milliseconds)
            setTimeout(function () {
                alert("Game over! You have reached the maximum number of guesses.");
                // You can add more logic for game continuation or ending here
            }, 10);
        }
    } else {
        alert("Please enter a word of the correct length, and ensure you have remaining guesses.");
    }
}
