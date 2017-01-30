var mongoose = require('mongoose');

//Schema for tweets

var tweet = new mongoose.Schema({
	twid		:String,
	author		:String,
	avatar		:String,
	body		:String,
	date		:Date,
	screenname 	:String,
	language	:String,
	retweet 	:Number,
	favorite	:Number
	
});

//Exporting the model
module.exports = Tweet = mongoose.model('Tweet', tweet);