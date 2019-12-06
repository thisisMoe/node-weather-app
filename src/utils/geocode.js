const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoibWVtbWVkIiwiYSI6ImNrM2Q1eTVsMTEycXkzaXMxY203czlvMzgifQ.u5wE_IAbKb7XVtr4T0Bt3g&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Impossible de se connecter au service de localisation', undefined);
		} else if (body.features.length === 0) {
			callback("Impossible de trouver l'emplacement. Essayez une autre recherche", undefined);
		} else {
			callback(undefined, {
				long: body.features[0].center[0],
				lat: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
