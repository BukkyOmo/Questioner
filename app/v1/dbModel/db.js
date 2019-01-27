import pool from './connection';

const TABLE = [
	`DROP TABLE IF EXISTS users;
		CREATE TABLE users(
        user_id SERIAL NOT NULL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        username VARCHAR(128) UNIQUE NOT NULL,
		phoneNumber VARCHAR(20),
		email VARCHAR(128) UNIQUE NOT NULL,
		password VARCHAR NOT NULL,
		isAdmin BOOLEAN,
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`,
	`DROP TABLE IF EXISTS meetup;
		CREATE TABLE meetup(
        meetup_id SERIAL NOT NULL PRIMARY KEY,
        topic VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        happeningOn TIMESTAMP NOT NULL,
        images BYTEA,
		tags VARCHAR(128),
        user_id INTEGER,
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`,
	`DROP TABLE IF EXISTS question;
		CREATE TABLE question(
        question_id SERIAL NOT NULL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) NOT NULL,
		upvotes INT,
		downvotes INT,
        user_id INTEGER,
		meetup_id INTEGER,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      )`,
	`DROP TABLE IF EXISTS comment;
		CREATE TABLE comment(
        comment_id SERIAL NOT NULL PRIMARY KEY,
        body VARCHAR(128) NOT NULL,
		user_id INTEGER,
		question_id INTEGER,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      )`,
	`DROP TABLE IF EXISTS rsvp;
		CREATE TABLE rsvp(
        rsvp_id SERIAL NOT NULL PRIMARY KEY,
        response VARCHAR(128) NOT NULL, 
        user_id INTEGER,
		meetup_id INTEGER,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      )`
];

for (let i = 0; i < TABLE.length; i += 1) {
	pool.query(TABLE[i]);
}
