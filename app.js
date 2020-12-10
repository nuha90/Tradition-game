const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
let img = document.querySelector(".image");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}
function getNewQuestin() {
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

  currentQuestion = questionIndex;
  img.src = currentQuestion.image;
  //questionImage.innerHTML = ;
  questionText.innerHTML = currentQuestion.q;

  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);

  const optionLen = currentQuestion.options.length;
  console.log(currentQuestion.options);
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  console.log(availableOptions);

  optionContainer.innerHTML = "";
  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);

    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function getResult(element) {
  const id = parseInt(element.id);
  if (id === currentQuestion.answer) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function next() {
  if (questionCounter === quiz.length) {
    console.log("over");
  } else {
    getNewQuestin();
  }
}

window.onload = function () {
  setAvailableQuestions();
  getNewQuestin();
};
