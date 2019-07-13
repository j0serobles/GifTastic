// Initial array of movies
var movies = ["Computers", "Baseball", "Mathematics", "Automobiles"];
//Create the array for the still images
var stillImg = [];
//Create the array for the animated images
var animatedImg = [];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var searchString = $(this).attr("data-name");
  // var queryURL  = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  var queryURL     =  "https://api.giphy.com/v1/gifs/search?api_key=Oro0OZBXIqGCkXF4o6kQwSkMwlOjwRAe&q=" + searchString + 
                      "&limit=10&offset=0&rating=G&lang=en";

  // Creating an AJAX call for the specific GIF button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // // Storing the rating data
    // var rating = response.Rated;

    // // Creating an element to have the rating displayed
    // var pOne = $("<p>").text("Rating: " + rating);

    // // Displaying the rating
    // movieDiv.append(pOne);

    // // Storing the release year
    // var released = response.Released;

    // // Creating an element to hold the release year
    // var pTwo = $("<p>").text("Released: " + released);

    // // Displaying the release year
    // movieDiv.append(pTwo);

    // // Storing the plot
    // var plot = response.Plot;

    // // Creating an element to hold the plot
    // var pThree = $("<p>").text("Plot: " + plot);

    // // Appending the plot
    // movieDiv.append(pThree);

    //Empty <div> before appending new images
    movieDiv.empty();
    //Empty the array for the still images
    stillImg.length = 0;
    //Empty the array for the animated images
    animatedImg.length = 0;
    response.data.forEach (function (gifObject, gifIndex) { 

      //create a new Image() object and push it into stillImg[]
      //, setting its src attribute to the still image.
      stillImg[gifIndex] = new Image();
      //add data attribute indicating if image is static or animated
      $(stillImg[gifIndex]).attr("data-static","true");
      $(stillImg[gifIndex]).attr("data-index", gifIndex);
      stillImg[gifIndex].src = gifObject.images.fixed_height_still.url;
      //create a new Image() object and push it into animatedImg[], 
      //setting its src attribute to the animated image.
      animatedImg[gifIndex] = new Image();
      //add data attribute indicating if image is static or animated
      $(animatedImg[gifIndex]).attr("data-static","false");
      $(animatedImg[gifIndex]).attr("data-index", gifIndex); 
      animatedImg[gifIndex].src = gifObject.images.fixed_height.url;
      // Appending the image
      movieDiv.append( $(stillImg[gifIndex]) );
    });
         
    $("#movies-view").append(movieDiv);

  });

  

}


function swapGifs()  {

  // console.log("Clicked on :" + $(this).attr("src")); 
  // console.log("Is it static? :" + $(this).attr("data-static")); 
  // console.log ("Index of img is :" + $(this).attr("data-index") ); 
  

  //Get the image's position in the div. 
  var imageIndex =  $(this).attr("data-index");
  // console.log(animatedImg[imageIndex].src);
  var tempImg = new Image();
  

  //If this is the static image, replace it with the animated
  if ( $(this).attr("data-static")  === "true" ) {
    $(tempImg).attr("src", $(this).attr("src"));
    $(this).attr("src", animatedImg[imageIndex].src);
    animatedImg[imageIndex].src = $(tempImg).attr("src"); 
    $(this).attr("data-static", "false"); 
  }
  else {
    $(tempImg).attr("src", $(this).attr("src"));   
    $(this).attr("src", animatedImg[imageIndex].src);
    animatedImg[imageIndex].src = $(tempImg).attr("src"); 
    $(this).attr("data-static", "true"); 
  }
};

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("movie-btn");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}



 
// This function handles events where a movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

$(document).on("click", "img", swapGifs); 

// Calling the renderButtons function to display the intial buttons
renderButtons();