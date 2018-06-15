$(document).ready(function() {

var i = 0;

$("body").on("click", function() {

    nextCard();

})

function nextCard() {

    var cardThree = $("#div-three > .card");
    var cardTwo = $("#div-two > .card");
    var cardFront = $("#div-front > .card");
    
    $("#card-alpha").clone()
        .addClass("1")
        .html("<h1>" + i + "</h1>")
        .appendTo("#div-four")
        .animate({
            bottom: '120px',
            width: '55%',
            height: '270px'
        }).prependTo("#div-three");

    cardThree.animate({
        bottom: '65px',
        width: '75%',
        height: '305px'
    }).prependTo("#div-two");

    cardTwo.animate({
        bottom: '10px',
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
}

})