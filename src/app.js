const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up static directory to serve
app.use(express.static(publicDirPath));

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setting up route handlers:
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name: 'B. Sidi Mohammed'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'B. Sidi Mohammed'
	});
});

app.get('/help', (req, res) => {
	res.render('help' /*help.hbs*/, {
		title: 'Help',
		msg: 'Help page',
		name: 'B. Sidi Mohammed'
	});
});

//Update weather endpoint to accept address
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	geocode(req.query.address, (error, { lat, long, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(lat, long, (forecastError, forecastResponse) => {
			if (forecastError) {
				return res.send({ forecastError });
			}
			res.send({
				location: location,
				forecast: forecastResponse
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		msg: 'Help article not found.',
		title: 'Oops',
		name: 'B. Sidi Mohammed'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		msg: 'Page not found.',
		title: 'Oops',
		name: 'B. Sidi Mohammed'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
