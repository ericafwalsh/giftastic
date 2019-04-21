$(document).ready(function() {

var moods = ["amused", "blissful", "calm as a cucumber", "meh", "pumped", "cheery", "fine", "bored", "ecstatic", "mad", "cranky", "grumpy", "confused"];

    function showMoods() {

        $("#buttons-view").empty();

        for (var i = 0; i < moods.length; i++) {

            var newButton = $("<button>");

            newButton.addClass("moodgifs");

            newButton.attr("data-name", moods[i]);

            newButton.text(moods[i]);

            $("#buttons-view").append(newButton);   
        }

        $(".moodgifs").on("click",generateGifs);

    };

    
    function generateGifs() {

        var apiKey = "plK5BfB6Sx24bTTgUza7LP9nWA4qjzBH";

        var moodGif = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + moodGif + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.append(gifImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
            });
    }


    $("#add-gif").on("click", function(event) {

        event.preventDefault();

        var mood = $("#gif-input").val().trim();

        moods.push(mood);

        showMoods();
    });

showMoods();

});