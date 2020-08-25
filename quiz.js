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

const startButton = document.getElementById('start');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const questionBox = document.getElementById('question-box');
const questionObject = document.getElementById('question');
const optionButtons = document.getElementById('options');
const statusElement = document.getElementById('status');


let questionNumber;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  questionNumber++;
  nextQuestion();
})


previousButton.addEventListener('click', () => {
  
    questionNumber--;
    nextQuestion();

})

function startQuiz() {
    startButton.classList.add('hide');
    questionNumber=0;
    questionBox.classList.remove('hide');
    nextQuestion();
}

function nextQuestion() {
   removeOptions();
   displayQuestion(questions[questionNumber]);
}

function displayQuestion(question) {
  statusElement.classList.add('hide');
  questionObject.innerHTML = question.question;
  question.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.solution;
    button.classList.add('btn');
    if(answer.correct)
    {
       button.dataset.correct = answer.correct;
    } 

  if(question.status === 'answered'){
    button.disabled = true;
    button.style.backgroundColor = 'gray';
    nextButton.classList.remove('hide');
    if(questionNumber > 0)
    {
    previousButton.classList.remove('hide');
    }
    statusElement.innerHTML = 'Answered';
    statusElement.classList.remove('hide');
  }
    button.addEventListener('click', checkAnswer);
    optionButtons.appendChild(button);
    
         }
       )
    }

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
    
    function checkAnswer(event) {
      const button = event.target;
      const string = button.dataset.correct;
      questions[questionNumber].status = 'answered';
      showColor(document.body,string)
      Array.from(optionButtons.children).forEach(button => {
        showColor(button,button.dataset.correct);
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

    function showColor(selected,string) {
      removeColor(selected);
      if (string) {
        selected.classList.add('correct')
      } else {
        selected.classList.add('wrong')
      }
      
    }

    function removeColor(selected)
    {
      selected.classList.remove('correct');
      selected.classList.remove('wrong');
    }
