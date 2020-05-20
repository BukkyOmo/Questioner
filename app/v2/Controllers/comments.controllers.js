import CommentService from '../Services/comments.services';

class CommentController {
	static async createComment(req, res) {
		try {
			const result = await CommentService.createComment(req.body, req.params, req.user);
			return res.status(201).json(result);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default CommentController;
