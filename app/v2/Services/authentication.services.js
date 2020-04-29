import db from '../../../config/database';
import authQuery from '../Queries/Authentication.queries';
import AuthUtils from '../Utils/Authentication.utils';
import ResponseFormat from '../Utils/responseFormat.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

const { hashPassword, comparePassword, encodeToken } = AuthUtils;
class AuthService {
	static async userSignUp(body) {
		const {
			firstname, lastname, email, password
		} = body;

		const queryObj = {
			text: authQuery.checkUserExist,
			values: [email]
		};
		try {
			const result = await db.query(queryObj);

			if (result.rowCount !== 0) {
				return failureResponseFormat('User already exists in database', 400, 'Failure');
			}
			const queryObj1 = {
				text: authQuery.saveUser,
				values: [firstname, lastname, email, hashPassword(password)]
			};
			const { rows, rowCount } = await db.query(queryObj1);
			if (rowCount === 0) {
				return failureResponseFormat('User failed to save in database', 400, 'Failure');
			}
			const {
				id, first_name, role
			} = rows[0];
			const token = await encodeToken({
				id, first_name, role, email
			});
			return successResponseFormat('User successfully saved to database', 201, 'Success', token);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async userSignIn(body) {
		const { email, password } = body;
		const queryObj = {
			text: authQuery.checkUserExist,
			values: [email]
		};
		try {
			const { rows, rowCount } = await db.query(queryObj);
			if (rowCount === 0) {
				return failureResponseFormat('User does not exist in database', 400, 'Failure');
			}
			const verifyPassword = comparePassword(password, rows[0].password);
			if (!verifyPassword) {
				return failureResponseFormat('Invalid email or password', 400, 'Failure');
			}
			const { id, first_name, role } = rows[0];
			const token = await encodeToken({
				id, first_name, email, role
			});
			return successResponseFormat('User signed in successfully', 200, 'Success', token);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default AuthService;
