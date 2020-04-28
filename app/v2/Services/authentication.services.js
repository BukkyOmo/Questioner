import db from '../../../config/database'
import authQuery from '../Queries/Authentication.queries';
import AuthUtils from '../Utils/Authentication.utils';
import ResponseFormat from '../Utils/responseFormat.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

const { hashPassword, encodeToken } = AuthUtils;
class AuthService {
    static async userSignUp(body) {
        const { firstname, lastname, email, password } = body;

        const queryObj = {
            text: authQuery.checkUserExist,
            values: [email]
        };

        try {
            const { rowCount } = await db.query(queryObj);

            if (rowCount != 0) {
                return failureResponseFormat('User already exists in database', 400, 'Failure');
            } else {
                const queryObj1 = {
                    text: authQuery.saveUser,
                    values: [firstname, lastname, email, hashPassword(password)]
                };
                const { rows, rowCount } = await db.query(queryObj1);
                if (rowCount === 0) {
                    return failureResponseFormat('User failed to save in database', 400, 'Failure')
                } else {
                    const { id, first_name, role, email } = rows[0];
                    const token = await encodeToken({ id, first_name, role, email });
                    return successResponseFormat('User successfully saved to database', 201, 'Success', token);
                };
            };
        } catch (error) {
            return failureResponseFormat('Internal server error', 500, 'Failure', error);
        };
    }
}

export default AuthService;
