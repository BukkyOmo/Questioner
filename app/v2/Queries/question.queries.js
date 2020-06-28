const questionQueries = {
	checkQuestion: 'SELECT * FROM questions WHERE body=$1 AND meetup_id=$2',
	saveQuestion: `
        INSERT INTO questions
        (title, body, user_id, meetup_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `,
	getAllUserQuestion: 'SELECT * FROM questions WHERE user_id=$1 ORDER BY created_at DESC',
	getQuestion: 'SELECT * FROM questions WHERE id=$1',
	getOneQuestion: `
        SELECT 
            questions.id, title, questions.body, 
            users.first_name, users.last_name,
            questions.created_at, questions.updated_at,
	    CASE WHEN
    		count(c) = 0
  		THEN ARRAY[]::json[] 
  		ELSE array_agg(c.comments)
  		END AS comments	
        FROM questions
        LEFT JOIN users ON users.id = questions.user_id
        LEFT JOIN (
		SELECT 
            question_id,
            json_build_object(
                'id', com.id,
                'comment', com.body,
                'posted by', com.user_id,
                'posted at', com.created_at,
                'edited at', com.updated_at
            ) AS comments
		FROM comments AS com
	    ) AS c
        ON c.question_id = questions.id 
        WHERE questions.id=$1
        GROUP BY questions.id, users.first_name, users.last_name;
    `,
	getQuestionOwner: 'SELECT * FROM questions WHERE id=$1 AND user_id=$2',
	editQuestion: 'UPDATE questions SET title=$1, body=$2 WHERE id=$3 RETURNING *'
};

export default questionQueries;
