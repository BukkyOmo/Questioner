import moment from 'moment';

class User {
	constructor() {
		this.users = [];
	}

	create(data) {
		const newUser = {
			id: 1,
			firstname: data.firstname,
			lastname: data.lastname,
			othername: data.othername,
			email: data.email,
			phoneNumber: data.phoneNumber,
			username: data.username,
			registered: moment.now(),
			isAdmin: Boolean,
			password: data.password,
		};
		this.users.push(newUser);
		return newUser;
	}

	findOne(id) {
		return this.users.find(oneuser => oneuser.id === id);
	}

	findAll() {
		return this.users;
	}

	delete(id) {
		const user = this.findOne(id);
		const index = this.users.indexOf(user);
		this.users.splice(index, 1);
		return {};
	}
}
export default new User();
