const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i]);
    }
    //console.log(availableQuestions);
}
//Set question number,question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    //console.log(questionIndex);
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //Get the position of 'questionIndex' from the availableQuestion Array 
    const index1 = availableQuestions.indexOf(questionIndex);
    //console.log(index1);
    //console.log(questionIndex);
    //Remove the 'questionIndex' from the availableQuestion array, so that the question will not repeat
    availableQuestions.splice(index1, 1);
    //console.log(questionIndex);
    //console.log(availableQuestions);

    //Get the length of options
    const optionLen = currentQuestion.options.length
    //console.log(currentQuestion.options);
    //push options into availableOptions Array
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i);
    }
    //console.log(availableOptions);

    optionContainer.innerHTML = '';

    let animationDelay = 0.2;
    //create options in html
    for(let i=0;i<optionLen;i++){
        //Random option
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        //Get the position of 'optionIndex' from 'availableOptions'
        const index2 = availableOptions.indexOf(optionIndex);
        //Remove the 'optionIndex' from 'availableOptions', so that the option does not repeat
        availableOptions.splice(index2,1);
        //console.log(optionIndex);
        //console.log(availableOptions);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }



    questionCounter++;

}

//Get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //Get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer){
        //set the green color to the correct option
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        //console.log(correctAnswers);
    }
    else{
        //set the red color to wrong option
        element.classList.add("wrong");

        //add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //If the answer is incorrect show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        
    }
    attempt++;
    unclickableOptions();

}
//make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);    }

}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        console.log("Quiz Over");
        quizOver();

    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quiz quizBox
    quizBox.classList.add("hide");

    //show resultBox
    resultBox.classList.remove("hide");
    quizResult();

}

//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)* 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;

}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    //Hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    //Hide resultBox
    resultBox.classList.add("hide");
    //Show homeBox
    homeBox.classList.remove("hide");
    resetQuiz();
}

//STARTING HERE
function startQuiz(){

    //Hide homeBox
    homeBox.classList.add("hide");
    //Show quizBox
    quizBox.classList.remove("hide");
    //First we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //Second we will call getNewQuestion(); function
    getNewQuestion();

    //To create indicators of answers
    answersIndicator();

}

window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}

