import db from '../../../config/database';
import meetupQueries from '../Queries/meetup.queries';
import ResponseFormat from '../Utils/responseFormat.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

class MeetupService {
	static async createMeetup(meetupData) {
		const {
			topic, description, location, date, time, image_url
		} = meetupData;
		const convertDate = new Date(date);
		const today = new Date();

		const queryObj = {
			text: meetupQueries.checkMeetup,
			values: [topic, date]
		};
		const queryObj1 = {
			text: meetupQueries.saveMeetup,
			values: [topic, description, location, date, time, image_url]
		};
		try {
			const { rowCount } = await db.query(queryObj);
			if (rowCount > 0) {
				return failureResponseFormat('Meetup already exist in database.', 400, 'Failure');
			}
			if (convertDate < today) {
				return failureResponseFormat('Meetup date cannot be in the past.', 400, 'Failure');
			}
			const { rows } = await db.query(queryObj1);
			return successResponseFormat('Meetup created successfully.', 200, 'Success', rows[0]);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async editMeetup(meetupData, meetupPayload) {
		try {
			const { id } = meetupPayload;
			const {
				topic, description, location, date, time, image_url
			} = meetupData;
			const convertDate = new Date(date);
			const todayDate = new Date();
			const queryObj = {
				text: meetupQueries.updateMeetup,
				values: [topic, description, location, date, time, image_url, id]
			};
			if (convertDate < todayDate) {
				return failureResponseFormat('Meetup date cannot be in the past.', 400, 'Failure');
			}
			const { rows, rowCount } = await db.query(queryObj);
			if (rowCount === 0) {
				return failureResponseFormat('Meetup failed to update', 400, 'Failure');
			}
			return successResponseFormat('Meetup edited successfully.', 200, 'Success', rows[0]);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default MeetupService;
