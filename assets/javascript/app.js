$("#clickme").click(function() {
    $(this).remove();

});


$.ajax({
    url: "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple",
    method: "GET"
}).done(function(response) {
    console.log(response)
});