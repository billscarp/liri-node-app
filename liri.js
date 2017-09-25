// This is the request to the OMDB database 


const request = require('request');

// Grab or assemble the movie name and store it in a variable called "movieName"
var movieName = (process.argv[2]);
// ...
if (process.argv.length == 2) {
  console.log('Please ener a movie to search for!');
  retern;
} else {
  for (let i = 2; i < process.argv.length; i++) {
      movieName += process.argv[i] + " ";
  }movieName = encodeURIComponent(movieName);
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


// This line is just to help us debug against the actual URL.
console.log(queryUrl);


// Then create a request to the queryUrl
// ...
request(queryUrl, function(error, response, body) {
  if (error) {
    return console.log(error);
  } 
  // If the request is successful
  // ...
  if (!error && response.statusCode === 200) {
    
        // Then log the body from the site!
        console.log("Title:", JSON.parse(body).Title);
        console.log("Released:", JSON.parse(body).Year);
        console.log("IMDB Rating:", JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating:", JSON.parse(body).Ratings[1].Value);
        console.log("Country produced:", JSON.parse(body).Country);
        console.log("Language:", JSON.parse(body).Language);
        console.log("Plot:", JSON.parse(body).Plot);
        console.log("Actors:", JSON.parse(body).Actors);

      }
  // Then log the Release Year for the movie
  // ...

});