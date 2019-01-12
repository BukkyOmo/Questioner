import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import router from './v1/routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/api/v1', router);

app.get('*', (request, response) => {
	response.json({
		status: 404,
		message: false,
		error: ({ message: 'The route you are trying to access does not exist' })
	});
});

app.listen(port, () => {
	console.log('Questioner app listening on port', port);
});
export default app;
