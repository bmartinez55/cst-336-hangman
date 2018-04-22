var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake", hint: "It's a reptile"},
             {word: "monkey", hint: "It's a mammal"},
             {word: "beetle", hint: "It's an insect"}];
// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordsGuessed = new Array();

// LISTENER
// window.onload = startGame();

$("#letters").on("click", ".letter", function() {
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

$(".replayBtn").click(function() {
        document.getElementById("hint").innerHTML = "";
        document.getElementById("letters").innerHTML = "";
        document.getElementById("man").innerHTML = "<img src = \"img/stick_0.png\" id = \"hangImg\">";
        selectedWord = "";
        selectedHint = "";
        board = [];
        remainingGuesses = 6;
        $("#letters").show();
        $("#hint_btn").show();
        $("#hint").show();
        $("#man").show();
        startGame();
    });
$("#hint_btn").on("click",function() { 
        $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>"); 
        remainingGuesses-=1;
        updateMan();
        $("#hint_btn").hide();
    });
startGame();

// FUNCTIONS
function initBoard() {
    for(var i = 0; i < selectedWord.length; i++) {
        board.push("_");
    }
}

function startGame() {
    $('#won').hide();
    $('#lost').hide();
    pickWord();
    initBoard();
    createLetters();
    updateBoard();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

//Create the letters inside the letter div
function createLetters() {
    for(var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

// Checks to see if the selected letter exists in the selectedWord
function checkLetter(letter) {
    var positions = new Array();
    
    // Put all the positions the letter exists in an array
    for(var i = 0; i < selectedWord.length; i++) {
        if(letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    if(positions.length > 0) {
        updateWord(positions, letter);
        
        // Check to see if this is a winning guess
        if(!board.includes('_')) {
            wordsGuessed.push(selectedWord);
            $("#guessed").html(wordsGuessed);
            wordsGuessed.toString();
            document.getElementById("guessed").innerHTML = wordsGuessed;
            console.log("Pushed to Array: " + selectedWord);
            endGame(true);
        }
    }
    else {
        remainingGuesses -= 1;
        updateMan();
    }
    if(remainingGuesses <= 0) {
        endGame(false);
    }
}

function updateWord(positions, letter) {
    for(var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png")
}

function updateBoard() {
    $("#word").empty();
    for(var i = 0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    $("#word").append("<br/>");
}

function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger")
}

function endGame(win) {
    $("#letters").hide();
    if(win) {
        $("#won").show();
        $('#lost').hide();
    }
    else {
        $('#lost').show();
        $('#won').hide();
    }
}