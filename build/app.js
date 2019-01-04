'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _meetup = require('./routes/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import question from './routes/question';
// import rsvp from './routes/rsvp';

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;
app.use((0, _morgan2.default)('tiny'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.get('/', function (request, response) {
	response.send('Hello World');
});

app.use(function (request, response, next) {
	var error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use(function (error, request, response, next) {
	response.status(error.status || 500);
	response.json({
		status: 404,
		success: false,
		error: {
			message: error.message
		}
	});
});

app.use('/api/v1', _meetup2.default);
// app.use('/api/v1/meetups', question);
// app.use('/api/v1/meetup', rsvp);

app.listen(port, function () {
	console.log('Questioner app listening on port ' + port);
});