import pool from './connection';

pool.query(`DROP TABLE IF EXISTS users CASCADE;
		CREATE TABLE users(
        id SERIAL NOT NULL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        username VARCHAR(128) UNIQUE NOT NULL,
		phoneNumber VARCHAR(20),
		email VARCHAR(128) UNIQUE NOT NULL,
		password VARCHAR NOT NULL,
		isadmin BOOLEAN,
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      );
	DROP TABLE IF EXISTS meetup CASCADE;
		CREATE TABLE meetup(
        id SERIAL NOT NULL PRIMARY KEY,
		users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        topic VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        happeningOn TIMESTAMP NOT NULL,
        images VARCHAR(128),
		tags VARCHAR(128),
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      );
      DROP TABLE IF EXISTS questions CASCADE;
		CREATE TABLE questions(
        id SERIAL NOT NULL PRIMARY KEY,
		createdBy INTEGER,
		meetup_id INTEGER REFERENCES meetup(id) ON DELETE CASCADE,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) NOT NULL,
		upvotes INTEGER DEFAULT 0,
		downvotes INTEGER DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
		modified_date TIMESTAMP
      );
      DROP TABLE IF EXISTS comment CASCADE;
		CREATE TABLE comment(
        id SERIAL NOT NULL PRIMARY KEY,
		body VARCHAR(128) NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
		question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      );
      DROP TABLE IF EXISTS rsvp CASCADE;
		CREATE TABLE rsvp(
        id SERIAL NOT NULL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
		meetup_id INTEGER REFERENCES meetup(id) ON DELETE CASCADE,
        response VARCHAR(128) NOT NULL,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP
      );
      `
    );
