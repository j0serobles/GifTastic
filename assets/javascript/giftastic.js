// Initial array of GIFs
var gifs = ["Computers", "Baseball", "Mathematics", "Automobiles"];


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var searchString = $(this).attr("data-name");
  // var queryURL  = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  var queryURL     =  "https://api.giphy.com/v1/gifs/search?api_key=Oro0OZBXIqGCkXF4o6kQwSkMwlOjwRAe&q=" 
  + searchString + "&limit=10&offset=0&rating=G&lang=en";
  
  $("#gifs-view").empty()

  // Creating an AJAX call for the specific GIF button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the movie
    var gifDiv = $("<div class='gif-div'>");


    response.data.forEach (function (gifObject, gifIndex) { 

      gifImage = $("<img>"); 
      //add data attribute indicating if image is static or animated
      gifImage.attr("src",          gifObject.images.fixed_height_still.url);
      gifImage.attr("data-static",  gifObject.images.fixed_height_still.url);
      gifImage.attr("data-animate", gifObject.images.fixed_height.url);
      gifImage.attr("data-index",   gifIndex);
      gifImage.attr("data-animated", "false");  
      gifDiv.append(gifImage);
      $("#gifs-view").append(gifDiv);
    });
  });
}


function swapGifs()  {

  var isAnimated = $(this).attr("data-animated"); 

    if (isAnimated === "true") { 
      $(this).attr("src", $(this).attr("data-static"));
      $(this).attr("data-animated", "false"); 
    } 
    else if(isAnimated === "false") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-animated", "true"); 
    }

  }

// Function for displaying movie data
function renderButtons() {

  // Deleting the gifs prior to adding new gif
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("btn btn-secondary m-3 gif-btn");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}



 
// This function handles events where a movie button is clicked
$("#add-category").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var category = $("#category-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(category);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayMovieInfo);

$(document).on("click", "img", swapGifs); 

// Calling the renderButtons function to display the intial buttons
renderButtons();