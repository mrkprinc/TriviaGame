$(document).ready(function() {

// global variables

    var i = 0;
    var btnIsActive = true;
    var noMoreCards = false;

    var varTimerA = null;
    var varTimerQ = null;

    var correctTally = 0;

// question bank

    var qBank = [

    {
        question: "<b>Test Question 1</b>",
        answers: ["<li>answer A</li>", "<li>answer B</li>", "<li>answer C</li>"],
        correctIndex: "0"
    },

    {
        question: "<b>Text Question 2</b>",
        answers: ["<li>answer A</li>", "<li>answer B</li>", "<li>answer C</li>"],
        correctIndex: "1"
    }

    ]

// global functions

function nextCard() {
    
    // these variables select the three cards already visible in the 'deck'
    var cardThree = $("#div-three > .card");
    var cardTwo = $("#div-two > .card");
    var cardFront = $("#div-front > .card");
    
    if(!noMoreCards) {

        newCard();
        
        var q = Math.floor(i/2);
        var id = "#card" + i;
        var thisCard = $(id); 

        if(q < qBank.length) {

            // if i is even, put next question on the new card
            if(i % 2 === 0) {
                thisCard.append(qBank[q].question);
                var answers = $("<ul>");
                answers.html(qBank[q].answers);
                thisCard.append(answers);
            }

        } else {
            // there are no questions left in the bank
            thisCard.attr("data-lastCard", "Y");
            noMoreCards = true;
        }        
    }

    // move cards forward
    cardThree.animate({
        bottom: '70px',
        width: '75%',
        height: '305px'
    }).prependTo("#div-two");

    cardTwo.animate({
        bottom: '20px',
        width: '95%',
        height: '340px'
    }, cardStart).prependTo("#div-front");

    cardFront.animate({
        bottom: '-150px',
        opacity: '0'
    });
    
    function cardStart() {

        // TEMP
        console.log(i);
        
        // remove front card
        cardFront.detach();

        if(cardTwo.attr('data-lastCard') === 'N') {
            if(i % 2 === 0) {
                btnIsActive = false;
                timerA();
            } else {
                btnIsActive = true;
                timerQ();
            }
        } else {

            cardTwo.html("<span>You got</span> <span id='span-percent'>" + correctTally/qBank.length*100 + "%</span>");
            btnIsActive = false;
            timerA();
            $("#btn-restart")
                .delay(4*1000)
                .addClass("show")
                .animate({opacity: 1});
        }
    }

    i++;
}

function newCard() {
    $("#card-alpha").clone().empty()
    .addClass("show")
    .appendTo("#div-four")
    .animate({
        bottom: '120px',
        width: '55%',
        height: '270px'
    })
    .attr("id", "card" + i)
    .prependTo("#div-three");
}

function timerA() {
    varTimerA = setTimeout(nextCard, 2.5*1000);
}

function timerQ() {
    var s = 10;
    var span = $("#span-time");
    span.html(s);
    varTimerQ = setInterval(countdown, 1000);
    function countdown() {
        s--;
        if(s > 0) {
            span.html(s);
        } else {
            var q = Math.floor((i-3)/2);
            var answerCard = $("#div-two > .card");
            answerCard.append("<span>The correct answer is</span> <span><ul>" + qBank[q].answers[qBank[q].correctIndex] + "</ul></span>");
            nextCard();
            span.html('--')
            clearTime();
        }
    }
}

function clearTime() {
    clearInterval(varTimerQ);
    clearTimeout(varTimerA);
    $("#span-time").html("--");
}

// click listeners

$(".btnAnswer").on("click", function() {

    if(btnIsActive === true) {
        
        clearTime();
        
        var q = Math.floor((i-3)/2);
        var answerCard = $("#div-two > .card");

        if($(this).attr("data-response") === qBank[q].correctIndex) {
            answerCard.append("<b>Correct!</b>");
            correctTally++;
        } else {
            answerCard.append("<b>Wrong!</b> <span>The correct answer is</span> <span><ul>" + qBank[q].answers[qBank[q].correctIndex] + "</ul></span>");
        }

        nextCard();
    }
})

$(".btnRestart").on("click", function() {

    i = 0;
    btnIsActive = true;
    noMoreCards = false;
    correctTally = 0;

    $(this)
        .animate({opacity: 0})
        .removeClass("show");
    nextCard();
    nextCard();
    nextCard();
})

// execute

// create title card
newCard();
$("#card0").attr("id", "title");
$("#title").html("<b>Buffy the Vampire Slayer</b> <img src='https://media.giphy.com/media/xT1XGLzxTFgIwxcbcY/giphy.gif' alt='Buffy'> <b>The Big Bads</b>")

nextCard();
nextCard();



})