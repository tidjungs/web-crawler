const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 9000
})

const URL = 'https://play.google.com/store/apps/details?id=';
server.route({
	method: 'GET',
	path: '/{appId}',
	handler: (req, reply) => {
		let appId = req.params.appId
		let lang = req.query.lang || 'en'
		let url = `${URL}${appId}&h1=${lang}`
		reply({
			url: url
		})
	}
})

server.start(err => {
	console.log(`running at ${server.info.uri}`)
})