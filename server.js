var Hapi = require('hapi');
var email = require('./email');
var creatematches = require('./creatematches');

var port = process.env.PORT || 5000;
var server = new Hapi.Server(port, { cors: true });

server.start(function() {
	console.log('Server running at:', server.info.uri);
});

server.route({
	method: 'GET',
	path: '/creatematches/{uid}',
	handler: function(request, reply) {
		creatematches.start(request.params.uid);
		reply('create matches called for '+request.params.uid);
	}
});

server.route({
	method: 'GET',
	path: '/sendemail/{email}/{from}/{subject}/{message}',
	handler: function(request, reply) {
		email.send(request.params.email,request.params.from,encodeURIComponent(request.params.subject),encodeURIComponent(request.params.message));
		reply('emails called for '+encodeURIComponent(request.params.email));
	}
});