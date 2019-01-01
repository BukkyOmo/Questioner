import moment from 'moment';

class Question {
	constructor() {
		this.questions = [];
	}

	create(data) {
		const newQuestion = {
			id: 1,
			createdOn: moment.now(),
			createdBy: data.createdBy,
			meetup: data.meetup,
			title: data.title,
			body: data.body,
			votes: 0,
		};
		this.questions.push(newQuestion);
		return newQuestion;
	}

	findOne(id) {
		return this.questions.find(onequestion => onequestion.id === id);
	}

	findAll() {
		return this.questions;
	}
}
export default new Question();
