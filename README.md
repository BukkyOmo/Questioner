# Questioner
Questioner is an app that crowd-sources questions for meetups. It allows meetup organizers to prioritize the questions to be answered. Users of this platform can upvote or downvote a question. The questions however, are ranked according to their votes.

[![Build Status](https://travis-ci.org/BukkyOmo/Questioner.svg?branch=develop)](https://travis-ci.org/BukkyOmo/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/BukkyOmo/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/BukkyOmo/Questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/908298e713ba426ef975/maintainability)](https://codeclimate.com/github/BukkyOmo/Questioner/maintainability)

<h3>The UI Template</h3> 

The template for the front end application can be found here <a href="https://bukkyomo.github.io/Questioner/UI/index.html">UI Template</a><br>

<h3>The Application</h3>
Questioner is an application that crowd-sources questions for meetups. It allows meetup organizers to prioritize the questions to be answered by allowing users of this platform to view a meetup, ask questions they would like to be answered during the meetup and other users can upvote or downvote a question. The questions however, are ranked according to their votes, the top questions are answered by the organizer during the meetup.

The main application is hosted here <a href="https://bukkyomo-questioner.herokuapp.com/api/v1">Questioner</a><br>

<h3>Getting Stated</h3>
<hr>

Technologies used in building this project

- Node
- Express
- Gulp for scripts automation
- PostgreSQL
- TravisCI
- JenkinsCI
- Docker
- Code Climate
- Coveralls
- Mocha, Chai and Chai-Http for integration testing
- Sinon for unit testing
- AWS RDS
- Cloudinary
- Heroku and AWS Elastic Beanstalk

<hr>

Getting Started

<a href="nodejs.org">Node</a>

<a href="npm.com">NPM</a>

<h3>To download dependencies</h3>
npm install

<h3>To start application</h3>
npm start

<h3>To run tests</h3>
npm test

<hr>

<h3>Pivotal Tracker Link</h3>
The Pivotal Tracker Story link can be found here <a href="https://www.pivotaltracker.com/n/projects/2232154">PT stories</a><br>

<h3>API Documentation</h3>
The documentation to this API can be found here <a href="https://app.swaggerhub.com/apis/BukkyO/Questioner/1.0.0">API Documentation</a><br>

<hr>
Endpoints
<h3>User Roles</h3><hr>
<h4>Register a User</h4>
A user can register so as to access to certain pages of the application by providing their username, email, and password while also confirming the provided password<br>The endpoint used here is POST api/v1/auth/signup<br>

<h4>Sign In a User</h4>
An already registered user can log into the Questioner application by just providing the correct email and password.<br>The endpoint used here is GET api/v1/auth/signin<br>

<h4>Reset Password</h4>
A user can reset their password by sending their email, email is verified and user is allowed to reset their password.

<h4>View all meetups</h4>
An existing user can view all available meetups on the Questioner application.<br>The endpoint for this is GET api/v1/meetups<br>

<h4>View a specific meetup</h4>
A user can view all information about a particular endpoint.<br>The endpoint used here is api/v1/meetups/:id<br>

<h4>Post a question</h4>
An existing user should be able to ask questions about an upcoming meetup. The endpoint used here is api/v1/questions<br>

<h4>View a question</h4>
An existing user can view a particular question that has been posted by either them or another user. The endpoint used here is api/v1/questions/:id<br>

<h4>View all questions that have been asked under a specific meetup</h4>
An existing user can view all questions that users have asked concerning a specific meetup. The endpoint here is api/v1/meetups/:id/questions<br>

<h4>Upvote a specific question</h4>
An existing user can upvote a particular question. The endpoint used here is api/v1/questions/:questionId/upvote.<br>

<h4>Downvote a question</h4>
An existing user can downvote a particular question. The endpoint used here is api/v1/questions/:questionId/downvote.<br>

<h4>User can reset password</h4>
An existing user should be able to reset their password if they cannot remember it. The endpoint used here is 
api/v1/auth/resetpassword.<br>

<h4>User can rsvp a meetup</h4>
An existing user can rsvp an upcoming meetup by stating either yes, no or maybe. The endpoint used here is api/v1/meetup/:meetupId/rsvp.<br>

<h4>User can comment on a question record</h4>
An existing user can make a comment on a user's question under a meetup record. The endpoint used here is api/v1/questions/:questionId.<br>

<h3>Admin Roles</h3><hr>
<h4>Admin can create a meetup</h4>
An admin can post a meetup record for users view and use. The endpoint used here is api/v1/meetups.<br>

<h4>Admin can delete a meetup</h4>
An admin can delete a meetup record, perhaps any meetup that has expired. The endpoint used here is api/v1/meetups/:meetupId.<br>

<h4>Admin can add images</h4>
An admin can add images to a meetup record. The endpoint used here is api/v1/meetups/:meetupId.<br>

<h4>Admin can add tags</h4>
An admin can add tags to a meetup record. The endpoint used here is api/v1/meetups/:meetupId.<br>
<hr>

<h3>Author : Bukola Omosefunmi</h3>
