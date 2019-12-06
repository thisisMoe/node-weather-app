const request = require('request');

const forecast = (lat, long, callback) => {
	const url =
		'https://api.darksky.net/forecast/c0c3d2464e2e7d27281f4190e4f01530/' +
		String(lat) +
		',' +
		String(long) +
		'?lang=fr&units=si&exclude=minutely,hourly';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Impossible de se connecter au service de Meteo', undefined);
		} else if (body.errors) {
			callback(body.error, undefined);
		} else {
			const msg =
				body.daily.data[0].summary +
				' Il fait actuellement ' +
				body.currently.temperature +
				' degrés.' +
				' Temperature min: ' +
				body.daily.data[0].temperatureMin +
				' / max: ' +
				body.daily.data[0].temperatureMax +
				'. Il y a ' +
				body.currently.precipProbability +
				'% de chances de pluie.';

			callback(undefined, msg);
		}
	});
};

module.exports = forecast;
