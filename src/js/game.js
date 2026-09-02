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
const timer = document.getElementById("timer");
const timeLeftText = document.getElementById("timeLeft");
const streak = document.getElementById("streakFireball");

let randomWord;
let currentScore = 0;
let currentLive = 3;
let countdown;
let streakLevel = 0;
let streakCount = 0;

function updateStreak() {
	if (streakCount >= 30) {
		streakLevel = 3;
	} else if (streakCount >= 20) {
		streakLevel = 2;
	} else if (streakCount >= 10) {
		streakLevel = 1;
	} else {
		streakLevel = 0;
	}
	streak.textContent = "🔥".repeat(streakLevel);
}

function startTimer() {
	clearInterval(countdown);
	timer.hidden = false;

	let timeLeft = 10;
	timeLeftText.textContent = timeLeft;

	countdown = setInterval(() => {
		timeLeft--;
		console.log(timeLeft); 
		timeLeftText.textContent = timeLeft;

		if (timeLeft <= 0) {
			clearInterval(countdown);
			timer.hidden = true;
			currentLive--;
			lives.textContent = "❤️".repeat(currentLive);
			streakCount = 0;
			updateStreak();

			if (currentLive <= 0) {
				gameOver();
			} else {
				check.textContent = "Timeout!";
				playerInput.value = "";
				generateWord();
			}
		}
	}, 1000);
}

// use to end the game
function gameOver() {
	clearInterval(countdown);

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
	startTimer();
}

random.addEventListener("click", () => {
	generateWord();
	random.disabled = true;
});

playerInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {

		if (!randomWord) {
			check.textContent = "Click random button first!"
			return;
		}

		if (playerInput.value.trim().toLowerCase() === randomWord.toLowerCase()) {
		check.textContent = "Correct!";
		streakCount++;		
		updateStreak();
		currentScore++;
		currentScore += streakLevel;
		score.textContent = currentScore;
		lives.textContent = "❤️".repeat(currentLive);
		playerInput.value = "";
		generateWord();	
		} else {
			currentLive--;
			streakCount = 0;
			updateStreak();
			lives.textContent = "❤️".repeat(currentLive);

			if (currentLive <= 0) {
				check.textContent = "Wrong!!";
				gameOver();
			} else {
				check.textContent = "Wrong!! You lost one life";
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
	streakCount = 0;
	updateStreak();	
    randomWord = undefined;

    playerInput.value = "";
    result.textContent = "none";
    check.textContent = "not answered yet";
    timer.hidden = true;

	lives.textContent = "❤️".repeat(currentLive);
	score.textContent = currentScore;
});



