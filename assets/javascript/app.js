// Questions for quiz
var questions = [{
    question: "Which of these is NOT a variety of hop?",
    answerChoices: ["Centennial", "Mosaic", "Citra", "Millenial"],
    answer: 3,
},{
    question: "What type of beer is typically characterized with a dark appearance with roasted aromas and flavors?",
    answerChoices: ["Stout", "IPA", "Helles", "Irish Red"],
    answer: 0,

},{
    question: "What is the Reinheitsgebot?",
    answerChoices: ["A German Beer", "The German Beer Purity Laws", "A made up word", "A Style of Brewing Beer"],
    answer: 1,

},{
    question: "What does IBU stand for?",
    answerChoices: ["International Bitterness Unit", "Internal Bureau of Uncleanliness", "International Bland Flavor", "None of the Above"],
    answer: 0,

},{
    question: "Which of these is NOT a style of beer?",
    answerChoices: ["Helles", "Dunkelweizen", "Hefeweizen", "Apfelwein"],
    answer: 3,

},{
    question: "What is the difference between an Ale and a Lager?",
    answerChoices: ["Nothing", "Bottling Process", "Fermentation Process", "Brewing Process"],
    answer: 2,

}];

// Game variables
var activeQuestion;
var correctAnswer;
var incorrectAnswer;
var answered;
var unanswered;
var time;
var seconds;
var userChoice;
var rightAnswerText;
var rightAnswerIndex;
var messages = {
        correct: "That is correct!",
        incorrect: "Sorry, you did not answer correctly",
        timeOut: "You ran out of time!",
        finished: "Here are your results"
};

// Game functions
function newGame(){
    $("#finalMessage").empty();
    $("#correct").empty();
    $("#incorrect").empty();
    $("#unanswered").empty();
    activeQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
};

function newQuestion(){
    $("#message").empty();
    $("#correctedAnswer").empty();
    answered = true;

    // selects and displays new questions and answer
    $("#currentQuestion").html("Question #" + (activeQuestion + 1) + "/" + questions.length);
    $(".question").html("<h2>" + questions[activeQuestion].question + "</h2>")
    for(var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(questions[activeQuestion].answerChoices[i]);
        choices.attr({"data-index": i });
        choices.addClass("thisChoice");
        $(".answerChoices").append(choices);
    }
    countdown();
    // if user selects answer timer stops and answer page is displayed
    $('.thisChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		answerPage();
    });
    rightAnswerText = questions[activeQuestion].answerChoices[questions[activeQuestion].answer];
	rightAnswerIndex = questions[activeQuestion].answer;
    console.log(activeQuestion);
    console.log(rightAnswerIndex);
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer countdown
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	//checks to see correct, incorrect, or unanswered
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.timeOut);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(activeQuestion == (questions.length - 1)){
		setTimeout(scoreboard, 5000)
	} else{
		activeQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correct').html("Correct Answers: " + correctAnswer);
	$('#incorrect').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}

// buttons
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
    clearInterval(time);
	$(this).hide();
	newGame();
});

