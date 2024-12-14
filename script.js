const startBtn = document.querySelector('.shrink-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const backHomeBtn = document.querySelector('.backHome-btn');

const bgMusic = document.getElementById('bgMusic');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
    bgMusic.play();
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
} 

continueBtn.onclick = () => {
   quizSection.classList.add('active');
   popupInfo.classList.remove('active');
   main.classList.remove('active');
   quizBox.classList.add('active');

   showQuestions(0);
   questionCounter(1);
   headerScore();
} 

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0; 
    questionNumb = 1; 
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();

} 

backHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0; 
    questionNumb = 1; 
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

} 

let questionCount = 0; 
let questionNumb = 1; 
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
} 

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                     <div class="option"><span>${questions[index].options[2]}</span></div>
                     <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

const correctImages = ['https://i.imgflip.com/61avdr.png?a481416', 'https://v.wpimg.pl/MmJhNjg4YgwrCjhZSE9vGWhSbAMOFmFPP0p0SEgFf1V6EGEMDlgoHy8YIUQARjgdKx8-RBdYYgw6AWEcVhspBDkYIgseGygAKA0qRVdXfQwrXH9eSlB5XX1Fel5QBWBVcg16R1QFeF8oCXhSXw14C2gV', 'https://media.istockphoto.com/id/157030584/vector/thumb-up-emoticon.jpg?s=612x612&w=0&k=20&c=GGl4NM_6_BzvJxLSl7uCDF4Vlo_zHGZVmmqOBIewgKg=', 'https://i.pinimg.com/736x/d0/9d/f8/d09df851e636fc7377e7a5fb048706c0.jpg', 'https://ih1.redbubble.net/image.5062201877.9574/st,small,507x507-pad,600x600,f8f8f8.u1.jpg'];
const incorrectImages = ['https://media.tenor.com/JQZPRf0YTicAAAAM/emoji-in-distress-emoji-sad.gif', 'https://media.tenor.com/ZKLL5ioVTcEAAAAM/emoji-sad.gif', 'https://media.tenor.com/G_6Rpef99_IAAAAM/crying-sad-shayari-life.gif', 'https://content.imageresizer.com/images/memes/Crying-Face-meme-8.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAtN1j61cOaAamjbBiaN--27-hQ5zjMJSYRjrTsh8_YsjJnAsThctlpyXiOoMo0Ze6m4&usqp=CAU'];

function getRandomImage(imagesArray) {
    const randomIndex = Math.floor(Math.random() * imagesArray.length); 
    return imagesArray[randomIndex]; 
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    const feedbackImage = document.getElementById('feedbackImage');

    feedbackImage.style.display = 'none';

    if (userAnswer == correctAnswer) {
        answer.classList.add('Correct');
        userScore += 1;
        headerScore();

        feedbackImage.src = getRandomImage(correctImages);
        feedbackImage.style.display = 'inline';

    } else {
        answer.classList.add('Incorrect');

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option Correct');
            }
        }

        feedbackImage.src = getRandomImage(incorrectImages);
        feedbackImage.style.display = 'inline';

    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('Disabled');
    }

    nextBtn.classList.add('active');

    setTimeout (() => {
        feedbackImage.style.display = 'none';
    }, 1000);
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Final score ${userScore} out of ${questions.length}`;

    const messageResult = document.querySelector('.message-result');
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    if (userScore >= 25) {
        messageResult.textContent = 'Congratulations!';
    } else if  (userScore >= 15) {
        messageResult.textContent = 'Well Done!';
    } else {
        messageResult.textContent = 'Try Again!';
    }

    let progress = setInterval(() => {
        progressStartValue++;
       
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#ffb6c1 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        } 
    }, speed);
}

function showInfo() {
    var infoSection = document.getElementById("groupInfo");
    var homeLink = document.getElementById("homeLink");
    var infoLink = document.getElementById("infoLink");

    homeLink.style.display = "none";
    infoLink.style.display = "none";

    infoSection.classList.add("open");
}

function closeInfo() {
    var infoSection = document.getElementById("groupInfo");
    var homeLink = document.getElementById("homeLink");
    var infoLink = document.getElementById("infoLink");

    infoSection.classList.remove("open");

    homeLink.style.display = "inline";
    infoLink.style.display = "inline";
}

window.onload = function() {
    document.getElementById("infoLink").addEventListener("click", showInfo);
    document.getElementById("closeInfoBtn").addEventListener("click", closeInfo);
}