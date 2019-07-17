// Initial array of GIFs
var gifs = ["Computers", "Baseball", "Mathematics", "Automobiles"];
var offsets = [0,0,0,0]; //Stores offsets of next set of gifs to return from API.
var searchString = ""; 


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGIFs() {

  searchString = $(this).attr("data-name");
  var queryURL     =  "https://api.giphy.com/v1/gifs/search?api_key=Oro0OZBXIqGCkXF4o6kQwSkMwlOjwRAe&q="  + 
                        searchString + "&limit=10&offset=" 
                        + offsets[gifs.indexOf(searchString)] + "&rating=G&lang=en";
  
  
    //Show the spinner
    $(".spinner-border").addClass("visible");


  // Creating an AJAX call for the specific category button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

     console.log(response.data); 
     //$("#gifs-view").empty()

    response.data.forEach (function (gifObject, gifIndex) { 

      var gifFigure = $("<figure class='figure'>"); 
      var gifImage = $("<img>"); 
      //add data attribute indicating if image is static or animated
      gifImage.addClass("figure-img img-fluid"); 
      gifImage.attr("src",          gifObject.images.fixed_height_still.url);
      gifImage.attr("data-static",  gifObject.images.fixed_height_still.url);
      gifImage.attr("data-animate", gifObject.images.fixed_height.url);
      gifImage.attr("data-index",   gifIndex);
      gifImage.attr("data-animated", "false");  
      var caption = $("<figcaption class='figure-caption'>");
      caption.text("Rated: " + "'" + gifObject.rating.toUpperCase() +  "'     " + gifObject.title); 
      gifFigure.append(gifImage) ;
      gifFigure.append(caption);
      
      
    //Hide The Spinner
    $(".spinner-border").addClass("invisible");
    
    $("#gifs-view").prepend(gifFigure);
    });

    offsets[gifs.indexOf(searchString)] += 10; //Increase offset by 10 to return next 10 GIFs
  
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

  
  //Hide The Spinner
  $(".spinner-border").addClass("invisible");

  // Deleting the buttons prior to adding new buttons.
  // (this is necessary otherwise you will have repeat buttons)

  $("#buttons-view").empty();

  // Looping through the array of buttons.
  for (var i = 0; i < gifs.length; i++) {

    // Dynamicaly generating buttons for each category in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a bootstrap btn class to our button
    a.addClass("btn btn-secondary m-3 gif-btn");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}



 
// This function handles events where a category button is clicked
$("#add-category").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var category = $("#category-input").val().trim();

  // Adding category from the textbox to our array
  gifs.push(category);
  offsets.push(0); // Set offset to 0 to start retrieving from index 0 from the API.

  // Calling renderButtons which handles the processing of our category array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGIFs);

//Adding a click event listener to all GIFs to toggle between statis-animated gifs.
$(document).on("click", "img", swapGifs); 

// Calling the renderButtons function to display the intial buttons
renderButtons();