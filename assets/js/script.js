
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