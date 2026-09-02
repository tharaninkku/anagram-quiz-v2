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

let randomWord;
let currentScore = 0;
let currentLive = 3;

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

			if (currentLive <= 0) {
				currentScore = 0;
				currentLive = 3;
				check.textContent = "Wrong!! Game Over! Your score is reset.";
				lives.textContent = "❤️".repeat(currentLive);
				score.textContent = currentScore;
			} else {
				check.textContent = "Wrong!! You lost one life";
				lives.textContent = "❤️".repeat(currentLive);
				score.textContent = currentScore;
			}


		}	
	}

});



