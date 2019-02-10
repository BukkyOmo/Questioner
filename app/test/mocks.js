
const UserTest = {
  User1: {
    username: "buks",
    email: "bukkyadeola@gmail.com",
    password: "seunolat"
	},
	
	User2: {
		username: "bukkyO",
		email: "bukkyadeolaOO@gmail.com",
		password: "seunolat"
	},

  SuperUserLogin: {
    email: "testing@gmail.com",
    password: "testing"
  },

  LogInUser: {
    email: "bukkyadeola@gmail.com",
    password: "seunolat"
  },

  NoUniqueEmail: {
    password: "BukkyO",
    email: "testing@gmail.com",
    username: "bukkadeye"
  },

  EmptyEmail: {
    password: "Bukola",
    email: "",
    username: "bukkadeye"
  },

  InvalidEmail: {
    password: "Bukola",
    email: "bukola",
    username: "bukkadeye"
  },

  NotUniqueUsername: {
    password: "testing",
		email: "testing@gmail.com",
		username: "testing1"
  },

  EmptyUsername: {
    password: "BuksYTT",
    email: "odunbukola1@gmail.com",
    username: ""
  },

  UsernameNotString: {
    password: "BuksYTT",
    email: "odunbukola1@gmail.com",
    username: []
  },

  UserNotInDatabase: {
    email: "odmreferral@gmail.com",
    password: "hellogirl"
  },

  NotLogIncorrectEmail: {
    email: "odunbabey11@gmail.com",
    password: "seunodun"
  },

  NotLogIncorrectPassword: {
    email: "testing@gmail.com",
    password: "playgirl"
  }
};


const MeetupTest = {
	AdminCreateMeetup: {
		topic: 'Web Accessibility',
		happeningOn: '12-05-2019',
		location: 'Uyo, Akwa Ibom State'
	},

	AdminCreateanotherMeetup: {
		topic: 'Facebook for developers',
		happeningOn: '10-07-2019',
		location: 'Yaba, Lagos State'
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
    id: 1,
    createdBy: 1,
    title: "God saves everyone my dear",
    body: "Niger is part of the world"
  },

  newQuestion2: {
    id: 15,
    createdBy: 1,
    title: "God saves everyone my dear",
    body: "Niger is part of the world"
  },

  QuestionTitleNotString: {
    title: 12345,
    body: "Niger is part of the present"
  },

  QuestionTitleEmpty: {
    body: "Niger is part of the present"
  },

  QuestionBodyNotString: {
    title: "The reward of labour",
    body: 123456
  },

  QuestionBodyEmpty: {
    title: "The reward of labour",
    body: ""
  },

  invalidUserQuestion: {
    userId: 10,
    meetupId: 1,
    title: "GFW orking?",
    body: "why is GFW not working when I insert TYF in the config file?"
  },

  invalidMeetupQuestion: {
    userId: 1,
    meetupId: 200,
    title: "GFW not working?",
    body: "why is GFW nYF in the config file?"
  }
};

const CommentTest = {
  CommentQuestionNotExist: {
    createdBy: 1,
    id: 5,
    body: "Hello beautiful"
  },

  CreateComment: {
    createdBy: 1,
    id: 1,
    body: "Hello love"
  },

  CommentBodyEmpty: {
	createdBy: 1,
	id: 1,
    body: ""
  },

  CommentBodyNotString: {
	createdBy: 1,
	id: 1,
    body: 1234
  }
};

const RSVPTest = {
	validRsvp: {
		body: "yes",
	},

	invalidRsvp: {
		body: "great",
	},
};

const DeleteMeetup = {
	meetupNotExist: {

	}
}


export {
	MeetupTest, QuestionTest, RSVPTest, CommentTest,
	UserTest
};
