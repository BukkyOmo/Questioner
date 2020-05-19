const questionQueries = {
	checkQuestion: 'SELECT * FROM questions WHERE body=$1 AND meetup_id=$2',
	saveQuestion: `
        INSERT INTO questions
        (title, body, user_id, meetup_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `,
	getAllUserQuestion: 'SELECT * FROM questions WHERE user_id=$1'
};

export default questionQueries;
