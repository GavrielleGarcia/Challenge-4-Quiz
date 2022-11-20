
//---------------Quiz section stats here-----------------

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "javascript",
        choiceB : "js",
        choiceC : "scripting",
        choiceD : "script",
        correct : "D"

    },{
        question : "Where is the correct place to insert a JavaScript?",
        choiceA : "Both the head and body",
        choiceB : "The body section",
        choiceC : "The head section",
        choiceD : "Div",
        correct : "B"
    },{
        question : "What is the correct syntax for referring to an external script called xxx.js?",
        choiceA : "script src=''xxx.js'' ",
        choiceB : "script name=''xxx.js''",
        choiceC : "script href=''xxx.js''",
        choiceD : "script label=''xxx.js''",
        correct : "A"
      },{
        question : "What does HTML stand for?",
        choiceA : "Hyper Transition Mark Linkage",
        choiceB : "HostText Markup Linkage",
        choiceC : "HyperText Markup Language",
        choiceD : "Host Transition Markup Language",
        correct : "C"
      },{
        question : "What does CSS stand for",
        choiceA : "Coding Style Sheet",
        choiceB : "Cascading Style System",
        choiceC : "Coding Style System",
        choiceD : "Cascading Style Sheet",
        correct : "D"
      },{
        question:  "What is HTML?",
        choiceA : " A standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.",
        choiceB : "A protocol for web site creation",
        choiceC : "A file",
        choiceD : "A method used to publish web pages",
        correct : "A"
      },{
        question:  "What is CSS functionality?",
        choiceA : "Is what connect the API to the html",
        choiceB : "Is where the text of a website is storaged",
        choiceC : "Is used for the logic behind the mathematical functions",
        choiceD : "Is used for styling and laying out webpages.",
        correct : "D"
      },{
        question:  "What does API stands for?",
        choiceA : "Application Programming Interface",
        choiceB : "Application Programming Intelect",
        choiceC : "Application Programming Information",
        choiceD : "Algorithm Programming Interface",
        correct : "A"
      },{
        question:  "What do APIs do",
        choiceA : "Is a data base",
        choiceB : "Is a software intermediary that allows two applications to talk to each other",
        choiceC : "Is a linkage between the computer and the server",
        choiceD : "Is a messenger between the server and the internet",
        correct : "B"
      },{
        question:  "What does JSON stands for",
        choiceA : "JavaScript Object Network",
        choiceB : "Java Object Notation",
        choiceC : "JavaScript Object Notation",
        choiceD : "Java Object Network",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    //Image choose based on the scorePerCent
    let img = (scorePerCent >= 80) ? "./assets/img/5.png" :
              (scorePerCent >= 60) ? "./assets/img/4.png" :
              (scorePerCent >= 40) ? "./assets/img/3.png" :
              (scorePerCent >= 20) ? "./assets/img/2.png" :
              "./assets/img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
//-------- Quiz ends here --------------

//-------- Submit starts here --------------


// Datepicker widget

var formEl = $('#skills-form');
var nameInputEl = $('#skill-name');
var scoreInputEl = $('#score-value');
var dateInputEl = $('#datepicker');
var skillsListEl = $('#skills-list');

var printSkills = function (name, _score, date) {
  var listEl = $('<li>');
  var listDetail = name.concat(' on ', date);
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(skillsListEl);
};

var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput = nameInputEl.val();
  var scoreInput = scoreInputEl.val();
  var dateInput = dateInputEl.val();

  if (!nameInput || !scoreInput || !dateInput) {
    console.log('You need to fill out the form!');
    return;
  }

  printSkills(nameInput, scoreInput, dateInput);

  // resets form
  nameInputEl.val('');
  scoreInputEl.val('');
  dateInputEl.val('');
};

formEl.on('submit', handleFormSubmit);


$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });