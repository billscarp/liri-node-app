// This is the request to the OMDB database 
var request = require('request');
var twitter = require('twitter');
var keys = require('./keys.js');
var client = new twitter(keys);
var spotify = require('spotify-web-api-node');
var fs = require('fs');

function getMovieInfo() {
  // Grab or assemble the movie name and store it in a variable called "movieName"
  var movieName = (process.argv[3]);


  if (!process.argv[3]) {
    console.log('Please enter a movie to search for!');
  } else {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function (error, response, body) {
      if (error) {
        return console.log(error);
      }
      // If the request is successful
      // ...
      if (response.statusCode === 200) {
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
  var songTitle = "";

  for (let i = 3; i < process.argv.length; i++) {
    songTitle += process.argv[i] + " ";
  }
  //songTitle = encodeURIComponent(songTitle);
  console.log(songTitle);

  
  var spotifyApi = new spotify({
    clientId: '394fe3cf96eb43b0bccbb13bf8ef04c5',
    clientSecret: '66195c732a154ee393f3e2ff10abdc71',
  });

  // Retrieve an access token
  spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.searchTracks(songTitle, function (err, data) {
        if (err) {
          console.error('Something went wrong', err.message);
          return;

        }
      })
        .then(function (response) {
          console.log(response.body.tracks.items[0].artists[0].name);
          console.log(response.body.tracks.items[0].name);
          console.log(response.body.tracks.items[0].album.name);
          console.log(response.body.tracks.items[0].preview_url);
         


      });
    }, function (err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });

  console.log('song search');
}


function gettweets() {
  console.log('twiiter');
  var params = {
    screen_name: 'BillyUCFbc'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
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

// 1. So far so good.  I still need to add the fs require along with the readfile code which I will do when I get home

// 2. Code if/else statements for Mr. Nobody and Ace of Base

// Add comentary so people know what I was doing and so I can remember what I was doing myself.

