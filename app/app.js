import express from 'express';
import bodyparser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
import router from './v1/routes/routes';

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(expressValidator());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use('/api/v1', router);

app.get('*', (request, response) => {
	response.status(404).json({
		status: 404,
		error: 'The route you are trying to access does not exist'
	});
});

if (!module.parent) {
	app.listen(port, () => {
		console.log('Questioner app listening on port', port);
	});
}

export default app;
