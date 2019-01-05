import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import meetup from './v1/routes/meetup';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/api/v1', meetup);

app.listen(port, () => {
	console.log(`Questioner app listening on port ${port}`);
});

export default app;
