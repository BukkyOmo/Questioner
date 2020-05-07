const meetupQueries = {
	checkMeetup: 'SELECT * FROM meetups WHERE topic=$1 AND date=$2',
	saveMeetup: `
        INSERT INTO meetups
        (topic, description, location, date, time, image_url)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `
};

export default meetupQueries;
