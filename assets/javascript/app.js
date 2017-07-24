var questionsAnswers = {};
var answers = [];
var choicePicked;
var correctPick;
var correct = 0;
var incorrect = 0;
var totalScore = 0;
var gameWins = 0;
var gameLosses = 0;
var gameTies = 0;
var display = $("#timer");
var duration = 5;
var timer = duration,
    seconds;



$(function() {

    $("#totals").hide();
    $("#results").hide();
    $("#options").hide();
    $("#tLeft").hide();
    $("#again").hide();
    $("#clickme").click(function() {
        $(this).remove();
        $("#options").show();
        $("#tLeft").show();
        $("#results").show();
        newQuestion();
        startTimer(5, display);

        // jQuery(function($) {
        //     display = $("#timer");
        //     startTimer(15, display);
        // })
    });

    function newQuestion() {
        $.ajax({
            url: "https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=multiple",
            method: "GET"
        }).done(function(response) {
            $("#win").empty();
            questionsAnswers = response;
            answers = [];
            answers.push(questionsAnswers.results[0].correct_answer);
            correctPick = (questionsAnswers.results[0].correct_answer);
            answers.push(questionsAnswers.results[0].incorrect_answers[0]);
            answers.push(questionsAnswers.results[0].incorrect_answers[1]);
            answers.push(questionsAnswers.results[0].incorrect_answers[2]);
            answers.sort(function(a, b) {
                return 0.5 - Math.random()
            });
            randomAnswers = answers.length;
            for (i = 0; i < randomAnswers; i++) {
                $("#options").append('<a href="#" class="list-group-item list-group-item-info">' + answers[i]);
            }
            var choice = document.getElementsByClassName("list-group-item");
            for (i = 0; i < choice.length; i++) {
                choice[i].onclick = function() {

                    console.log(this.text);
                    choicePicked = (this.text);
                    check();
                    timer = duration;

                }
            }
            console.log(response)
            questions();
        });
    }
    $("#again").click(function() {

        restart();
        // startTimer(15, display);
        $("#timer").show();
        timer = duration;
        // jQuery(function($) {
        //     display = $("#timer");
        //     startTimer(15, display);
        // })
    });


    function playCoin() {

        audio.play();

    }

    function playLose() {
        bgmusic.pause();
        fail.play();

    }

    function playWin() {
        bgmusic.pause();
        win.play();
    }

    function playCorrect() {
        yes.play();
    }

    function playIncorrect() {
        no.play();
    }

    function questions() {
        $("#question").html(questionsAnswers.results[0].question);

    }

    function startTimer(duration, display) {
        timer = duration,
            seconds;
        setInterval(function() {

            seconds = parseInt(timer % 60, 10);

            seconds = seconds < 10 ? "0" + seconds : seconds;

            $("#timer").html("Time Remaining: " + seconds);

            if (--timer < 0) {

                check();
                timer = duration;


            }
        }, 1000);
    }


    function restart() {
        questionsAnswers = {};
        answers = [];
        correct = 0;
        incorrect = 0;
        totalScore = 0;
        newQuestion();
        $("#finished").hide();
        bgmusic.play();
        $("#wincount").html("0");
        $("#losscount").html("0");



    }

    function check() {

        if (choicePicked === correctPick) {
            $("#win").html("You are correct!");
            playCorrect();
            correct++;
            totalScore++;
            $("#wincount").html(correct);
            $("#question").empty();
            $("#options").empty();

            if (totalScore === 10) {
                $("#question").empty();
                $("#options").empty();
                $("#tLeft").hide();
                $("#timer").hide();
                if (correct > incorrect) {
                    $("#finished").html("YOU WIN!!");
                    playWin();
                    gameWins++;
                } else if (incorrect > correct) {
                    $("#finished").html("YOU LOSE!!! :(");
                    playLose();
                    gameLosses++;
                } else if (correct === incorrect) {
                    $("#finished").html("TIE!!");
                    gameTies++;
                }
                $("#totals").show();
                $("#finalwins").html(gameWins);
                $("#finallosses").html(gameLosses);
                $("#finalties").html(gameTies);
                $("#again").show();

            } else if (totalScore <= 10) {
                newQuestion();
            }

        } else {
            playIncorrect();
            incorrect++;
            totalScore++;
            $("#losscount").html(incorrect);
            $("#question").empty();
            $("#options").empty();

            if (totalScore === 10) {
                $("#question").empty();
                $("#options").empty();
                $("#tLeft").hide();
                $("#timer").hide();
                if (correct > incorrect) {
                    $("#finished").html("YOU WIN!!");
                    playWin();
                    gameWins++;
                } else if (incorrect > correct) {
                    $("#finished").html("YOU LOSE!!! :(");
                    playLose();
                    gameLosses++;
                } else if (correct === incorrect) {
                    $("#finished").html("TIE!!");
                    gameTies++;
                }
                $("#totals").show();
                $("#finalwins").html(gameWins);
                $("#finallosses").html(gameLosses);
                $("#finalties").html(gameTies);
                $("#again").show();

            } else if (totalScore <= 10) {
                newQuestion();
            }
        }

    }

});