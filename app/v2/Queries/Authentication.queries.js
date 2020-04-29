const authQuery = {
	checkUserExist: 'SELECT * FROM users WHERE email=$1',
	saveUser: `
        INSERT INTO users(
            first_name,
            last_name,
            email,
            password
        ) values($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email, role
    `
};

export default authQuery;
