import { v4 as uuidv4 } from 'uuid';
import db from '../../../config/database';
import authQuery from '../Queries/Authentication.queries';
import AuthUtils from '../Utils/Authentication.utils';
import ResponseFormat from '../Utils/responseFormat.utils';
import MailNotification from '../Helpers/mail.helpers';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;
const {
	hashPassword, comparePassword, encodeToken, decodeToken
} = AuthUtils;
const { signUpEmail, passwordResetEmail } = MailNotification;

class AuthService {
	static async userSignUp(userData) {
		const id = uuidv4();
		const {
			firstname, lastname, email, password
		} = userData;

		const queryObj = {
			text: authQuery.checkUserExist,
			values: [email]
		};
		const queryObj1 = {
			text: authQuery.saveUser,
			values: [id, firstname, lastname, email, hashPassword(password)]
		};
		try {
			const result = await db.query(queryObj);

			if (result.rowCount !== 0) {
				return failureResponseFormat('User already exists in database', 400, 'Failure');
			}
			const { rows, rowCount } = await db.query(queryObj1);
			if (rowCount === 0) {
				return failureResponseFormat('User failed to save in database', 400, 'Failure');
			}
			const {
				first_name, role
			} = rows[0];
			const token = await encodeToken({
				id, first_name, role, email
			});
			await signUpEmail(first_name, email);
			return successResponseFormat('User successfully saved to database', 201, 'Success', token);
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async userSignIn(userData) {
		const { email, password } = userData;
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

	static async forgotPassword(userData) {
		const { email } = userData;
		const queryObj = {
			text: authQuery.checkUserExist,
			values: [email]
		};
		try {
			const { rows, rowCount } = await db.query(queryObj);
			if (rowCount === 0) {
				return failureResponseFormat('User does not exist in database', 400, 'Failure');
			}
			const { id, first_name, role } = rows[0];
			const token = await encodeToken({
				id, first_name, email, role
			});
			const queryObj1 = {
				text: authQuery.forgotPassword,
				values: [token, email]
			};
			await db.query(queryObj1);
			await passwordResetEmail(token, email, first_name);
			return successResponseFormat('Reset password mail sent successfully', 200, 'Success');
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}

	static async resetPassword(userData, userPayload) {
		const { password } = userData;
		const { token } = userPayload;
		const decoded = await decodeToken(token);
		try {
			if (decoded.message === 'jwt expired') {
				return failureResponseFormat('Token expired', 400, 'Failure');
			}
			if (decoded.name === 'JsonWebTokenError') {
				return failureResponseFormat('Token invalid', 400, 'Failure');
			}
			const { email } = decoded;
			const queryObj1 = {
				text: authQuery.resetPassword,
				values: [null, hashPassword(password), token, email]
			};
			await db.query(queryObj1);
			return successResponseFormat('Password reset successful', 200, 'Success');
		} catch (error) {
			return failureResponseFormat('Internal server error', 500, 'Failure', error);
		}
	}
}

export default AuthService;
