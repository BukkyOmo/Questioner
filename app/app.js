import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.listen(port, () => {
	console.log('Questioner app listening on port', port);
});
export default app;
