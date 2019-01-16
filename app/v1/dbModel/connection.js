import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
	development: process.env.DATABASE_URL,
	test: process.env.DATABASE_MIGRATION,
};

const env = process.env.NODE_ENV || 'development';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log('connected to the db');
});

export default pool;
