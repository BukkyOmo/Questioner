import express from 'express';
import bodyparser from 'body-parser';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import moment from 'moment';
import router from './v1/routes/routes';

const app = express();
app.use(expressValidator());
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use('/api/v1', router);

app.all('*', (request, response) => {
	response.status(404).json({
		status: 404,
		error: 'The route you are trying to access does not exist'
	});
});

app.listen(port, () => {
	console.log('Questioner app listening on port', port);
});
export default app;
