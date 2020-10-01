var quizStart = document.getElementById("quizStart");
var timeEl = document.getElementById("time");
var questionText = document.getElementById("question")
var answerText = document.getElementById("answer")
var answerList = document.getElementById("answer-list")
var loopNum = 0;
var totalCorrect = 0;
var secondCountdown;
var currQuestionIdx = 0;
var userSave;
var quizContent = [
  {
    question: "WHAT DOES HTML STAND FOR?",
    answers: [
      { text: "Hypertext Mark-up Language", isCorrect: true},
      { text: "Hoagie with Tomato Meat and Lettuce", isCorrect: false},
      { text: "Holy Toledo, My Lord!", isCorrect: false},
      { text: "Hot Tamale Me Like!", isCorrect: false},
    ]
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<scripting>", isCorrect: false},
      { text: "<js>", isCorrect: false},
      { text: "<script>", isCorrect: true},
      { text: "<javascript>", isCorrect: false},
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: "The <body> section", isCorrect: false},
      { text: "Both the <head> section and the <body> section", isCorrect: true},
      { text: "The <head> section", isCorrect: false},
      { text: "Neither the <head> section or the <body> section", isCorrect: false},
    ]
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: [
      { text: "<script src = 'xxx.js'>", isCorrect: true},
      { text: "script name = 'xxx.js'>", isCorrect: false},
      { text: "<script href='xxx.js'>", isCorrect: false},
      { text: "<script.js>", isCorrect: false},
    ]
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "msg('Hello World')", isCorrect: false},
      { text: "alert('Hello World')", isCorrect: true},
      { text: "msgBox('Hello World')", isCorrect: false},
      { text: "alertBox('Hello World')", isCorrect: false},
    ]
  },
  
]
var answerButtons = ["A","B","C","D"]
var userName = prompt("Please enter your inititals");
var userInfo;

function save(){
  userSave = confirm("Would you like to save your high score?")
  if(userSave){
    userInfo = [{Initials: userName},{Score: totalCorrect}]
    localStorage.setItem("LastGame", JSON.stringify(userInfo))
  }
  
  
}

var countdownStart = 6;
function quizCountdown(){
  
  var initialCountdown = setInterval(function(){
  countdownStart--;
  timeEl.textContent = countdownStart + " Seconds left until start!";
  if(countdownStart === 0){
    clearInterval(initialCountdown);
    displayQuestion();
    timeEl.textContent = ""
    quizTimer();
  }
  }, 1000)
  
}
function displayQuestion(){
  var currQuestion = quizContent [currQuestionIdx]

  questionText.textContent = currQuestion.question; //display the question
  for(loopNum=0;loopNum<answerButtons.length;loopNum++){ //loop through answers
    var listItem = document.createElement("li")
    listItem.textContent = currQuestion.answers[loopNum].text
    var button = document.createElement("button")
    button.setAttribute("class", "btn btn-primary")
    button.setAttribute("isCorrect", currQuestion.answers[loopNum].isCorrect)
    button.textContent = answerButtons[loopNum]
    listItem.appendChild(button);
    answerList.appendChild(listItem)
    answerList.addEventListener("click", checkAnswer)
  }
}


function quizTimer(){
  countdownStart = 30;
  secondCountdown = setInterval(function(){
  countdownStart--;
  timeEl.textContent = countdownStart + " Seconds left to finish!"; 
  console.log(currQuestionIdx)
  if(countdownStart === 0){
    clearInterval(secondCountdown);
    timeEl.textContent = "Game Over!"
    timeEl.innerText = ("You got  "+ totalCorrect +" right!")
    save();
  } 
  },1000)
}

function checkAnswer(e){
    var isCorrect = e.target.attributes[1].value
    console.log(isCorrect)
    switch (isCorrect){
      case "true":
        totalCorrect++;
        currQuestionIdx++
        questionText.innerHTML = ""
        answerList.innerHTML = ""
        displayQuestion()
        break;
      case "false":
        currQuestionIdx++
        countdownStart--;
        countdownStart--;
        countdownStart--;
        countdownStart--;
        countdownStart--;
        questionText.innerHTML = ""
        answerList.innerHTML =""
        displayQuestion();
        break;
    }
}

quizStart.addEventListener("click", quizCountdown)