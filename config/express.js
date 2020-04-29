import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import FileStreamRotator from 'file-stream-rotator';
import expressValidator from 'express-validator';
import apiVersion2 from './versioning/v2';
import routes from '../app/v1/routes/routes';

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
	let accessLogStream;

	console.log('Application starting...');
	console.debug('Overriding \'Express\' logger');


	if (checkLogDir) {
		accessLogStream = FileStreamRotator.getStream({
			date_format: 'YYYYMMDD',
			filename: `${logDirectory}/access-%DATE%.log`,
			frequency: 'weekly',
			verbose: false
		});
	}


	app.use(morgan('combined', { stream: accessLogStream }));
	app.use(expressValidator());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));


	// Use helmet to secure Express headers
	app.use(helmet());
	app.disable('x-powered-by');
	app.use(cors());
	app.use('/api/v2', apiVersion2);

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});


	app.use('/api/v1/', routes);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development' || app.get('env') === 'test') {
		app.use((err, req, res, next) => res.status(err.status || 500)
			.json({
				message: err.message,
				error: err
			}));
	}

	// production error handler
	// remove stacktrace
	app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.message }));
};

export default expressConfig;
