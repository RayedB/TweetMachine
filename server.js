var express = require('express');
var app = express();
var mongoose = require('mongoose');
var twit = require('twit');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var streamHandler = require('./utils/streamHandler');
var Tweet = require('./models/tweets');

/*
* Connection to DB
* Setting a 30sec connection timeout as recommended by MLabs
*/
var options = { server: { socketOptions: { keepAlive: 900000, connectTimeoutMS: 90000 } }, 
                replset: { socketOptions: { keepAlive: 900000, connectTimeoutMS : 90000 } } };       

var mongodbUri = 'mongodb://tweetmachine:rayed@ds056419.mlab.com:56419/ekitweets';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  console.log("Connected to db");                       
});

/*
* Accessing Public folder and setting routes
*/
app.use(express.static(__dirname + '/public'));

// This route fetches data from DB and returns JSON for AngularJS to read
app.get('/data', function(req,res){
	Tweet.find(function(err,tweets){
    if (err) {return next(err);}
    res.json(tweets);
  })
})

// Delete route
app.delete('/:id/delete', function(req,res){
  var tweetToDelete = req.params.id;
  Tweet.findByIdAndRemove(tweetToDelete, function(err){
    if (err) {return (err);}
    console.log('tweet deleted');
    res.end();
  })
})


/*
* Starting server on 3000 port
*/
http.listen(3000, function(){
  console.log('listening on :3000');
});

/*
* Connecting to twitter
*/
var api = new twit({
  consumer_key: '*',
  consumer_secret: '*',
  access_token: '*',
  access_token_secret: '*'
});

/*
* Starting Stream
*/
io.sockets.on('connection', function (socket) {
 //                                                   v CHANGE BELOW FOR ANOTHER KEYWORD TO TRACK
 var stream = api.stream('statuses/filter', { track: "Fillon" })

  stream.on('tweet', function (tweet) {
    streamHandler(tweet,io);

  });
 });

