$(document).ready(function () {

    var topics = ["amused", "blissful", "calm as a cucumber", "meh", "pumped", "cheery", "fine", "bored", "ecstatic", "mad", "cranky", "grumpy", "confused"];

    function showMoods() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>");

            newButton.addClass("moodgifs");
            newButton.addClass("btn btn-info");
            newButton.attr("type", "button");
            newButton.css("margin","5px");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);

            $("#buttons-view").append(newButton);
        }

        $(".moodgifs").on("click", generateGifs);

    };


    function generateGifs() {

        $("#gifs-appear-here").empty();

        var apiKey = "plK5BfB6Sx24bTTgUza7LP9nWA4qjzBH";

        var moodGif = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + moodGif + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.css("margin","10px 10px 0 10px");
                    p.css("margin","1px 5px 20px 5px");
                    p.css("font-weight","bold");

                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);

                    $("#gifs-appear-here").prepend(gifDiv);

                }

                $("img").on("click", function () {

                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            });
    }


    $("#add-gif").on("click", function (event) {

        event.preventDefault();

        var mood = $("#gif-input").val().trim();

        topics.push(mood);

        showMoods();
    });

    showMoods();

});