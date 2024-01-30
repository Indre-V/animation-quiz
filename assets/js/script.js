
const startQuizAreaRef = document.querySelector("#start-area");
const questionAreaRef = document.querySelector("#question-area");
const gameOverAreaRef = document.querySelector("#game-over");
const startButtonRef = document.querySelector("#start");
const loaderRef = document.querySelector("#loader");
const levelBtnsRef = document.querySelectorAll(".level-btns");
const selectedLevelRef = document.querySelector("#selected-level");
const progressTextRef = document.querySelector("#progress-text");
const scoreRef = document.querySelector("#score");
const incorrectScoreRef = document.querySelector("#incorrect");
const correctScoreRef = document.querySelector("#correct-score");
const scoreMessageRef = document.querySelector("#score-message");
const playAgainRef = document.querySelector("#play-again-btn");
const usernameRef = document.querySelector("#username");
const secondsRef = document.querySelector("#seconds");
const questionElementRef = document.querySelector("#question");
const answerButtonsRef = document.querySelectorAll(".btn-a");
const answerButtonsAllRef = Array.from(document.querySelectorAll(".btn-a"));
const highScoresBtnRef = document.querySelector("#high-scores-btn");
const playerScoresListRef = document.querySelector("#player-scores");
const scoreIndicatorRef = document.querySelector("#score-dots");

const highScoresRef = JSON.parse(localStorage.getItem("highScores")) || [];

let correctScore = 0;
let incorrectScore = 0;
let questionNumber = 10;

let quizQuestions = [];
let acceptingAnswers = true;
let timeCounter;

const APILINK = `https://opentdb.com/api.php`;
const SCOREBONUS = 1;
const MAXQUESTIONS = 10;
const SUPPORT = {
  "show-instructions": "instructions",
  "show-contactForm": "feedback",
  "close-instructions": "instructions",
  "close-contactForm": "feedback",
};

const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);
const resetGame = () => location.reload();
const hideArea = (area) => area.classList.add("hide");
const displayArea = (area) => area.classList.remove("hide");

/**
 * Updates progress dots based on the answer status
 * @param {"correct" | "wrong"} status - The status of the answer, either 'correct' or 'wrong'.
 */
const updateProgressDots = (status) => {
  const dot = document.createElement("div");
  dot.classList.add("progress-dot");
  dot.classList.add(status);
  scoreIndicatorRef.appendChild(dot);
};

/**
 * Increments the correct and incorrect score
 * @param {number} num - Increments/decrements the score
 */

const incrementScore = (num) => {
  correctScore += num;
  scoreRef.innerHTML = correctScore;
};

const incrementIncorrect = (num) => {
  incorrectScore += num;
  incorrectScoreRef.innerHTML = incorrectScore;
};

/**
 * Sets timer for the quiz and counts down from 20 secs
 */

const startTimer = () => {
  clearInterval(timeCounter);
  let sec = 20;
  const timerElement = secondsRef;
  timeCounter = setInterval(() => {
    timerElement.textContent = sec;
    sec--;
    if (sec <= 0) {
      clearInterval(timeCounter);
      handleTimeUp();
    }
  }, 1000);
};

const handleTimeUp = () => {
  updateProgressDots("empty");
  getNewQuestion();
  acceptingAnswers = true;
};

/**
 * After last question, game Over is called
 */

const gameOver = () => {
  clearInterval(timeCounter);
  displayArea(gameOverAreaRef);
  hideArea(questionAreaRef);
  displayFinalScore();
};

/**
 *Display final score
 *Construct a score object containing the user's name and their score
 *Add score to local storage
 *Score message based on the score including username
 */

const displayFinalScore = () => {
  const usernameEntered = usernameRef.value;
  const score = parseInt(scoreRef.textContent);

  const scoreObject = {
    name: usernameEntered,
    score: score,
  };

  highScoresRef.unshift(scoreObject);
  highScoresRef.sort((a, b) => b.score - a.score);
  highScoresRef.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScoresRef));

  let scoreMessage = "";

  if (score < 5) {
    scoreMessage = `${usernameEntered} can do better! Keep trying.`;
  } else {
    scoreMessage = `Congratulations, ${usernameEntered}! You've done a great job!`;
  }
  scoreMessageRef.textContent = scoreMessage;
  correctScoreRef.textContent = score;

  playerScoresListRef.classList.add("hide");
};

/**
 * Displays high scores in a toggle.
 * @param {Array} highScores - An array containing high scores objects
 */

const displayPlayerScores = () => {
  playerScoresListRef.innerHTML = "";

  highScoresRef.forEach((score, index) => {
    const scoreList = document.createElement("p");
    scoreList.textContent = `${index + 1}. ${score.name}: ${score.score}`;
    playerScoresListRef.appendChild(scoreList);
  });
};

/**
 * Change of the icon.
 * @param {HTMLElement} icon - whose classes will be toggled
 */

const toggleIcon = (icon) => {
  icon.classList.toggle("fa-plus");
  icon.classList.toggle("fa-minus");
};

/**
 * Fetches trivia questions from the Open Trivia Database API based on the specified difficulty.
 * @param {string} difficulty - adjustable setting chosen.
 * @returns {Promise<Array>} - returns a promise of formatted questions.
 * @throws {Error} throws an error if does not fetch.
 */

const fetchQuestions = (difficulty) => {
  displayArea(loaderRef);
  hideArea(questionAreaRef);

  return fetch(
    `${APILINK}?amount=10&category=32&type=multiple&difficulty=${difficulty}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch API questions.`);
      }
      hideArea(loaderRef);
      displayArea(questionAreaRef);
      return response.json();
    })
    .then((apiData) => formatQuestions(apiData.results))
    .catch((Error) => {
      handleFetchError(Error);
      throw Error;
    });
};

/**
 * @param {Array} apiQuestions - The  data from the API.
 * @returns {Array} A formatted question object with properties obtained from API
 */

const formatQuestions = (apiQuestions) => {
  return apiQuestions.map((apiQuestion) => ({
    difficulty: apiQuestion.difficulty,
    question: apiQuestion.question,
    correctAnswer: apiQuestion.correct_answer,
    answers: shuffle([
      ...apiQuestion.incorrect_answers,
      apiQuestion.correct_answer,
    ]),
  }));
};

/**
 * Start the game when Start Quiz clicked
 * @param {string} difficulty -  Fetches quiz questions based on the selected difficulty level,
 * @param {Error} error - handles error if fails to start
 */

const startGame = async (difficulty) => {
  try {
    quizQuestions = await fetchQuestions(difficulty);
    questionNumber = 0;
    getNewQuestion();
  } catch (Error) {
    handleFetchError();
  }
};

/*
 * Display question text, answer choices
 * Assign each answer to a specific button.
 */

const getNewQuestion = () => {
  if (questionNumber >= 10) {
    return gameOver();
  }

  clearStatusClass(answerButtonsRef);

  answerButtonsRef.forEach((btn) => (btn.disabled = false));

  acceptingAnswers = true;

  const currentQuestion = quizQuestions[questionNumber];

  questionElementRef.innerHTML = currentQuestion.question;

  answerButtonsRef.forEach((button, i) => {
    button.innerHTML = currentQuestion.answers[i];
    button.addEventListener("click", handleAnswerClick);
  });

  progressTextRef.innerHTML = `Question ${questionNumber + 1}/${MAXQUESTIONS}`;

  questionNumber++;

  startTimer();
};

const handleAnswerClick = (event) => {
  const selectedAnswer = event.target.innerHTML;
  checkAnswer(selectedAnswer);
};

/**
 *Find button corresponding to the selected answer
 *Check if the selected answer is correct or wrong
 *@param {string} selectedAnswer - The answer selected by the user.
 */

const checkAnswer = (selectedAnswer) => {
  const currentQuestion = quizQuestions[questionNumber - 1];
  const selectedButton = answerButtonsAllRef.find(
    (button) => button.innerHTML === selectedAnswer
  );

  const classToApply =
    selectedAnswer === currentQuestion.correctAnswer ? "correct" : "wrong";

  selectedButton.classList.add(classToApply);

  if (acceptingAnswers && selectedButton) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      incrementScore(SCOREBONUS);
      updateProgressDots("correct");
    } else {
      incrementIncorrect(SCOREBONUS);
      updateProgressDots("wrong");
      answerButtonsAllRef
        .find((button) => button.innerHTML === currentQuestion.correctAnswer)
        ?.classList.add("correct");
    }

    disableAnswerButtons();

    setTimeout(() => {
      clearInterval(timeCounter);
      clearStatusClass(answerButtonsRef);
      selectedButton.classList.remove(classToApply);
      answerButtonsRef.forEach((button) => {
        button.removeEventListener("click", handleAnswerClick);
      });
      getNewQuestion();
    }, 1000);
  }

  currentQuestion.answerChecked = true;
  acceptingAnswers = false;
};

/**
 * Clears the color and status of the buttons
 * @param {HTMLElement[]} button- An array of buttons.
 */

const clearStatusClass = (button) => {
  button.forEach((btn) => {
    btn.classList.remove("correct", "wrong");
    btn.classList.remove("disabled");
  });
};

const disableAnswerButtons = () => {
  answerButtonsRef.forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });
};

/**
 * Adds selected level to question display area
 * @param {HTMLElement} selectedLevelBtn - The HTML buttonbmrepresenting the selected level button.
 */

const activateButton = (selectedLevelBtn) => {
  levelBtnsRef.forEach((button) => button.classList.remove("active"));
  selectedLevelBtn.classList.add("active");
  selectedLevelRef.textContent = selectedLevelBtn.textContent;
};

/**
 * API fetch error handling to reload if error occurs
 */
const handleFetchError = () => {
  displayArea(loaderRef);
  hideArea(questionAreaRef);
  alert("Error fetching data. Please try again later.");
  setTimeout(() => {
    location.reload();
  }, 1000);
};

/**
 *Wait for document to fully load and execute content
 *@param {Event} event - the form submission event.
 *Username and Level selection process and alert when is either level or username missing
 *Hide start area and display question area
 *Loads event listeners
 */

document.addEventListener("DOMContentLoaded", () => {
  startButtonRef.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedLevel = document.querySelector(".level-btns.active");
    const usernameEntered = usernameRef;

    if (usernameEntered.value && selectedLevel) {
      hideArea(startQuizAreaRef);
      displayArea(questionAreaRef);
      await startGame(selectedLevel.dataset.level);
    } else {
      alert("Please enter Username and select Level.");
    }
  });

  levelBtnsRef.forEach((button) => {
    button.addEventListener("click", () => {
      activateButton(button);
    });
  });

  document.addEventListener("click", (event) => {
    const { target } = event;
    const { id } = target;
    if (id in SUPPORT) {
      event.preventDefault();
      const show = id.startsWith("show");
      const supportForms = document.querySelector(`#${SUPPORT[id]}`);
      supportForms.style.display = show ? "block" : "none";
    }
  });

  highScoresBtnRef.addEventListener("click", (event) => {
    event.preventDefault();

    playerScoresListRef.classList.toggle("hide");
    toggleIcon(highScoresBtnRef.querySelector("i"));

    if (!playerScoresListRef.classList.contains("hide")) {
      displayPlayerScores();
    }
  });

  playAgainRef.addEventListener("click", resetGame);
});
