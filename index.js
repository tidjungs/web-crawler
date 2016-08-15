const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 9000
})

server.route({
	method: 'GET',
	path: '/{appId}',
	handler: (req, reply) => {
		reply({messege: 'Hello World'})
	}
})

server.start(err => {
	console.log(`running at ${server.info.uri}`)
})