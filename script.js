const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const timeBar = document.getElementById('time-bar');
const timeLeft = document.getElementById('time-left');

const myQuestions = [
  {
    question: "Which of these scholarly speakers says the famous quote, 'It is Your Journey'?",
    answers: {
      a: "Doug Hampton",
      b: "Charlles Remington",
      c: "Deodat Sharma"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];

// Timer variables
let timeRemaining = 180; // 3 minutes in seconds
let timerInterval;

// Current page index
let currentQuestionIndex = 0;

// Array to store the user's answers
let userAnswers = [];

function buildQuiz() {
  const currentQuestion = myQuestions[currentQuestionIndex];
  const answers = [];

  for (let letter in currentQuestion.answers) {
    answers.push(
      `<label>
        <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
        ${letter} : ${currentQuestion.answers[letter]}
      </label>`
    );
  }

  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answers.join('')}</div>
  `;

  // Show "Submit Quiz" button only on the last question
  if (currentQuestionIndex === myQuestions.length - 1) {
    submitButton.style.display = 'inline-block'; // Show Submit button
    nextButton.style.display = 'none'; // Hide Next button on last question
  } else {
    submitButton.style.display = 'none'; // Ensure Submit button is hidden before the last question
    nextButton.style.display = 'inline-block'; // Show Next button for all other questions
  }
}

function showResults() {
  let numCorrect = 0;
  
  // Create an output to show each question with the user's selected answer
  let resultsHTML = '<h2>Your Results:</h2>';

  // Loop through all questions and show results
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const userAnswer = userAnswers[questionNumber]; // Get the selected answer from userAnswers array
    
    // Check if the user answer matches the correct answer
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    }

    // Append question results to resultsHTML
    resultsHTML += `
      <div class="result-question">
        <p><strong>Question ${questionNumber + 1}:</strong> ${currentQuestion.question}</p>
        <p>Your answer: ${currentQuestion.answers[userAnswer] || "None"}</p>
        <p>Correct answer: ${currentQuestion.answers[currentQuestion.correctAnswer]}</p>
        <p style="color: ${userAnswer === currentQuestion.correctAnswer ? 'lightgreen' : 'red'}">
          ${userAnswer === currentQuestion.correctAnswer ? 'Correct' : 'Incorrect'}
        </p>
      </div>
    `;
  });

  resultsContainer.innerHTML = resultsHTML;
  resultsContainer.innerHTML += `<h3>You got ${numCorrect} out of ${myQuestions.length} correct!</h3>`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeLeft.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    const progressBarWidth = (timeRemaining / 180) * 100;
    timeBar.style.width = `${progressBarWidth}%`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

function showNextQuestion() {
  const currentQuestion = myQuestions[currentQuestionIndex];

  // Get the selected answer for the current question
  const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);

  // If there's a selected answer, save it in the userAnswers array
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  } else {
    userAnswers[currentQuestionIndex] = null; // If no answer is selected, save null
  }

  if (currentQuestionIndex < myQuestions.length - 1) {
    currentQuestionIndex++;
    buildQuiz(); // Update the quiz with the next question
  }
}

function submitQuiz() {
/*
  WITH THIS CODE IT CAN APPEND QUESTION 3 WITH THE SUBMIT QUIZ BUTTON
  BUT THE ARRAY GETS ERASED AND ONLY 3RD OPTION APPEARS

  
  clearInterval(timerInterval); // Stop the timer
  
  // Collect answers for all questions (similar to what showNextQuestion does)
  myQuestions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    
    if (selectedAnswer) {
      userAnswers[index] = selectedAnswer.value;
    } else {
      userAnswers[index] = null; // If no answer is selected, save null
    }
  });
*/
  
  // Now call the function to show results (you can display userAnswers here if needed)
  showResults();

  clearInterval(timerInterval); // Stop the timer
  showResults(); // Show the results immediately when the user clicks Submit
}

function initQuiz() {
  
  buildQuiz(); // Display the first question
  startTimer();

  nextButton.addEventListener('click', showNextQuestion);
  submitButton.addEventListener('click', submitQuiz); // Attach submitQuiz to the Submit button
}

initQuiz();
