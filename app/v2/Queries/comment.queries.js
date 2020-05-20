const commentQueries = {
	getComment: 'SELECT * FROM comments WHERE body=$1',
	saveComment: `
    INSERT INTO comments
    (body, user_id, question_id) 
    VALUES($1, $2, $3) RETURNING *
    `
};

export default commentQueries;
