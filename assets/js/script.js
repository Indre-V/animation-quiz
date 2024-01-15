const startBtn = document.querySelector("#start");
const level = document.querySelectorAll("#level-btns");
const username = document.querySelector("#username");
const questionDisplay = document.getElementById("question-display");

let questionNumber = 0; //holds the current question number
let questions = []; // declare questions array

const questionWindow = () => {
    questionDisplay.style.display = "block";
};

// Wait for the document to be loaded
document.addEventListener("DOMContentLoaded", function () {
    startBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const level = document.querySelector("#level-btns").value;
        const username = document.querySelector("#username").value;
        questions = await apiData(level);
        startQuiz(username, level);
    
    })
});

/**
 * Fetch data from API
 * Make a GET request using the Fetch API 
  */

const apiData = (level) => {
    return fetch(`https://opentdb.com/api.php?amount=10&category=32&type=multiple`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => formatQuestions(data.results))
        .catch(error => {
            console.error("Error fetching data:", error);
           
        });
};
/* Function to format questions obtained from the API
*Shuffling the answers (incorrect + correct) for the question; 
*/
const shuffle = (answers) => answers.sort(() => Math.random() - 0.5)

function formatQuestions(apiData) {
    return apiData.map(apiQuestion => {
        return {
            level: apiQuestion.difficulty,
            question: apiQuestion.question,
            correctAnswer: apiQuestion.correct_answer,
            answers: shuffle([...apiQuestion.incorrect_answers, apiQuestion.correct_answer])
        };
    });
}

/**
 * Display the next question
 * @param {string} username - The username of the player.
 * @param {string} level - The difficulty level of the quiz.
 */

const displayNextQuestion = (username, level) => {
    if (questionNumber < questions.length) {
        let currentQuestion = questions[questionNumber];
        document.getElementById('question').innerText = currentQuestion.question;

        const answerButtons = document.querySelectorAll('.btn-a');
        for (let i = 0; i < answerButtons.length; i++) {
             answerButtons[i].innerText = currentQuestion.answers[i];
             answerButtons[i].addEventListener('click', () => checkAnswer(answerButtons[i].innerText));

        questionWindow();
        formatQuestions(apiData);

}
// Increment the question index
questionNumber++;

} else {
    
    gameOver();
  }
}

// Function to start the quiz
const startQuiz = (username, level) => {

    if (!checkUsername(username)) return;

    document.getElementById('start-area').classList.add('hide');
    document.getElementById('question-display').classList.remove('hide');
  
    questionNumber = 0;
    userScore = 0;
    displayNextQuestion(username, level);
  };
  

/**
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

function showInstructions(show) {
    let instructionsContainer = document.getElementById('instructions');
    instructionsContainer.style.display = show ? 'block' : 'none';
}

function showForm(show) {
    let feedbackContainer = document.getElementById('feedback');
    feedbackContainer.style.display = show ? 'block' : 'none';
}

/**
 * Check for username field values
 * @param {string} username - The username to be checked.
 * @returns {boolean} - Returns true if the field is populated
 */

const checkUsername = (username) => {
    if (!username) {
        alert("Please enter your username!");
        return false;
    }
    // else if (!level) {
    //     alert("Please select level!");
    //     return false;
    // }
    
    return true;
};


