
const UserTest = {
	User: {
		email: 'bukkyO@gmail.com',
		password: 'seun'
	},

	SuperUser: {
		email: 'bukkyo@gmail.com',
		password: 'bukola'
	},

	NoUniqueEmail: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'BukkyO',
		email: 'bukkyO@gmail.com',
		phoneNumber: '09039136484',
		username: 'bukkadeye'
	},

	EmptyEmail: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'Bukola',
		email: '',
		phoneNumber: '09039136484',
		username: 'bukkadeye'
	},

	InvalidEmail: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'Bukola',
		email: 'bukola',
		phoneNumber: '09039136484',
		username: 'bukkadeye'
	},

	NotUniqueUsername: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'BuksYTT',
		email: 'odunbukola1@gmail.com',
		phoneNumber: '09039136484',
		username: 'bukkady123'
	},

	EmptyUsername: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'BuksYTT',
		email: 'odunbukola1@gmail.com',
		phoneNumber: '09039136484',
		username: ''
	},

	UsernameNotString: {
		firstname: 'bukola',
		lastname: 'Odunayo',
		password: 'BuksYTT',
		email: 'odunbukola1@gmail.com',
		phoneNumber: '09039136484',
		username: []
	},

	RegisteredUser: {
		email: 'bukkyO@gmail.com',
		password: 'seun'
	},

	UserNotInDatabase: {
		email: 'odmreferral@gmail.com',
		password: '34567'
	},

	NotLogIncorrectEmail: {
		email: 'odunbabey11@gmail.com',
		password: 'flexy'
	},

	NotLogIncorrectUsername: {
		password: 'bukola',
		email: 'seunzone@gmail.com'
	},
};


const MeetupTest = {
	AdminCreateMeetup: {
		topic: 'Web Accessibility',
		happeningOn: '2019-12-12',
		location: 'Uyo, Akwa Ibom State',
	},

	MeetupTopicNotString: {
		createdOn: '3-12-2018',
		location: 'Abuja',
		topic: 12345,
		happeningOn: '15-02-2018',
		tags: ['flowers', 'love'],
	},

	MeetupTopicEmpty: {
		createdOn: '3-12-2018',
		location: 'Abuja',
		topic: '',
		happeningOn: '15-02-2018',
		tags: ['flowers', 'love'],
	},

	MeetupLocationEmpty: {
		createdOn: '3-12-2018',
		topic: 'The influx of gayism in Nigeria',
		happeningOn: '15-02-2018',
		tags: ['flowers', 'love'],
	},

	MeetupLocationNotString: {
		createdOn: '3-12-2018',
		topic: 'The influx of gayism in Nigeria',
		location: 1234,
		happeningOn: '15-02-2018',
		tags: ['flowers', 'love'],
	},

	MeetuphappeningDateEmpty: {
		createdOn: '3-12-2018',
		topic: 'The influx of gayism in Nigeria',
		location: 'Lokoja',
		tags: ['flowers', 'love'],
	},

	invalidPastMeetup: {
		organizerName: 'DevFest',
		topic: 'Web Accessibility',
		happeningOn: '2018-12-12',
		location: 'Uyo, Akwa Ibom State',
	},
	nonAdminMeetup: {
		isAdmin: false,
		organizer: 'DevFest',
		topic: 'Web Accessibility',
		happeningOn: '12/12/12',
		location: 'Uyo, Akwa Ibom State',
		tags: ['Tech', 'Edu'],
		images: 'jpeg.png',

	},
};


const QuestionTest = {
	newQuestion: {
		meetupId: 1,
		userId: 1,
		title: 'God saves everyone my dear',
		body: 'Niger is part of the world',
	},

	QuestionTitleNotString: {
		title: 12345,
		body: 'Niger is part of the present',
	},

	QuestionTitleEmpty: {
		body: 'Niger is part of the present',
	},

	QuestionBodyNotString: {
		title: 'The reward of labour',
		body: {},
	},

	QuestionBodyEmpty: {
		title: 'The reward of labour',
		body: '',
	},

	invalidUserQuestion: {
		userId: 10,
		meetupId: 1,
		title: 'GFW orking?',
		body: 'why is GFW not working when I insert TYF in the config file?',
	},

	invalidMeetupQuestion: {
		userId: 1,
		meetupId: 200,
		title: 'GFW not working?',
		body: 'why is GFW nYF in the config file?',
	},
};

const CommentTest = {
	CommentQuestionNotExist: {
		body: 'Hello beautiful',
	},

	CreateComment: {
		body: 'Hello love',
	},

	CommentBodyEmpty: {
		body: '',
	},

	CommentBodyNotString: {
		body: 1234,
	},

};

const RSVPTest = {
	validRsvp: {
		status: 'yes',
	},

	invalidRsvp: {
		status: 'great',
	},
};


export {
	MeetupTest, QuestionTest, RSVPTest, CommentTest,
	UserTest,
};
