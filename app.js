console.log("Hello!!! It's starting!")

var Twit = require('twit')

var config = require('./config.js')

var T = new Twit(config)

// T.post('statuses/update', { status: 'What if...Peanut butter and jelly sandwiches were called JifJams' }, function(err, data, response) {
//   console.log(data)
// })

// T.get('search/tweets', { q: 'jam since:2011-07-11', count: 5 }, function(err, data, response) {
//   for (var i =0; i < 5; i++){
// 	  console.log(data.statuses[i].text)
// 	}
// })

//write a function that includes an array of tweets
//randomly select a tweet from the array
//post on an interval
//could include a callback function inside T.post('statuses/update' to verify tweet has posted

// function tweets(){
// 	var someTweets = ["Hello", "What if...Peanut butter and jelly sandwiches were called JifJams", "Bread", "crust or no crust?"]
// 	var aTweet = someTweets[Math.floor(Math.random()*someTweets.length)]
// 	T.post('statuses/update', { status: aTweet }, function(err, data, response) {
// 	  console.log(data)
// 	})
// }

// setInterval(tweets, 1000*60);

//Code below gathers a collection of tweets and takes a random word from each tweet and creates a new tweet that is posted


var numTweets = 5;

function makeATweet(){
	var wordLst = [];
	T.get('search/tweets', { q: 'angry since:2015-3-13', count: numTweets }, function(err, data, response) {
		for (var i =0; i < numTweets; i++){
			var aTweet = data.statuses[i].text;
			var t = aTweet.split(" ");
			var aWord = t[Math.floor(Math.random() * t.length)]
			while(aWord[0] == '@'){
				aWord = t[Math.floor(Math.random() * t.length)]
			}
			wordLst.push(aWord);
		}
		var myTweet = wordLst.join(" ");
		console.log(myTweet);

		T.post('statuses/update', { status: myTweet }, function(err, data, response) {
	  		console.log(data)
		})
	})
}

setInterval(makeATweet, 20000);

//http://inspirobot.me/
//bot associated with fb messenger and offering instant reply text/stickers/gifs