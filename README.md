# GifTastic
Homework week 6

### Overview

GIFTastic uses the GIPHY API to make a dynamic web page that gets populated with gifs of your choice. The site uses JavaScript to make calls to the GIPHY API and JQuery to make changes to the HTML.

![GIPHY](Images/1-giphy.jpg)


### Application Design Overview

1. An array of strings is initially created to store the categories of GIFs required by the user.  Four categories are already created for you ("Computers", "Baseball", "Mathematics", "Automobiles"). 

2. For each category in the array, a button is created in the page with its text set to the category string. 

3. When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API and appends them on the page.

4. When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing.

5. Under every gif, its rating (PG, G, so on) and name is displayed. 
   * This data is provided by the GIPHY API.
  
6. A text input field takes a value from the user and adds it to the `categories[]` array.  A button with the new category name is added when the user clicks on "Add Category". 

### Implementation Details
Technologies used:
* Bootstrap
* JQuery
* Javascript
* HTML
* AJAX
* CSS

Directory Structure:
```
├── assets
|  ├── css
|  |  └── style.css
|  ├── images
|  └── javascript
|     └── gistastic.js
└── index.html
```
- - -

Boostrap is used to make the app fully responsive. When the page is first loaded, all the elements are displayed, including the 4 buttons with the default categories, which are rendered via function `renderButtons()`.  When the user clicks a button, function `displayGIFs()` is called to make the AJAX call to the GIPHY API and get the next 10 gifs for the category of the button pressed. Another array called `offsets[]` stores the current offset in the response data, and this value is incremented by 10 each time the category's button is pressed.  This way, each time the button is pressed, the gifs displayed start at the offset value from the result and they do not get repeated. 

`swapGIFs()` function: 
Each GIF is displayed in an `<img>` element that has two additional `data-*` attributes added: `"data-static"` has the URL for the static version of the image from the GIF object returned, and `"data-animate"` has the URL for the animated GIF object.  WHen the user clicks on the static image of the GIF, the `src=` attribute is dynamically changed to the animated image.  The reverse is also true when the animated gif is clicked on: the `src=` attribute is changed back to the static image.
