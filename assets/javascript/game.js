$(document).ready(function() {

// global variables

    var i = 0;
    var btnIsActive = false;
    var noMoreCards = false;

// question bank

    var qBank = [

    {
        question: "<b>Test Question 1</b>",
        answers: "<ul><li>answer A</li> <li>answer B</li> <li>answer C</li></ul>",
        correct: "A",
        correctFull: "A: SampleAnswer"
    },

    {
        question: "<b>Text Question 2</b>",
        answers: "<ul><li>answer A</li> <li>answer B</li> <li>answer C</li></ul>",
        correct: "B"
    }

    ]

// global functions


// TEMP
$("body").on("click", function(){
    // nextCard();
})

function nextCard() {
    
    // these variables select the three cards already visible in the 'deck'
    var cardThree = $("#div-three > .card");
    var cardTwo = $("#div-two > .card");
    var cardFront = $("#div-front > .card");
    
    if(!noMoreCards) {
        // clone the prototype card and put it in back position
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
        
        var q = Math.floor(i/2);
        var id = "#card" + i;
        var thisCard = $(id); 

        if(q < qBank.length) {

            // if i is even, put next question on the new card
            if(i % 2 === 0) {
                thisCard.append(qBank[q].question);
                thisCard.append(qBank[q].answers);
            }

        } else {
            // there are no questions left in the bank
            thisCard.html("<span>Final Stats</span>");
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
    }).prependTo("#div-front");

    cardFront.animate({
        bottom: '-150px',
        opacity: '0'
    }, removeCard);
    
    function removeCard() {
        cardFront.detach();
    }

    i++;

    // toggle buttons on or off
    if(btnIsActive === true) {
        btnIsActive = false;
    } else {
        btnIsActive = true;
    }
}

function endGame() {
    
}

// click listeners

$(".button").on("click", function() {

    if(btnIsActive === true) {
        
        var q = Math.floor((i-3)/2);
        var answerCard = $("#div-two > .card");

        if($(this).attr("data-response") === qBank[q].correct) {
            answerCard.append("<b>Correct!</b>");
        } else {
            answerCard.append("<b>Wrong!</b> <span>The correct answer is</span> <span>" + qBank[q].correctFull + "</span>");
        }

        nextCard();
    }
})

// execute

nextCard();
nextCard();
nextCard();



})