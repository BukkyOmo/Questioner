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
    };

    /**
    * Compare Password
    * @param {string} (password, hashedpassword)
    * @returns {string} password
    */
    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    };

    static async encodeToken(payload) {
        return jwt.sign(payload, config.SECRET, { expiresIn: '1 day' });
    }
}

export default Authentication;
