const akkusativ = ["durch", "für", "gegen", "ohne", "um", "bis", "entlang"];
const dativ = [
  "aus",
  "außer",
  "bei",
  "mit",
  "nach",
  "seit",
  "von",
  "zu",
  "gegenüber",
];
const twoWay = [
  "an",
  "auf",
  "hinter",
  "in",
  "neben",
  "über",
  "unter",
  "vor",
  "zwischen",
];

let score = 0;
let questionCount = 0;
let questions = [];
let currentPreposition = "";

const correctSound = new Audio("mixkit-video-game-treasure-2066.wav");
const wrongSound = new Audio("mixkit-wrong-answer-fail-notification-946.wav");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
}

function startGame() {
  // Hide the Main Page button when the game starts
  document.getElementById("mainPageBtn").style.display = "none";

  score = 0;
  questionCount = 0;

  // Create shuffled list of all prepositions
  questions = [
    ...akkusativ.map((p) => ({ prep: p, case: "Akkusativ" })),
    ...dativ.map((p) => ({ prep: p, case: "Dativ" })),
    ...twoWay.map((p) => ({ prep: p, case: "Two-way" })),
  ];
  shuffleArray(questions);

  document.getElementById("gameArea").innerHTML = `
    <h2>Guess the Case</h2>
    <p id="questionInfo"></p>
    <p id="preposition"></p>
    <button class="answer-btn" onclick="checkAnswer('Akkusativ')">Akkusativ</button>
    <button class="answer-btn" onclick="checkAnswer('Dativ')">Dativ</button>
    <button class="answer-btn" onclick="checkAnswer('Two-way')">Two-way</button>
    <p id="score">Score: 0</p>
  `;
  nextQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextQuestion() {
  document.getElementById("gameContainer").classList.remove("correct", "wrong");

  if (questionCount >= questions.length) {
    document.getElementById("gameArea").innerHTML = `
      <h2>🎯 Game Over!</h2>
      <p>Your final score is: ${score} / ${questions.length}</p>
      <button class="restart-btn" onclick="startGame()">Restart Game</button>
    `;
    return;
  }

  currentPreposition = questions[questionCount];
  document.getElementById("questionInfo").textContent = `Question ${
    questionCount + 1
  } of ${questions.length}`;
  document.getElementById(
    "preposition"
  ).textContent = `Preposition: ${currentPreposition.prep}`;

  speak(currentPreposition.prep);
}

function checkAnswer(selectedCase) {
  if (selectedCase === currentPreposition.case) {
    score++;
    correctSound.play();
    document.getElementById("gameContainer").classList.add("correct");
  } else {
    wrongSound.play();
    document.getElementById("gameContainer").classList.add("wrong");
  }
  document.getElementById("score").textContent = `Score: ${score}`;
  questionCount++;
  setTimeout(nextQuestion, 800);
}

document.getElementById("mainPageBtn").addEventListener("click", function () {
  window.location.href = "https://davidingle188.github.io/Nouns-game-/"; // replace with your main page URL
});
