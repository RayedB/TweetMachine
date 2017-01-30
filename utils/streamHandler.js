// Utility method for receiving tweets, saving them on DB and emit with socket.io

var Tweet = require('../models/tweets.js');

module.exports = function(stream, io){

    // Construct a new tweet object with data
    var tweet = {
      twid: stream['id'],
      author: stream['user']['name'],
      avatar: stream['user']['profile_image_url'],
      body: stream['text'],
      date: stream['created_at'],
      screenname: stream['user']['screen_name'],
      language: stream['lang'],
      retweet: stream['retweet_count'],
      favorite: stream['favorite_count']
    };

    // Create a new model instance with our object
    var tweetEntry = new Tweet(tweet);

    // Save to mongodb
    tweetEntry.save(function(err) {
      if (!err) {
        // If everything is cool, socket.io emits the tweet.
        io.emit('tweet', tweet);
      }
    });

};