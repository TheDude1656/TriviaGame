var questionsAnswers = [];
var answers = [];
var choicePicked;
var correctPick;

$(function() {

    $("#options").hide();
    $("#tLeft").hide();
    $("#clickme").click(function() {
        $(this).remove();
        $("#options").show();
        $("#tLeft").show();
        questions();
        jQuery(function($) {
            display = $("#timer");
            startTimer(15, display);
        })
    });


    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple",
        method: "GET"
    }).done(function(response) {

        questionsAnswers.push(response);
        answers.push(questionsAnswers["0"].results["0"].correct_answer);
        correctPick = (questionsAnswers["0"].results["0"].correct_answer);
        answers.push(questionsAnswers["0"].results["0"].incorrect_answers["0"]);
        answers.push(questionsAnswers["0"].results["0"].incorrect_answers["1"]);
        answers.push(questionsAnswers["0"].results["0"].incorrect_answers["2"]);
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
                play();
                console.log(this.text);
                choicePicked = (this.text);

                function play() {
                    var audio = document.getElementById("coinclick");
                    audio.play();
                }

            }
        }
        console.log(response)
    });

    function questions() {
        $("#question").html(questionsAnswers["0"].results["0"].question);

    }

    function startTimer(duration, display) {
        var timer = duration,
            seconds;
        setInterval(function() {

            seconds = parseInt(timer % 60, 10);

            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text("Time Remaining: " + seconds);

            if (--timer < 0) {

                timer = duration;

            }
        }, 1000);
    }



});