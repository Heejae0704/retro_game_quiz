let quizNum = 0;
let quizScore = 0;

function addStageCount(){
    quizNum++;
    $('.quiz-number').text("Stage " + quizNum + "/10");
}

function toggleHidden(selector){
    $(selector).toggleClass("hidden");
}

function getQuestionString(obj){
    console.log("generating questionString");
    return `
    <fieldset>
        <legend class="question">${obj.question}</legend>
        <div class="answer-box">
            <input type="radio" name="${obj.id}" id="ans-1" value="a" checked>
            <label for="ans-1">${obj.choices.a}</label>
        </div>
        <div class="answer-box">
            <input type="radio" name="${obj.id}" id="ans-2" value="b">
            <label for="ans-2">${obj.choices.b}</label>
        </div>
        <div class="answer-box">
            <input type="radio" name="${obj.id}" id="ans-3" value="c">
            <label for="ans-3">${obj.choices.c}</label>
        </div>
        <div class="answer-box">
            <input type="radio" name="${obj.id}" id="ans-4" value="d">
            <label for="ans-4">${obj.choices.d}</label>
        </div>
    </fieldset>
    `
}

function renderQuestion(num, arr){
    let quizObj = arr[num];
    console.log(quizObj);
    const questionString = getQuestionString(quizObj);
    $('.question-with-choices').html(questionString);
}

function startQuiz(){
    $('#start-button').click(function(){
        renderQuestion(quizNum, DATA);
        addStageCount();
        toggleHidden('.quiz-number');
        toggleHidden('.quiz-score');
        toggleHidden('.landing-page');
        toggleHidden('.question-page');
    })
}

function handleSelection(){
    console.log("handleSelection function ran")
    $('.question-with-choices').on('click', '.answer-box', function(e){
        e.stopPropagation();
        $(this).find('input').prop('checked', true);
    });
}

function getCheckedChoice(){
    const checkedChoiceSelector = `input[name=${quizNum}]:checked`
    const checkedChoice = $(checkedChoiceSelector).val();
    console.log("checked choice is " + checkedChoice);
    return checkedChoice;
}

function compareChoice(num, str){
    return (DATA[Number(num)-1].answer === str);
}

function countScore(bool){
    if (bool) {
        quizScore++
    }
    let scoreNum;
    if (quizScore < 10) {
        scoreNum = "0" + quizScore;
    } else {
        scoreNum = quizScore;
    };
    $('.quiz-score').text("Score " + scoreNum);
}

function renderAnswer(bool){
    let isCorrectString;
    if (bool) {
        isCorrectString = 'You are correct!'
    } else {
        isCorrectString = 'Wrong answer!'
    }
    const obj = DATA[Number(quizNum)-1]
    let answerHtml = `
    <p>${isCorrectString}</p>
    <img src="${obj.image}" alt="${obj.imageText}">
    <article class="explanation">
        <p>${obj.explanation}</p>
    </article>
    `
    $('.js-answer').html(answerHtml);
}

function handleSubmission(){
    console.log("handleSubmission function ran")

    $('#question-page-button').click(function(e){
        e.preventDefault();
        const checkedChoice = getCheckedChoice();
        const isCorrect = compareChoice(quizNum, checkedChoice);
        countScore(isCorrect);
        toggleHidden('.question-page');
        renderAnswer(isCorrect);
        toggleHidden('.answer-page');
        if (quizNum === 10) {
            toggleHidden('.answer-page-button');
            toggleHidden('.to-result-button');
        }
    })
}

function handleToNextQuestion(){
    console.log("handleToNextQuestion function ran")

    $('.answer-page-button').click(function(){
        renderQuestion(quizNum, DATA);
        addStageCount();
        toggleHidden('.answer-page');
        toggleHidden('.question-page');
    })
}

function renderResult(num){
    console.log("renderResult function ran!")
    let resultString;
    if (quizScore > 7) {
        resultString = "You are a true retro gamer!"
    } else if (quizScore > 4) {
        resultString = "Impressive. You witnessed retro era!"
    } else if (quizScore > 2) {
        resultString = "Nice job. Seems that you have heard about retro games."
    } else {
        resultString = "Seems that Retro video game is not your thing, but it's okay!"
    }
    const resultStringAll = `
    <p>Your final score is...</p>
    <p class="final-score">${quizScore} out of 10</p>
    <p class="score-evaluation">${resultString}</p> 
    `
    $('.js-result').html(resultStringAll);
}

function toResultPage(){
    console.log("toResultPage function ran")

    $('.to-result-button').click(function(){
        renderResult(quizScore);
        toggleHidden('.answer-page');
        toggleHidden('.result-page');
    })
}

function handleDoItAgain(){
    console.log("handleDoItAgain function ran")
    $('#start-over').click(function(){
        quizNum = 0;
        quizScore = 0;
        toggleHidden('.result-page');
        toggleHidden('.landing-page');
        toggleHidden('.quiz-number');
        $('.quiz-score').text("Score 00");
        toggleHidden('.quiz-score');
    })

}

function handleQuizApp(){
    startQuiz();
    handleSelection();
    handleSubmission();
    handleToNextQuestion();
    toResultPage();
    handleDoItAgain();
}

$(handleQuizApp);