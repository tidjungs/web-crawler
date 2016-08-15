const Hapi = require('hapi')
const server = new Hapi.Server()
const request = require('request')
const cheerio = require('cheerio')
const URL = 'https://play.google.com/store/apps/details?id=';

server.connection({
	host: 'localhost',
	port: 9000
})

server.route({
	method: 'GET',
	path: '/{appId}',
	handler: (req, reply) => {
		let appId = req.params.appId
		let lang = req.query.lang || 'en'
		let url = `${URL}${appId}&h1=${lang}`
		request(url, (err, response, body) => {

			if(!err && response.statusCode === 200) {
				let $ = cheerio.load(body)
				reply({})
			} else {
				reply({
					message: `error on ${url}`
				})
			}

		})

	}
})

server.start(err => {
	console.log(`running at ${server.info.uri}`)
})