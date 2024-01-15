


let questions = [];

/**
 * Fetch data from API
 * Make a GET request using the Fetch API 
  */

fetch('https://opentdb.com/api.php?amount=10&category=32&type=multiple')
    .then(response => {
        if (!response.ok) {
            throw new Error('Database response failed');
        }
        return response.json();
    })
    .then(apiData => formatQuestions(apiData.results))
    .then(questions => console.log(questions))
    .catch(error => {
        console.error('Error:', error);
    });

/* Function to format questions obtained from the API
*Shuffling the answers (incorrect + correct) for the question; 
*/

function formatQuestions(apiData) {
    return apiData.map(apiQuestion => {
        return {
            difficulty: apiQuestion.difficulty,
            question: apiQuestion.question,
            correctAnswer: apiQuestion.correct_answer,
            answers: shuffleArray([...apiQuestion.incorrect_answers, apiQuestion.correct_answer])
        };
    });
}
/**
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

function showInstructions(show) {
    var instructionsContainer = document.getElementById('instructions');
    instructionsContainer.style.display = show ? 'block' : 'none';
}

function showForm(show) {
    var feedbackContainer = document.getElementById('feedback');
    feedbackContainer.style.display = show ? 'block' : 'none';
}

/**
 * Check for username field values
 * @param {string} username - The username to be checked.
 * @returns {boolean} - Returns true if the field is populated
 */

const checkUsername = (username) => {
    if (!username) {
        alert("Please ennter your username!");
        return false;
    }
    return true;
};
