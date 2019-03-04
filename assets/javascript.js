var topics = ["sushi", "burritos", "pizza", "indian curry", "pie"];
console.log(topics);

function creatButtons() {
    // $("#generated-gif").empty();
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("newTopic");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);
    }
}
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var newSearch = $("#inputPassword2").val().trim();
    topics.push(newSearch);
    creatButtons();
});
creatButtons();
$(".newTopic").on("click", function () {
    var pickles = $(this).attr("data-name");
    console.log(pickles);
    console.log($(this).attr("data-name"));

    // var queryURL = "https://api.giphy.com/v1/gifs/search?q="
    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + pickles + "&limit=10&rating=pg&apikey=iO01O4Ult03JFheRjym9saj6ubav4AWt"
    // &limit10;
    // var queryURL = "https://api.giphy.com/v1/gifs/random?&tag=" + random;
    // + random ? api_key = iO01O4Ult03JFheRjym9saj6ubav4AWt"
    $.ajax({
        url: queryURL,
        method: "GET",
        // data: {
        // q: pickles,
        // limit: 10,
        // rating: "pg",
        // apikey: "iO01O4Ult03JFheRjym9saj6ubav4AWt"

        // }
    })

        .then(function (response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var imageUrl = results[i].images.original_still.url;
                var newImg = $("<img>");
                newImg.attr("src", imageUrl);
                newImg.attr("id", "generated-gif");
                newImg.attr("data-state", "still");
                newImg.attr("data-animate", results[i].images.original.url);
                newImg.attr("data-still", results[i].images.original_still.url);
                newImg.attr("class", "gif");
                $("#gifs-appear").append(newImg);
            }
        });
});



$(document).on("click", ".gif", function (event) {
    event.preventDefault();
    var still = $(this).attr("data-still");
    var animate = $(this).attr("data-animate");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
        console.log(state);
    }
    else {
        console.log(state);
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
});
