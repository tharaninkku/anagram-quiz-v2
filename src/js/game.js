const words = [
	"apple",
	"banana",
	"orange"
];

const random = document.getElementById("randomButton");
const result = document.getElementById("randomResult");
const check = document.getElementById("resultText");
const playerInput = document.getElementById("playerInput");
const score = document.getElementById("scoreNumber");
const lives = document.getElementById("playerLives");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let randomWord;
let currentScore = 0;
let currentLive = 3;

// use to restart the game
function restartGame() {
	gameOverScreen.hidden = false;
	finalScore.textContent = currentScore;

	playerInput.disabled = true;
	random.disabled = true;	
}

// use for get a random word from an array 
function getRandomWord() {
	randomWord = words[Math.floor(Math.random() * words.length)];
	return randomWord;
}

// use for shuffle a word
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array.join("");
}  

//this function use getRandomWord and shuffle
function generateWord() {
	const selectedWord = getRandomWord();
	let shuffledWord = shuffle(selectedWord.split(""));

	while (shuffledWord === selectedWord) {
		shuffledWord = shuffle(selectedWord.split(""));
	}

	result.textContent = shuffledWord;
}

random.addEventListener("click", () => {
	generateWord();
});

playerInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {

		if (!randomWord) {
			check.textContent = "Click random button first!"
			return;
		}

		if (playerInput.value.trim().toLowerCase() === randomWord.toLowerCase()) {
		check.textContent = "Correct!";
		currentScore++;
		score.textContent = currentScore;
		lives.textContent = "❤️".repeat(currentLive);
		playerInput.value = "";
		generateWord();	
		} else {
			currentLive--;
			lives.textContent = "❤️".repeat(currentLive);

			if (currentLive <= 0) {
				check.textContent = "Wrong!!";
				restartGame();
			} else {
				check.textContent = "Wrong!! You lost one life";
				lives.textContent = "❤️".repeat(currentLive);
				score.textContent = currentScore;
			}


		}	
	}

});

restartButton.addEventListener("click", () => {
	gameOverScreen.hidden = true;
	playerInput.disabled = false;
	random.disabled = false;

	currentScore = 0;
	currentLive = 3;

	lives.textContent = "❤️".repeat(currentLive);
	score.textContent = currentScore;
});



