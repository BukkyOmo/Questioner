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
	findMeetupById: 'SELECT * FROM meetups WHERE id=$1 AND archived=false'
};

export default meetupQueries;
