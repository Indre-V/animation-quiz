//Elements of the code where adapted from https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript/blob/master/6.%20Create%20a%20Progress%20Bar/game.js
//https://github.com/WebDevVikramChoudhary/Vanilla-Quiz-Using-Htm-Css-Js/blob/master/quiz/quiz.js


const startQuizArea = document.querySelector("#start-area");
const questionArea = document.querySelector("#question-area");
const gameOverArea = document.querySelector("#game-over");

const progressText = document.getElementById("progress-text");
const progressBarFull = document.getElementById("bar-full");

const scoreText = document.getElementById("score");
const seconds = document.getElementById("seconds");

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn-a");
const answerButtonsArray = Array.from(document.getElementsByClassName("btn-a"));

const hideArea = (area) => area.classList.add("hide"); // function to hide
const displayArea = (area) => area.classList.remove("hide"); // function to display area

let score = 0;
let questionNumber = 0;


let questions = []; // Add questions array
let acceptingAnswers = true;
let timeCounter;

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

/**
 * This function increments the correct score and updated the score display
 * @param {number} num - Increments the score by set number.
 */

const incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

/**
 * Sets timer for the quiz 
 * Counts down from specified time
 * When time runs out Next() function is called
 * @param {number} time - The time is set in seconds
 */

const startTimer = (time) => {
    let remainingTime = time;

    function updateDisplay() {
        const formattedTime = (remainingTime % 60).toString().padStart(2, "0");
        seconds.textContent = formattedTime;
    }
    updateDisplay();

    timeCounter = setInterval(() => {
        remainingTime--;
        updateDisplay();

        if (remainingTime < 0) {
            next();
        }
    }, 1000);
}

/**
 * Game over function.
 * Hides question area.
 * Calls displayFinalScore function.
 */
const gameOver = () => {
    displayArea(gameOverArea);
    hideArea(questionArea);
    displayFinalScore();
}

/**
 * Function to display final score
 * Score message based on the score
 * Retrieves username entered 
*/

const displayFinalScore = () => {
    const usernameEntered = document.getElementById("username").value;
    const score = parseInt(document.getElementById("score").textContent);

    let scoreMessage = "";

    if (score < 5) {
        scoreMessage = `${usernameEntered} can do better! Keep trying.`;
    } else {
        scoreMessage = `Congratulations! ${usernameEntered} done a great job!`;
    }

    document.getElementById("score-message").textContent = scoreMessage;

    document.querySelector(".correct-score").textContent = score;
}


/*
*Function to reset the game
*Event lsitener added to Play Gain button 
*reload page is activated
*/



const resetGame = () => {
    location.reload();
}

document.getElementById("play-again-btn").addEventListener("click", resetGame);
// function to shuffle answers
const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);

/**
 * Fetches trivia questions from the Open Trivia Database API based on the specified difficulty.

 * @param {string} difficulty - adjustable setting chosen.
 * @returns {Promise<Array>} - returns a promise of formatted questions.
 * @throws {Error} throws an error if does not fetch.
 */

const fetchQuestions = async (difficulty) => {

    const apiLink = "https://opentdb.com/api.php?amount=10&category=32&type=multiple&difficulty=" + difficulty;

    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch API questions.`);
            }
            return response.json();
        })
        .then(apiData => apiData.results.map(apiQuestion => formatQuestions(apiQuestion)))
        .catch(error => {
            handleFetchError(error);
            throw error;
        });
};

/*
* @param {object} apiQuestions - The  data from the API.
* @returns {object} A formatted question object with properties obtained from API
*/

const formatQuestions = (apiQuestions) => {
    return {
        difficulty: apiQuestions.difficulty,
        question: apiQuestions.question,
        correctAnswer: apiQuestions.correct_answer,
        answers: shuffle([
            ...apiQuestions.incorrect_answers,
            apiQuestions.correct_answer,
        ]),
    };
};

/**
 *
 * Function to start the game when Start Quiz clicked
 * Sets score and question number variables to 0 and starts the timer.
 * @param {string} difficulty -  Fetches quiz questions based on the selected difficulty level,
 * @returns {Promise<void>} A promise that resolves when the game is successfully started.
 * @param {Error} error - hadles error if fails to start
 */

async function startGame(difficulty) {
    try {
        questions = await fetchQuestions(difficulty);
        questionNumber = 0;
        score = 0;
        getNewQuestion();
        startTimer(20);
    } catch (error) {
        handleFetchError(error);
    }
}
/* Loads and display new question onto the quiz.
 * Resents button styles, enables answer buttons for the new question.
 * Display question text, answer choices, progress bar.
 * Assign each answer to a specific button.
 * If no questions left, call gameOver function
 */

const getNewQuestion = () => {
    resetButtonStyles();

    console.log("displayQuestions", questions);

    answerButtons.forEach((button) => {
        button.disabled = false;
    });

    if (questionNumber < questions.length) {
        let currentQuestion = questions[questionNumber];

        questionElement.innerText = currentQuestion.question;

        answerButtons.forEach((button, i) => {
            button.innerText = currentQuestion.answers[i];
            button.addEventListener("click", () =>
                checkAnswer(answerButtons[i].innerText)
            );
        });

        progressText.innerText = `Question ${questionNumber + 1}/${MAX_QUESTIONS}`;

        progressBarFull.style.width = `${(questionNumber / MAX_QUESTIONS) * 100}%`;

        questionNumber++;
    } else {
        gameOver();
    }
};

/*Function to check if the selected answer is correct
*Find button corresponding to the selected answer
*Call function to prevent users from selecting multiple answers
*Check if the selected answer is correct
*Add 'correct' class for the correct answer to turn green
*/
const checkAnswer = (selectedAnswer) => {
    const currentQuestion = questions[questionNumber - 1];

    const selectedButton = answerButtonsArray.find(
        (button) => button.innerText === selectedAnswer
    );
    if (acceptingAnswers && selectedButton) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
          incrementScore(CORRECT_BONUS);
          console.log("Score after correct answer:", score);
          selectedButton.classList.add("correct");
      } else {
          selectedButton.classList.add("wrong");
      }
  }
        currentQuestion.answerChecked = true;
        disableAnswerButtons();
        acceptingAnswers = false;
    };


//resets answer buttons for the next question

function resetButtonStyles() {
    clearStatusClass(answerButtons);
}

/**
 * clears the color and status of the buttons
 * @param {HTMLElement[]} elements - An array of HTML elements of buttons.
 */
const clearStatusClass = (element) => {
    element.forEach((btn) => {
        btn.classList.remove("correct", "wrong");
    });
}

//prevents user from selecting multiple answers

const disableAnswerButtons = () => {
    const answerButtons = document.querySelectorAll(".btn-a");
    answerButtons.forEach((button) => {
        button.disabled = true;
    });
};

//NEXT button functionality which clears timer, displays new question and start timer again


const next = () =>{
    clearInterval(timeCounter);
    getNewQuestion();
    startTimer(20);
    acceptingAnswers = true;
}

document.querySelector("#next-btn").addEventListener("click", next);
/*function to activate level buttons
*add selected level to question display area
*/
const activateButton = (selectedLevelBtn) => {
    document
        .querySelectorAll(".level-btns")
        .forEach((button) => button.classList.remove("active"));
    selectedLevelBtn.classList.add("active");

    document.getElementById("selected-level").textContent = selectedLevelBtn.textContent;

};

/* Wait for document to fully load and execute content
* @param {Event} event - The form submission event.
*Username and Level selection process
*Hide start area and display question area
*alert when is either level or username missing
*/

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start").addEventListener("submit", async function(event) {
        event.preventDefault();

        const selectedLevel = document.querySelector(".level-btns.active");
        const usernameEntered = document.getElementById("username");

        (usernameEntered.value && selectedLevel)
        ? (
            hideArea(startQuizArea),
            displayArea(questionArea),
            await startGame(selectedLevel.dataset.level)
          )
        : alert("Please select Username and Level.");
    });
    document.querySelectorAll(".level-btns").forEach(function(button) {
        button.addEventListener("click", function() {
            activateButton(button);
        });
    });
});

/**
 * API fetch error handling
 * page reloads if error occurs
 * @param {error} error
 */
const handleFetchError = (error) => {
    alert("Error fetching data. Please try again later.");
    setTimeout(() => {
        location.reload();
    }, 1000);

};

/**
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

function showInstructions(show) {
    let instructionsContainer = document.getElementById("instructions");
    instructionsContainer.style.display = show ? "block" : "none";
}

function showForm(show) {
    let feedbackContainer = document.getElementById("feedback");
    feedbackContainer.style.display = show ? "block" : "none";
}