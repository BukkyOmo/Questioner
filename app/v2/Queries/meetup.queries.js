const meetupQueries = {
	checkMeetup: 'SELECT * FROM meetups WHERE topic=$1 AND date=$2',
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
    `
};

export default meetupQueries;
