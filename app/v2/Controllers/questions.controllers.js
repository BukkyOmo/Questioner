import QuestionService from '../Services/questions.services';

class QuestionController {
	static async createQuestion(req, res) {
		try {
			const result = await QuestionService.createQuestion(req.params, req.body, req.user);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	static async getAllUserQuestion(req, res) {
		try {
			const result = await QuestionService.getAllUserQuestion(req.user);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	static async getOneQuestion(req, res) {
		try {
			const result = await QuestionService.getOneQuestion(req.params);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	static async editQuestion(req, res) {
		try {
			const result = await QuestionService.editQuestion(req.body, req.user, req.params);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default QuestionController;
