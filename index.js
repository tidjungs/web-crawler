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

		let appId = req.params.appId;
    	let lang = req.query.lang || 'en';
    	let url = `${URL}${appId}&hl=${lang}`;
    	console.log(url)
		request(url, (err, response, body) => {

			if(!err && response.statusCode === 200) {

				let $ = cheerio.load(body)
				let title = $('.document-title').text().trim()
				let publisher = $('.document-subtitle.primary').text().trim()
				let category = $('.document-subtitle.category').text().trim()
		        let score = $('.score-container > .score').text().trim()
		        let install = $('.meta-info > .content').eq(2).text().trim()
		        let version = $('.meta-info > .content').eq(3).text().trim()

		        //get next taget
		        var list = [];
					$('div.rec-cluster').find('div > div.cover > a').each(function (index, element) {
					  list.push($(element).attr('href'));
				});

				reply({
					title: title,
		            publisher: publisher,
		            category: category,
		            score: score,
		            install: install,
		            version: version,
		            list: list
				})

			} else {
				console.log('error')
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