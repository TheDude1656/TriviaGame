var questionsAnswers = [];

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
        console.log(response)
    });

    function questions() {
        $("#question").html(questionsAnswers["0"].results["0"].question);
        $("#opt1").html(questionsAnswers["0"].results["0"].correct_answer);
        $("#opt2").html(questionsAnswers["0"].results["0"].incorrect_answers["0"]);
        $("#opt3").html(questionsAnswers["0"].results["0"].incorrect_answers["1"]);
        $("#opt4").html(questionsAnswers["0"].results["0"].incorrect_answers["2"]);
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

    var choice = document.getElementsByClassName("list-group-item");
    for (i = 0; i < choice.length; i++) {
        choice[i].onclick = function() {
            console.log(this.text);
        }
    }

});