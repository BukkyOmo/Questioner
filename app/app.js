import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import meetup from './v1/routes/meetup';
import rsvp from './v1/routes/rsvp';
import question from './v1/routes/question';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/api/v1', meetup);
app.use('/api/v1/meetups', rsvp);
app.use('/api/v1/meetups', question);

app.listen(port, () => {
	console.log('Questioner app listening on port', port);
});
export default app;
