class ResponseFormat {
	static successResponseFormat(message, statusCode, status, data, count) {
		return Promise.resolve({
			message, statusCode, status, data, count
		});
	}

	static failureResponseFormat(message, statusCode, status, error) {
		return Promise.reject({
			message, statusCode, status, error
		});
	}
}

export default ResponseFormat;
