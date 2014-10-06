//create a server and listen for connections
var http = require('http');
var url = require('url');

var port = process.env.PORT || 5000;

http.createServer(function (req, res) {
	res.writeHead(200);

	var url_parts = url.parse(req.url, true);
	console.log(url_parts.query);

	if (url_parts.query.uid) {
		startBuild(url_parts.query.uid);
	}

	res.end();
}).listen(port);

var distance = require('gps-distance');

var Firebase = require('firebase');
var ref = new Firebase('https://housemates.firebaseio.com');
var userRef = ref.child('users');
var matchesRef = ref.child('matches');
var usersObject;

var userName = 'facebook:1547041612178501';

function startBuild(uid) {
	userRef.on('value', function(users) {
		usersObject = users.val();

		currentUser = usersObject[uid];

		createMatches(currentUser);
	});
};

function average(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum / array.length;
}

function createMatches(user) {
	for(var otherUser in usersObject) {
		var mainType = usersObject[otherUser].mainType;
		var subType = usersObject[otherUser].subType;

		//user is househunter
			//is otheruser a hasroom and user wants houseshare - yes
			//do user and otheruser both have subtype buddy - yes

		//user has a room
			//is otheruser a househunter who wants a room?
			//if not then continue

		var calcDistance = distance(user.location.lat, user.location.lng, usersObject[otherUser].location.lat, usersObject[otherUser].location.lng)

		//compare age difference - don't have this data

		//compare the answers
		var differences = [];

		for (answer in user.answers) {
			var difference = Math.abs(user.answers[answer] - usersObject[otherUser].answers[answer]);
			differences.push(difference);
		};

		var averageDifference = (10 - average(differences)) * 10;

		var match = {
			user1: userName,
			user2: otherUser,
			similiarityScore: averageDifference,
			distance: calcDistance
		}
		matchesRef.push(match);
	};
};