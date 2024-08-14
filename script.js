const questions = [
  {
    question: "Which is the largest animal in the World",
    answers: [
      { text: "Shark", correct: false},
      { text: "Blue Whale", correct: true},
      { text: "Elephant", correct: false},
      { text: "Giraffe", correct: false},
    ]
  },
  {
    question: "Who is the Prime Minister of India",
    answers: [
      { text: "Rahul Gandhi", correct: false},
      { text: "Monkey", correct: false},
      { text: "Sachin Tendulkar", correct: false},
      { text: "Narendra Modi", correct: true},
    ]
  },
  {
    question: "Which is the National Bird of India",
    answers: [
      { text: "Shark", correct: false},
      { text: "Peacock", correct: true},
      { text: "Elephant", correct: false},
      { text: "Giraffe", correct: false},
    ]
  },
  {
    question: "Aayein Baigan Meme is from which State",
    answers: [
      { text: "Uttar Pradesh", correct: false},
      { text: "Pluto", correct: false},
      { text: "Antartica", correct: false},
      { text: "Bihar", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState() {
  nextButton.style.display = "none";
  while(answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}


function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if(isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  }else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disable = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  }else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=> {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }else {
    startQuiz();
  }
})


startQuiz();
