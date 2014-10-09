var distance = require('gps-distance');

var Firebase = require('firebase');
var ref = new Firebase('https://housemates.firebaseio.com');
var userRef = ref.child('users');
var matchesRef = ref.child('matches');
var usersObject;

function startBuild(uid) {
	userRef.on('value', function(users) {
		usersObject = users.val();

		currentUser = usersObject[uid];
		console.log(currentUser)
		createMatches(uid, currentUser);
	});
};

function average(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum / array.length;
}

function createMatches(uid, user) {
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

		//compare age difference - don't have this data yet

		//compare the answers
		var differences = [];

		for (answer in user.answers) {
			var difference = Math.abs(user.answers[answer] - usersObject[otherUser].answers[answer]);
			differences.push(difference);
		};

		var averageDifference = (10 - average(differences)) * 10;

		var match = {
			user1: uid,
			user2: otherUser,
			similiarityScore: averageDifference,
			distance: calcDistance
		}
		matchesRef.push(match);
	};
};

module.exports.start = startBuild;