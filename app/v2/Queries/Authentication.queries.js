const authQuery = {
	checkUserExist: 'SELECT * FROM users WHERE email=$1',
	saveUser: `
        INSERT INTO users(
            id,
            first_name,
            last_name,
            email,
            password
        ) values($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, role
    `,
	forgotPassword: 'UPDATE users SET password_reset_token=$1 WHERE email=$2',
	checkResetToken: 'SELECT * FROM users WHERE password_reset_token=$1',
	resetPassword: 'UPDATE users SET password_reset_token=$1, password=$2 WHERE password_reset_token=$3 AND email=$4'
};

export default authQuery;
