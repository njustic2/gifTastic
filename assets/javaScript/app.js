// Array of gif topics.
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "ferret", "turtle", "sugar glider", "chinchilla",
"hemit crab", "crab", "gerbil", "hedgehog", "teacup pig", "capybara", "frog", "chicken", "falcon", "bird", "serval", "salamander", ];

// Global Variables
var url;
var rating;
var dataGif;
var dataRevert;
var clickEvent;
var clicked = false;
var on;
var off;

// Adds buttons to the array and displays all of the buttonss.
function addButtons() {
  $(".gif-Adder").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");  
    newButton.addClass("newGif");
    newButton.attr("data-gif", topics[i]);
    newButton.text(topics[i]);

    $(".gif-Adder").append(newButton);
  }
}

$(".add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $(".gif-Input").val().trim();
  topics.push(gif);
  console.log("gif: " + gif);
  addButtons();
})

addButtons();

// Searches Gify.com for whatever the button pressed and produce a url.

$(document).on("click", "button", function() {
console.log(this);
  $(".gif-display").empty();

  var subject = $(this).attr("data-gif");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        subject + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("subject: " + subject);
    console.log("url: " + queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {

    var results = response.data;
    console.log(results);

    for (var i = 0; i < 10; i++) {

        $(".gif-display").append("<div class='col-lg-6 col-lg-6  class='clickEvent'><span>Rating: " + response.data[i].rating.toUpperCase() + "</span><br/><img class='clickEvent' dataGif='" + response.data[i].images.fixed_height.url + "'dataRevert='" + response.data[i].images.fixed_height_still.url + "' src='" + response.data[i].images.fixed_height_still.url + "'>");  
      }
    
    // Sets up an action when the gif is clicked and sets it to off. 
      $(".clickEvent").click(function () {
       if (clicked) {
          clicked = false;  
          clickAction(this);
        }
        else {
          clicked = true;
          clickAction(this);
        }
      })
      
      // Swaps between the on and off data responses
      function clickAction (set) {
        if (clicked) {
          $(set).attr("src", $(set).attr("dataGif"));
          clicked = true;
        }
        else {
          $(set).attr("src", $(set).attr("dataRevert"));
          clicked = false;
        }
      };
  })
})



