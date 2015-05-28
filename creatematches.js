var distance = require('gps-distance');

var Firebase = require('firebase');
var ref = new Firebase('https://housemates.firebaseio.com');
var userRef = ref.child('users');
var matchesRef = ref.child('matches');
var usersObject;

function startBuild(uid) {
	userRef.once('value', function(users) {
		console.log('changed a thing');
		usersObject = users.val();

		currentUser = usersObject[uid];
		createMatches(uid, currentUser);
	});
};

function average(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		console.log('array is',array[i]);
		sum += array[i];
	}
	return sum / array.length;
}

function createMatches(uid, user) {
	var storedMatches = {};
	userRef.child(uid+'/matches').set({}); //clears users existing matches in user object
	//TODO: should clear out all of user's old matches in matches object as well to avoid database clutter

	for(var otherUser in usersObject) {
		if (otherUser === uid) {
			continue;
		}

		var mainType = usersObject[otherUser].mainType;
		var subType = usersObject[otherUser].subType;
		var match = false;

		//user is househunter
			//is otheruser a hasroom and user wants houseshare - yes
			//do user and otheruser both have subtype buddy - yes
		if (user.mainType === 'househunter') {
			if (mainType === 'hasroom') {
				match = true;
			}
			if (!subType.wantbuddy && !user.subType.wantbuddy) {
				match = true;
			}
		}

		//user has a room
			//is otheruser a househunter who wants a room?
			//if not then continue
		if (user.mainType === 'hasroom') {
			if (!subType.wantroom) {
				match = true;
			}
		}

		if (!match)	{
			continue;
		}

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
			similiarityScore: 100,
			distance: calcDistance,
			hello: 'tom!'
		}
		
		var pushedMatch = matchesRef.push(match);
		console.log('matched was pushed',match);
		var data = {};
		data[pushedMatch.name()] = true;
		userRef.child(uid+'/matches').update(data);

		//storedMatches[pushedMatch.name()] = true;
	};
};

module.exports.start = startBuild;