import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';

class Authentication {
	/**
    * Hash Password
    * @param {string} password
    * @returns {string} hashedpassword
    */
	static hashPassword(password) {
		const saltRounds = 10;
		return bcrypt.hashSync(password, saltRounds);
	}

	/**
    * Compare Password
    * @param {string} (password, hashedpassword)
    * @returns {string} password
    */
	static comparePassword(password, hashedPassword) {
		return bcrypt.compareSync(password, hashedPassword);
	}

	/**
	* Encode jwt token
	* @param {string} (password, hashedpassword)
	* @returns {string} password
	*/
	static async encodeToken(payload) {
		return jwt.sign(payload, config.SECRET);
	}

	/**
	* Decode jwt token
	* @param {string} (password, hashedpassword)
	* @returns {string} password
	*/
	static async decodeToken(payload) {
		try {
			return jwt.verify(payload, config.SECRET, (err, decode) => {
				if (err) {
					return err;
				}
				return decode;
			});
		} catch (error) {
			return error;
		}
	}
}

export default Authentication;
