'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _meetup = require('./v1/routes/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _rsvp = require('./v1/routes/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _question = require('./v1/routes/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;

app.use((0, _morgan2.default)('tiny'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/v1', _meetup2.default);
app.use('/api/v1/meetups', _rsvp2.default);
app.use('/api/v1/meetups', _question2.default);

app.listen(port, function () {
	console.log('Questioner app listening on port ' + port);
});

exports.default = app;