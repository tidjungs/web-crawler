const Hapi = require('hapi')
const server = new Hapi.Server()
const request = require('request')
const cheerio = require('cheerio')

server.connection({
	host: 'localhost',
	port: 9000
})

server.route({
	method: 'GET',
	path: '/',
	handler: (req, reply) => {
		let url = 'http://devahoy.com/posts/scraping-web-with-nodejs'
		request(url, (err, response, body) => {

			if(!err && response.statusCode === 200) {
				let $ = cheerio.load(body)
				let title = $('.title').text().trim()
				reply({
					title: title
				})

			} else {
				reply({
					message: `error`
				})
			}

		})

	}
})

server.start(err => {
	console.log(`running at ${server.info.uri}`)
})