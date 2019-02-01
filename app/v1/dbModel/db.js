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
		user_id INTEGER,
        topic VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        happeningOn TIMESTAMP NOT NULL,
        images BYTEA,
		tags VARCHAR(128),
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`,
	`DROP TABLE IF EXISTS questions;
		CREATE TABLE questions(
        question_id SERIAL NOT NULL PRIMARY KEY,
		createdBy INTEGER,
		meetup_id INTEGER,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) UNIQUE NOT NULL,
		upvotes INTEGER DEFAULT 0,
		downvotes INTEGER DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
		modified_date TIMESTAMP
      )`,
	`DROP TABLE IF EXISTS comment;
		CREATE TABLE comment(
        comment_id SERIAL NOT NULL PRIMARY KEY,
		body VARCHAR(128) NOT NULL,
		user_id INTEGER REFERENCES users ON DELETE CASCADE,
		question_id INTEGER REFERENCES questions ON DELETE CASCADE,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      )`,
	`DROP TABLE IF EXISTS rsvp;
		CREATE TABLE rsvp(
        rsvp_id SERIAL NOT NULL PRIMARY KEY,
		user_id INTEGER REFERENCES users ON DELETE CASCADE,
		meetup_id INTEGER REFERENCES meetup ON DELETE CASCADE,
        response VARCHAR(128) NOT NULL, 
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      )`
];

for (let i = 0; i < TABLE.length; i += 1) {
	pool.query(TABLE[i]);
}
