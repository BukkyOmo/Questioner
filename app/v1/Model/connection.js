import { Pool } from 'pg';

const config = {
	development: process.env.DATABASE_URL,
	test: process.env.TEST_DATABASE_URL,
	production: process.env.PRODUCTION_DATABASE_URL,
};
const env = process.env.NODE_ENV;

const pool = new Pool({
	connectionString: config[env]
});

pool.on('connect', () => {
	console.log('connected to the db');
});

export default pool;
