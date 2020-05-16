const meetupQueries = {
	checkMeetup: 'SELECT * FROM meetups WHERE topic=$1 AND date=$2',
	findMeetup: 'SELECT * FROM meetups WHERE id=$1',
	saveMeetup: `
        INSERT INTO meetups
        (topic, description, location, date, time, image_url)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `,
	updateMeetup: `
        UPDATE meetups 
        SET topic=$1, description=$2, location=$3, date=$4, 
        time=$5, image_url=$6, updated_at=NOW()
        WHERE id=$7 RETURNING *;
    `,
	checkDeleted: `
        SELECT * FROM meetups WHERE id=$1 AND archived=true
    `,
	deleteMeetup: `
        UPDATE meetups SET archived='true', updated_at=NOW() WHERE id=$1
    `,
	getAllMeetups: 'SELECT * FROM meetups WHERE archived=false ORDER BY created_at DESC',
	findMeetupById: 'SELECT * FROM meetups WHERE id=$1 AND archived=false',
	getOneMeetup: `
        SELECT 
            meetups.id, meetups.topic, meetups.description, 
            meetups.location, meetups.date, meetups.time, 
            meetups.image_url,
        CASE WHEN
            count(q) = 0
            THEN ARRAY[]::json[] 
            ELSE array_agg(q.questions)
            END AS questions 
        FROM meetups LEFT JOIN (
        SELECT meetup_id,
        json_build_object(
            'id', question.id,
            'title', question.title,
            'body', question.body,
            'user_id', question.user_id,
            'created_at', question.created_at
            ) AS questions 
            FROM questions AS question
        ) AS q 
        ON q.meetup_id=meetups.id 
        WHERE meetups.id=$1
        GROUP BY meetups.id;
    `
};

export default meetupQueries;
