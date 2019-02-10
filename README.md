# Questioner
Questioner is an app that crowd-sources questions for meetups.

[![Build Status](https://travis-ci.org/BukkyOmo/Questioner.svg?branch=develop)](https://travis-ci.org/BukkyOmo/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/BukkyOmo/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/BukkyOmo/Questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/908298e713ba426ef975/maintainability)](https://codeclimate.com/github/BukkyOmo/Questioner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/908298e713ba426ef975/test_coverage)](https://codeclimate.com/github/BukkyOmo/Questioner/test_coverage)

<h3>The UI Template</h3> 

The template for the front end application can be found here <a href="https://bukkyomo.github.io/Questioner/UI/indexpage.html">UI Template</a><br>

<h3>The Application</h3>
Questioner is an application that crowd-sources questions for meetups. It allows meetup organizers to prioritize the questions to be answered. And users of this platform can upvote or downvote a question. The questions however, are ranked according to their votes.

The main application is hosted here <a href="https://bukkyomo-questioner.herokuapp.com/api/v1">Questioner</a><br>

<h3>Getting Stated</h3>
<hr>

The tools to get started are

<a href="nodejs.org">Node</a>

<a href="npm.com">NPM</a>

<h3>To download dependencies</h3>
npm install

<h3>To start application</h3>
npm start

<h3>To run tests</h3>
npm run test


<h3>Pivotal Tracker Link</h3>
The Pivotal Tracker Story link can be found here<a href="https://www.pivotaltracker.com/n/projects/2232154">PT stories</a><br>

<h3>API Documentation</h3>
The documentation to this API can be found here<a href="https://app.swaggerhub.com/apis/Bukstech/Questioner/1.0.0-oas3">API Documentation</a><br>

<h3>Number of API Endpoints</h3>
The API currently has 15 endpoints which is bound to increase.<br>

<h3>User Roles</h3><hr>
<h4>Register a User</h4>
A user can register so as to access to certain pages of the application by providing their firstname, lastname, username, email, phone Number...<br>The endpoint used here is POST api/v1/auth/signup<br>



<h4>Sign In a User</h4>
An already registered user can log into the Questioner application by just providing the correct email and password.<br>The endpoint used here is GET api/v1/auth/signin<br>



<h4>View all meetups</h4>
An existing user can view all available meetups on the Questioner application.<br>The endpoint for this is GET api/v1/meetups<br>



<h4>View a specific meetup</h4>
A user can view all information about a particular endpoint.<br>The endpoint used here is api/v1/meetups/:meetupId<br>


<h4>Post a question</h4>
An existing user should be able to ask questions about an upcoming meetup. The endpoint used here is api/v1/meetups/:meetupId/questions<br>


<h4>View a question</h4>
An existing user can view a particular question that has been posted by either them or another user. The endpoint used here is api/v1/meetups/:meetupId/questions/:questionId<br>


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

<h3>Dependencies</h3>
<ul>
	<li>Express JS: Web application framework for Node.js.</li>
	<li>Body-Parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property</li>
	<li>Babel: The compiler for writing next generation JavaScript.</li>
	<li>Morgan: HTTP Request logger middleware for nodejs</li>
	<li>Chai: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.</li>
</ul>

<h3>Dev Dependencies</h3>
<ul>
	<li>Coveralls: takes json-cov output into stdin and POSTs to coveralls.io</li>
	<li>eslint: An AST-based pattern checker for JavaScript.</li>
	<li>expect: This package exports the `expect` function used in [Jest](https://jestjs.io/)\. You can find its documentation [on Jest's website](https://jestjs.io/docs/en/expect.html)\.</li>
	<li>Mocha: simple, flexible, fun test framework</li>
	<li>Istanbul: Yet another JS code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests. Supports all JS coverage use cases including unit tests, server side functional tests</li>
	<li>nyc: the Istanbul command line interface</li>
</ul>
