// This is the request to the OMDB database 
var request = require('request');
var twitter = require('twitter');
var keys = require('./keys.js');
var client = new twitter(keys);
function getMovieInfo() {
  // Grab or assemble the movie name and store it in a variable called "movieName"
  var movieName = (process.argv[3]);

  
  if ( !process.argv[3] ) {
    console.log('Please enter a movie to search for!');
  } else {
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
      if ( response.statusCode === 200 ) {
        body = JSON.parse(body); // change the body parameter itself to something else
        // var data = JSON.parse(body);

        // Then log the body from the site!
        console.log("Title:", body.Title);
        console.log("Released:", body.Year);
        console.log("IMDB Rating:", body.imdbRating);
        console.log("Rotten Tomatoes Rating:", body.Ratings[1].Value);
        console.log("Country produced:", body.Country);
        console.log("Language:", body.Language);
        console.log("Plot:", body.Plot);
        console.log("Actors:", body.Actors);

      }
    });
  }
}


function getSongInfo() {
  console.log('song search');
}

function gettweets() {
  console.log('twiiter');
  var params = {screen_name: 'BillyUCFbc'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      
     }
    }
  });
  
}

var command = process.argv[2];
console.log(command);
switch (command) {
  case 'movie-this':
    getMovieInfo();
    console.log("Movie has been called")
    break;
  case 'spotify-this-song':
    getSongInfo();
    break;
    case 'mytweets':
    gettweets();
  

}