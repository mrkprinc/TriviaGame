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
        question: "<b>Who is the Big Bad in Season 1?</b>",
        answers: ["<li>A. Spike</li>", "<li>B. The Master</li>", "<li>C. Mayor Richard Wilkins</li>"],
        correctIndex: "1"
    },

    {
        question: "<b>Who is the Big Bad in Season 2?</b>",
        answers: ["<li>A. Xander</li>", "<li>B. Angelus</li>", "<li>C. Glory</li>"],
        correctIndex: "1"
    },

    {
        question: "<b>Who is the Big Bad in Season 3?</b>",
        answers: ["<li>A. Faith Lehane</li>", "<li>B. The Initiative</li>", "<li>C. Mayor Richard Wilkins</li>"],
        correctIndex: "2"
    },

    {
        question: "<b>Who is the Big Bad in Season 4?</b>",
        answers: ["<li>A. Adam</li>", "<li>B. Faith Lehane</li>", "<li>C. Tara</li>"],
        correctIndex: "0"
    },

    {
        question: "<b>Who is the Big Bad in Season 5?</b>",
        answers: ["<li>A. Dawn Summers</li>", "<li>B. Angel</li>", "<li>C. Glory</li>"],
        correctIndex: "2"
    },

    {
        question: "<b>Who is the Big Bad in Season 6?</b>",
        answers: ["<li>A. The Initiative</li>", "<li>B. Willow</li>", "<li>C. Drusilla</li>"],
        correctIndex: "1"
    },

    {
        question: "<b>Who is the Big Bad in Season 7?</b>",
        answers: ["<li>A. Knights of Byzantium</li>", "<li>B. The Trio</li>", "<li>C. The First Evil</li>"],
        correctIndex: "2"
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
                thisCard
                    .append(qBank[q].question)
                    .attr('data-cardType', 'Q');
                var answers = $("<ul>");
                answers.html(qBank[q].answers);
                thisCard.append(answers);
            } else {
                thisCard.attr('data-cardType', 'A');
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

        // remove front card
        cardFront.detach();
        cardFront = $('#div-front > .card')

        // start timers for Q or A card
        if(cardFront.attr('data-cardType') === 'Q') {
            btnIsActive = true;
            timerQ();
        } else {
            btnIsActive = false;
            timerA();
        }

        // if this is the last card, add quiz results, then make display 'try again' button
        if(cardFront.attr('data-lastCard') === 'Y') {
            cardTwo
                .html("<span>You got</span> <span id='span-percent'>" + Math.floor(correctTally/qBank.length*100) + "%</span>")
                .attr('data-cardType', 'T');
            $("#btn-restart")
                .delay(3*1000)
                .addClass("show")
                .animate({opacity: 1});
        }
    }

    i++;
}

function newCard() {
    // clones alpha to create new card in the back layer
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
    // answer card timer
    varTimerA = setTimeout(nextCard, 3*1000);
}

function timerQ() {
    // question card timer
    var s = 15;
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
    // when user clicks a, b, c

    if(btnIsActive === true) {
        
        clearTime();
        
        var q = Math.floor((i-3)/2);
        var answerCard = $("#div-two > .card");

        // populate the answer card behind the question
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
    // start question cards again
    
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

// create title cards
nextCard();
$("#card0")
    .empty()
    .attr("id", "title");
$("#title")
    .attr("data-cardType", "T")
    .append("<b>Buffy the Vampire Slayer</b>")
    .append("<img src='https://media.giphy.com/media/xT1XGLzxTFgIwxcbcY/giphy.gif' alt='Buffy'>")
    .append("<i>The Big Bads Quiz</i>");
i=0;

nextCard();
$("#card0")
    .empty()
    .attr("id", "title2");
$("#title2")
    .attr("data-cardType", "T")
    .append("<ul> <li><b>Big Bad</b> /big bad/ <i>noun</i></li> <li>the dominant and final villain</li> <li>in each season of Buffy</li> </ul>")
i=0;

nextCard();
})