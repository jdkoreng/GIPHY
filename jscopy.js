var itemsToSearch = ["Luke Skywalker", "Han Solo", "Jabba the Hutt", "Greedo", "Boba Fett"]
var whatYouWant = ""
var personImage = ""

var person = ""

var loadButtons = function() {

    $(".buttonHouse").empty()

    for (let i = 0; i < itemsToSearch.length; i++) {

        var p = $("<button>").text(itemsToSearch[i]).attr("id", itemsToSearch[i])
        p.addClass("optionsOf btn btn-primary btn-rounded")

        $(".buttonHouse").prepend(p)

    }
}

loadButtons();




$(document).on("click", "#MyImageSubmit", function() {

    console.log("submission")

    whatYouWant = $("#MyImageInput").val().trim();


    itemsToSearch.push(whatYouWant);



    loadButtons();


});




$(document).on("click", ".optionsOf", function() {

    console.log('you clicked a button on the page')


    person = $(this).attr("id");

    console.log(person)


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            results = response.data;
            for (var i = 0; i < results.length; i++) {


                personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("imageNumber", i);
                personImage.attr("moves", 'true');
                personImage.attr("results", results);
                personImage.attr("person", person);
                personImage.addClass("personImage");




                $(".results").prepend(personImage);
            }

        })

});




$(document).on("click", ".personImage", function() {

    var a = $(this)

    console.log("clicked a photo")

    person = $(this).attr("person");

    console.log(person)


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

        var moving = $(this).attr("moves")



    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;





    if (moving == "false") {

        console.log("img is not moving currently, starting")

        a.attr("src", results[a.attr("imageNumber")].images.fixed_height.url);

        a.attr("moves", 'true');



    } else {


        console.log("img is moving currently, stopping")

        a.attr("src", results[a.attr("imageNumber")].images.fixed_height_still.url);
        console.log("stopped the image")

        a.attr("moves", 'false')



    }
})
})