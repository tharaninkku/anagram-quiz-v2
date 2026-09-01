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
let randomWord;
let currentScore = 0;

// use for get a random word from an array 
function getRandomWord() {
	randomWord = words[Math.floor(Math.random() * words.length)];
	return randomWord;
}

// use for shuffle a word
function getShuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}  

//this function use getRandomWord and getShuffle
function generateWord() {
	const shuffledWord = getShuffle(getRandomWord(words).split(""));
	result.textContent = shuffledWord.join("");	
}

random.addEventListener("click", () => {
	generateWord();
});

playerInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		if (playerInput.value === randomWord) {
		check.textContent = "Correct!";
		currentScore ++;
		score.textContent = currentScore;
		playerInput.value = "";
		generateWord();	
	} else {
		check.textContent = "Wrong!! Your score is reset";
		currentScore = 0;
		score.textContent = currentScore;
		}	
	}

});



