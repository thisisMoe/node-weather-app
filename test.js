const express = require('express');

const app = express();

app.get('', (req, res) => {
	res.send('Welcome to test page!');
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
