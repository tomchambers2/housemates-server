var Firebase = require('firebase');
var ref = new Firebase('https://housemates.firebaseio.com/users');

function random(array) {
	var pick = Math.floor(Math.random() * (array.length - 1));
	console.log(array.length - 1);
	return array[pick];
}

for (var i = 0; i < 10; i++) {
	var newUser = {
		name: random(['Richard Peters','Joan Sutcliffe','Jerry Adams','Tom Chambers','Paul Ruddock','Peter Harmsworth','Neil Ogden','Patrick Wuthers','Jermyn Wustenhoff']),
		gender: random(['male','female']),
		lastLooking: '1412599023758',
		location: { 
			lat: 51.504359132252716,
     		lng: -0.11093469334946349,
     		radius: 2950.137884942776
     	},
     	mainType: random(['househunter','hasroom']),
     	subType: random([[{wantbuddy: true},{wantroom: false}],[{wantbuddy: false},{wantroom: true}],[{wantbuddy: false},{wantroom: false}],[{wantbuddy: true},{wantroom: true}]]),
     	answers: {"-JY_IKlpqJHA69iXbGf7": random([0,1,2,3,4,5]),"-JY_Mn9eVM3p1NsCRY2m": random([0,1,2,3,4])},
     	age_range: {
     		min: 21
     	},
     	bio: 'Am I real person or a replicant?'
	}

	ref.push(newUser);
}