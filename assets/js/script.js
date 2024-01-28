const startQuizAreaRef = document.querySelector("#start-area");
const questionAreaRef = document.querySelector("#question-area");
const gameOverAreaRef = document.querySelector("#game-over");
const startButtonRef = document.querySelector("#start");
const loaderRef = document.querySelector('#loader');
const levelBtnsRef = document.querySelectorAll(".level-btns");
const selectedLevelRef = document.querySelector("#selected-level");
const progressTextRef = document.querySelector("#progress-text");
const scoreRef = document.querySelector("#score");
const incorrectScoreRef = document.querySelector("#incorrect");
const correctScoreRef = document.querySelector('#correct-score');
const scoreMessageRef = document.querySelector("#score-message");
const playAgainRef = document.querySelector("#play-again-btn");
const usernameRef = document.querySelector("#username");
const secondsRef = document.querySelector("#seconds");
const questionElementRef = document.querySelector("#question");
const answerButtonsRef = document.querySelectorAll(".btn-a");
const highScoresBtnRef = document.querySelector("#high-scores-btn");
const scoreIndicatorRef = document.querySelector('#score-dots');
const answerButtonsArray = Array.from(document.getElementsByClassName("btn-a"));

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const hideArea = (area) => area.classList.add("hide");
const displayArea = (area) => area.classList.remove("hide");


let correctScore = 0;
let incorrectScore = 0;
let questionNumber = 10;


let quizQuestions = [];
let acceptingAnswers = true;
let timeCounter;

const SCORE_BONUS = 1;
const MAX_QUESTIONS = 10;

/***
 * Function to update progress dots based on the answer status
 * @param {string} status - The status of the answer, either 'correct' or 'wrong'.
 */
const updateProgressDots = (status) => {
    const dot = document.createElement('div');
    dot.classList.add('progress-dot');
    dot.classList.add(status);
    scoreIndicatorRef.appendChild(dot);
}

/** 
 * Increments the correct and incorrect score
 * @param {number} num - Increments the score by set number.
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
 * Sets timer for the quiz 
 * Counts down from specified time
 * @param {number} time - The time is set in seconds
 */

const startTimer = () => {
    clearInterval(timeCounter);
    let sec = 20; 
    const timerElement = secondsRef;
    timeCounter = setInterval(() => { 
        timerElement.textContent = sec;
        sec--; 
        if (sec < 0) { 
            clearInterval(timeCounter); 
            handleTimeUp(); 
        }
    }, 1000); 
}

/**
 * Handles the time-up event
 */
 
const handleTimeUp = () => {
    updateProgressDots('empty');
    getNewQuestion();
    acceptingAnswers = true;
}

/*
* After last question, Game Over is called
*/

const gameOver = () => {
    clearInterval(timeCounter);
    displayArea(gameOverAreaRef);
    hideArea(questionAreaRef);
    displayFinalScore();
};

/*
*Display final score
*Construct a score object containing the user's name and their score
*Add score to local storage
*Score message based on the score
*Retrieves username entered 
*/
const displayFinalScore = () => {
    const usernameEntered = usernameRef.value;
    const score = parseInt(scoreRef.textContent);

    const scoreObject = {
        name: usernameRef.value,
        score: score
        
    };
console.log("add score");

    highScores.unshift(scoreObject);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    let scoreMessage = "";

    if (score < 5) {
        scoreMessage = `${usernameEntered} can do better! Keep trying.`;
    } else {
        scoreMessage = `Congratulations! ${usernameEntered} done a great job!`;
    }

    scoreMessageRef.textContent = scoreMessage;
    correctScoreRef.textContent = score;
};

/**
 * Displays high scores in an alert dialog.
 * @param {Array} highScores - An array containing high scores objects with properties 'name' and 'score'.
 */

const displayHighScoresAlert = () => {

    let highScoresString = 'Player Scores:\n';
    highScores.forEach((score, index) => {
        highScoresString += `${index + 1}. ${score.name}: ${score.score}\n`;
    });

    alert(highScoresString);
};

highScoresBtnRef.addEventListener("click", displayHighScoresAlert);

/*
*Reset the game
*Activate reload page
*/

const resetGame = () => {
    location.reload();
}

playAgainRef.addEventListener("click", resetGame);

const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);

/**
 * Fetches trivia questions from the Open Trivia Database API based on the specified difficulty.
 * @param {string} difficulty - adjustable setting chosen.
 * @returns {Promise<Array>} - returns a promise of formatted questions.
 * @throws {Error} throws an error if does not fetch.
 */

const fetchQuestions = (difficulty) => {
    displayArea(loaderRef);
    hideArea(questionAreaRef);
    const apiLink = `https://opentdb.com/api.php?amount=10&category=32&type=multiple&difficulty=${difficulty}`;

    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch API questions.`);
            }
            hideArea(loaderRef);
            displayArea(questionAreaRef);
            return response.json();
        })
        .then(apiData => formatQuestions(apiData.results))
        .catch(error => {
            handleFetchError(error);
            throw error;
        });
};

/** 
* @param {object} apiQuestions - The  data from the API.
* @returns {object} A formatted question object with properties obtained from API
*/

const formatQuestions = (apiQuestions) => {
    return apiQuestions.map(apiQuestion => ({
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
 * @returns {Promise<void>} A promise that resolves when the game is successfully started.
 * @param {Error} error - hadles error if fails to start
 */

const startGame = async (difficulty) => {
    try {
        quizQuestions = await fetchQuestions(difficulty);
        console.log("load", difficulty);
        questionNumber = 0;
        getNewQuestion();

    } catch (error) {
        handleFetchError(error);
    }
}

/*
* Loads and displays new question onto the quiz.
* Display question text, answer choices
* Assign each answer to a specific button.
*/

const getNewQuestion = () => {
    console.log("start of get new question");

    if (questionNumber >= 10) {
        console.log("gameOver");
        return gameOver();
    }

    clearStatusClass(answerButtonsRef);

    console.log("displayQuestions", quizQuestions);

    answerButtonsRef.forEach((btn) => {
        btn.disabled = false;
    });

    acceptingAnswers = true;
    console.log("question number", questionNumber);

    let currentQuestion = quizQuestions[questionNumber];

    questionElementRef.innerHTML = currentQuestion.question;
    
    answerButtonsRef.forEach((button, i) => {
        button.innerHTML = currentQuestion.answers[i];
        button.addEventListener("click", handleAnswerClick);
    });

    progressTextRef.innerHTML = `Question ${questionNumber + 1}/${MAX_QUESTIONS}`;

    questionNumber++;

    console.log("startTime in get new question");
    startTimer();
};

// Event listener function for answer button clicks
const handleAnswerClick = (event) => {
    const selectedAnswer = event.target.innerHTML;
    checkAnswer(selectedAnswer);
};

/**
*Checks if the selected answer is correct
*Find button corresponding to the selected answer
*Check if the selected answer is correct
*Add a class to display correct answer
*/
const checkAnswer = (selectedAnswer) => {
    console.log("check Answer");
    const currentQuestion = quizQuestions[questionNumber - 1];
    const selectedButton = answerButtonsArray.find(
        (button) => button.innerHTML === selectedAnswer
    );

    const classToApply = selectedAnswer === currentQuestion.correctAnswer ? "correct" : "wrong";

    selectedButton.classList.add(classToApply);

    if (acceptingAnswers && selectedButton) {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            console.log("add correct score");
            incrementScore(SCORE_BONUS);
            updateProgressDots('correct');
            console.log ("update progress dots");
        } else {
            incrementIncorrect(SCORE_BONUS);
            updateProgressDots('wrong');
            console.log("add WRONG score");
            answerButtonsArray.find((button) => button.innerHTML === currentQuestion.correctAnswer)?.classList.add("correct");
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
 * @param {HTMLElement[]} elements - An array of HTML elements of buttons.
 */
const clearStatusClass = (element) => {
    element.forEach((btn) => {
        btn.classList.remove("correct", "wrong");
        btn.classList.remove("disabled");
    });
};

//prevents user from selecting multiple answers

const disableAnswerButtons = () => {
    answerButtonsRef.forEach((btn) => {
        btn.classList.add("disabled");
        btn.disabled = true;
    });
};

/** 
* Activate level buttons
* Adds selected level to question display area
*/

const activateButton = (selectedLevelBtn) => {
    levelBtnsRef.forEach((button) => button.classList.remove("active"));
    selectedLevelBtn.classList.add("active");
    selectedLevelRef.textContent = selectedLevelBtn.textContent;
};

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

const supportElements = {
    'show-instructions': 'instructions',
    'show-contactForm': 'feedback',
    'close-instructions': 'instructions',
    'close-contactForm': 'feedback'
};

document.addEventListener("click", (event) => {
    const { target } = event;
    const { id } = target;
    if (id in supportElements) {
        event.preventDefault();
        const show = id.startsWith('show');
        const supportElement = document.querySelector(`#${supportElements[id]}`);
        supportElement.style.display = show ? "block" : "none";
    }
});

/** 
*Wait for document to fully load and execute content
*@param {Event} event - the form submission event.
*Username and Level selection process
*Hide start area and display question area
*Alert when is either level or username missing
*/

document.addEventListener("DOMContentLoaded", function () {
    startButtonRef.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedLevel = document.querySelector(".level-btns.active");
        const usernameEntered = usernameRef;

        (usernameEntered.value && selectedLevel)
            ? (
                hideArea(startQuizAreaRef),
                displayArea(questionAreaRef),
                await startGame(selectedLevel.dataset.level)
            )
            : alert("Please select Username and Level.");
    });
    levelBtnsRef.forEach((button) => {
        button.addEventListener("click", () => {
            activateButton(button);
        });
    });
});