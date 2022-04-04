let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

// Function to generate question
function generateQuestions(index) { // Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    // Populate html elements
    questionEl.innerHTML = `${
        index + 1
    }. ${
        question.question
    }`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option1.innerHTML = `${
        question.answer1
    }`
    option2.innerHTML = `${
        question.answer2
    }`
    option3.innerHTML = `${
        question.answer3
    }`
    option4.innerHTML = `${
        question.answer4
    }`
}


function loadNextQuestion() {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    // Check if there is a radio input checked
    if (! selectedOption) {
        alert('Please select your answer!');
        return;
    }
    // Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    // //Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()


    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    // Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

    // once finished clear checked
    selectedOption.checked = false;
    // If quiz is on the final question
    if (currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }


    // If the quiz is finished then we hide the questions container and show the results
    if (currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML = `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Based on your score, you your most suitable UX career is... </p>
            <p>30 - 59 --> UX/UI Designer </p>
            <p>60 - 85 --> UX Strategist </p>
            <p>86 - 95 --> UX Researcher </p>
            <p>96 - 120 --> UX Writer </p>
            <p>Go to Learn More to get a description about each!</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

// Function to load previous question
function loadPreviousQuestion() { // Decrement quentions index
    currentQuestion--;
    // remove last array value;
    score.pop();
    // Generate the question
    generateQuestions(currentQuestion);
}

// Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if (e.target.matches('button')) { // reset array index and score
        currentQuestion = 0;
        score = [];
        // Reload quiz to the start
        location.reload();
    }
}

generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
result.addEventListener('click', restartQuiz);
