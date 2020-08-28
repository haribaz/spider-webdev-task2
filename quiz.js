//QUESTIONS
const questions = [
    { question: 'How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?',
      answer: [
          { solution: 'More than 50', correct: false},
          { solution: 'More than 100', correct: false},
          { solution: 'More than 150', correct: false},
          { solution: 'More than 200', correct: true}
      ],
      status: 'not answered'
    },

    { question: 'Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?',
      answer: [
          { solution: 'Monkeys', correct: true},
          { solution: 'Lizards', correct: false},
          { solution: 'Hens', correct: false},
          { solution: 'Kites', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'In a study, which cells are found in COVID-19 patients bode well for long term immunity?',
      answer: [
          { solution: 'P-cell', correct: false},
          { solution: 'D-Cell', correct: false},
          { solution: 'T-Cell', correct: true},
          { solution: 'Endothelial Cells', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'Name the vaccine that is jointly developed by the German company BioNTech and US pharma giant Pfizer for COVID-19?',
      answer: [
          { solution: 'BNT162', correct: true},
          { solution: 'PICOVACC', correct: false},
          { solution: 'Both A and B', correct: false},
          { solution: 'Neither A nor B', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?',
      answer: [
          { solution: 'Plasma Therapy', correct: true},
          { solution: 'Solidarity', correct: false},
          { solution: 'Remdesivir', correct: false},
          { solution: 'Hydroxychloroquine', correct: false}
      ],
      status: 'not answered'
    },

    { question: ' What is Coronavirus?',
      answer: [
          { solution: 'It is a large family of viruses', correct: false},
          { solution: 'It belongs to the family of Nidovirus', correct: false},
          { solution: 'Both A and B are correct', correct: true},
          { solution: 'Only A is correct', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'The first case of novel coronavirus was identified in .....',
      answer: [
          { solution: 'Beijing', correct: false},
          { solution: 'Shangai', correct: false},
          { solution: 'Wuhan, Hubei', correct: true},
          { solution: 'Tianjin', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'Which of the following diseases are related to coronavirus?',
      answer: [
          { solution: 'MERS', correct: false},
          { solution: 'SARS', correct: false},
          { solution: 'Both A and B', correct: true},
          { solution: 'Neither A nor B', correct: false}
      ],
      status: 'not answered'
    },

    { question: 'From where coronavirus got its name?',
      answer: [
          { solution: 'Due to their crown-like projections', correct: true},
          { solution: 'Due to their leaf-like projections', correct: false},
          { solution: 'Due to their surface structure of bricks', correct: false},
          { solution: 'None of the above', correct: false}
      ],
      status: 'not answered'
    },

    { question: ' Mild Symptoms of Novel coronavirus are:',
      answer: [
          { solution: 'Fever', correct: false},
          { solution: 'Cough', correct: false},
          { solution: 'Shortness of breath', correct: false},
          { solution: 'All of the above', correct: true}
      ],
      status: 'not answered'
    }
];

//DOM ELEMENTS
const quizBox = document.getElementById('quiz-box');
const startButton = document.getElementById('start');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const questionBox = document.getElementById('question-box');
const questionObject = document.getElementById('question');
const optionButtons = document.getElementById('options');
const statusElement = document.getElementById('status');
const totalQuestions = document.getElementById('total-questions');
const highScore = document.getElementById('high-score');
const highTime = document.getElementById('high-time');
const percentage = document.getElementById('percentage');
const scoreElement = document.getElementById('score');
const resultTable = document.getElementById('result-table');
const tryAgainElement = document.getElementById('try-again');
const saveElement = document.getElementById('home');
const statusQuestionNumber = document.getElementById('question-number');
const statusScore = document.getElementById('pts');
const nameItemElement = document.getElementById('name-item');
const userNameElement = document.getElementById('user');
const highName = document.getElementById('high-name');
const timer = document.getElementById('timer');
const sideButtons = document.getElementsByClassName('li-btn');
const sidebar = document.getElementById('sidebar');

for(let i=0;i < questions.length;i++)
{
  sideButtons[i].addEventListener('click', () => {
    questionNumber=i;
    nextQuestion()
  })
}

//PROGRAM VARIABLES
let randomQuestions;
let numberOfTimesAttended;
let totalScore=0;
let username;
let questionNumber;
let numberOfCorrect=0;
let statusPoints=0;
const totalTime = 3;
let totalTimeinSeconds= totalTime * 60;
startButton.disabled = true;


//LOCAL STORAGE ELEMENT
const highScores = JSON.parse(localStorage.getItem('highScores')) || [{
  name: '-----',
  score: 0,
  d1: '-----'
}];
 
//EVENT LISTENERS
userNameElement.addEventListener('keyup', () => {
  startButton.disabled = false;
})

startButton.addEventListener('click', () => {
  startQuiz();
  setInterval(changeTimer, 1000);
});


nextButton.addEventListener('click', () => {
  questionNumber++;
  nextQuestion();
})


previousButton.addEventListener('click', () => {
  
    questionNumber--;
    nextQuestion();

})

submitButton.addEventListener('click', showResult)

tryAgainElement.addEventListener('click', () => {
  
  resetQuiz();
  startQuiz();
})

saveElement.addEventListener('click', () => {

  const endscore = {
    score: totalScore,
    name: userNameElement.value,
    d1: new Date()
  };
  highScores.push(endscore);
  highScores.sort((a,b) => b.score - a.score);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.replace("./quiz.html");
})
 
//FUNCTIONS

function openSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

//TIMER FUNCTION
function changeTimer() {
  let minutes = Math.floor(totalTimeinSeconds/60);
  let seconds = totalTimeinSeconds%60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  timer.innerHTML = `${minutes}:${seconds}`;
  if(minutes < 1 && seconds < 30)
  {
    timer.style.backgroundColor = 'red';
  }

  if( minutes === 0 && seconds === '00')
  {
    showResult();
    quizBox.classList.add('hide');
    resultTable.classList.remove('hide');
    return
  }
  totalTimeinSeconds--;
}

//RESET PROGRAM VARIABLES FOR TRY AGAIN BUTTON
function resetQuiz() {
  for(i=0;i<questions.length;i++)
  {
    sideButtons[i].style.backgroundColor = 'teal';
  }
  timer.style.backgroundColor = 'teal';
  resultTable.classList.add('hide');
  quizBox.classList.remove('hide');
  totalScore=0;
  numberOfCorrect=0;
  statusPoints=0;
  totalTimeinSeconds= totalTime * 60;
  statusScore.innerHTML = `${statusPoints}`
  questions.forEach(obj => {
     obj.status= 'not answered';
  })
}

//FUNCTION TO START QUIZ
function startQuiz() {
    getUserName();
    sidebar.classList.remove('hide');
    startButton.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5)
    questionNumber=0;
    questionBox.classList.remove('hide');
    nextQuestion();
}

//FUNCTION TO GET USERNAME
function getUserName() {
 username = userNameElement.value;
 document.getElementById('user').classList.add('hide');
}

//FUNCTION TO ASSIGN NEXT QUESTION 
function nextQuestion() {
   removeOptions();
   displayQuestion(randomQuestions[questionNumber]);
}

//FUNCTION TO DISPLAY QUESTION AND OPTIONS
function displayQuestion(question) {
  statusElement.classList.add('hide');
  statusQuestionNumber.innerHTML = `${questionNumber+1}/${questions.length}`;
  
  questionObject.innerHTML = question.question;
  question.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.solution;
    button.classList.add('btn');
    if(answer.correct)
    {
       button.dataset.correct = answer.correct;
    } 
  //CONDITION TO NOT ANSWER A QUESTION MORE THAN ONCE
  if(question.status === 'answered'){
    button.disabled = true;
    button.style.backgroundColor = 'gray';
    
    if(questionNumber > 0)
    {
    previousButton.classList.remove('hide');
    }

    if(questionNumber+1 < questions.length)
    {
      nextButton.classList.remove('hide');
    }else
    {
      submitButton.classList.remove('hide');
    }
    statusElement.innerHTML = 'Answered';
    statusElement.classList.remove('hide');
  }
    button.addEventListener('click', checkAnswer);
    optionButtons.appendChild(button);
    
         }
       )
    }
    
    //FUNCTION TO REMOVE OPTIONS AND UPDATE NEW OPTIONS EVERYTIME NEXT OR PREVIOUS BUTTON IS CLICKED
    function removeOptions()
    {
      removeColor(document.body);
      nextButton.classList.add('hide');
      previousButton.classList.add('hide');
      submitButton.classList.add('hide');
      while(optionButtons.firstChild)
      {
        optionButtons.removeChild(optionButtons.firstChild);
      }
    }
    
    //FUNCTION TO CHECK THE ANSWER
    function checkAnswer(event) {
      sideButtons[questionNumber].style.backgroundColor = 'blueviolet';
      const button = event.target;
      const string = button.dataset.correct;
      if(string === 'true')
      {
        numberOfCorrect++;
        statusPoints +=10;
        statusScore.innerHTML = `${statusPoints}`;
      }
      questions[questionNumber].status = 'answered';
      showColor(document.body,string)
      showColor(button,string);
      Array.from(optionButtons.children).forEach(button => {
        button.disabled=true;
        }
      )
      if(questionNumber === 0){
        nextButton.classList.remove('hide');
      } else if (questions.length > questionNumber + 1) {
        nextButton.classList.remove('hide');
        previousButton.classList.remove('hide');
      } else {
        previousButton.classList.remove('hide');
        submitButton.classList.remove('hide');
    
      }
      
    }

    //RESULT PAGE FUNCTION
    function showResult() {
    removeColor(document.body);
     nameItemElement.innerHTML = username;
     totalQuestions.innerHTML = `${questions.length}`;
     let totalPercentage = (numberOfCorrect/questions.length)*100;
     percentage.innerHTML = `${totalPercentage}%`;
     totalScore = numberOfCorrect*10;
     scoreElement.innerHTML = `${totalScore}`;
     highName.innerHTML = `${highScores[0].name}`;
     highScore.innerHTML = `${highScores[0].score}`;
     let d2 = new Date(highScores[0].d1);
     highTime.innerHTML = d2;
     quizBox.classList.add('hide');
     resultTable.classList.remove('hide');
     sidebar.classList.add('hide');
    }
    
    //FUNCTION TO ASSIGN COLOUR BASED ON THE ANSWER
    function showColor(selected,string) {
      removeColor(selected);
      if (string) {
        selected.classList.add('correct')
      } else {
        selected.classList.add('wrong')
      }
      
    }

    //FUNCTION TO REMOVE COLOUR AFTER EVERY QUESTION
    function removeColor(selected)
    {
      selected.classList.remove('correct');
      selected.classList.remove('wrong');
    }

