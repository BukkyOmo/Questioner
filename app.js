import express from 'express';
import bodyparser from 'body-parser';

const app = express();
app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

app.get('/', (request, response) => {
	response.send('Hello World');
});

app.listen(8080, () => {
	console.log('Questioner app listening on port 8080');
});
