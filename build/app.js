'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (request, response) {
	response.send('Hello World');
});

app.listen(8080, function () {
	console.log('Questioner app listening on port 8080');
});