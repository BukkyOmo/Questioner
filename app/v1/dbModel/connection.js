import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
	development: process.env.DATABASE_URL,
	test: process.env.TESTDATABASE_URL,
};

const env = process.env.NODE_ENV || 'development';

const pool = new Pool({
	connectionString: config[env]
});

pool.on('connect', () => {
	console.log('connected to the db');
});

export default pool;
