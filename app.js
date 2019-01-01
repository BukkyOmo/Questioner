import express from 'express';

const app = express();

app.get('/', (request, response) => {
	response.send('Hello World');
});

app.get('/question', (request, response) => {
	response.json({
		data: 'i am blessed',
	});
});

app.listen(8080, () => {
	console.log('Questioner app listening on port 8080');
});
