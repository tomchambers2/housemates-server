var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('DuIMK8qbJHaZYYAvfET5gQ');

var send = function(email,from,subject,message) {
	console.log("Sent email to "+email)
	var message = {
		"text": message,
		"subject": subject,
		"from_email": from,
		"from_name": "Housemates Team",
		"to": [{
			"email": email,
			"name": email,
			"type": "to"
		}]
	};

	mandrill_client.messages.send({ "message": message })
};

module.exports.send = send;