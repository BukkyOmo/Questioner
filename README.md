# Questioner
Questioner is an app that crowd-sources questions for meetups.

[![Build Status](https://travis-ci.org/BukkyOmo/Questioner.svg?branch=server)](https://travis-ci.org/BukkyOmo/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/BukkyOmo/Questioner/badge.svg?branch=server&kill_cache=1")](https://coveralls.io/github/BukkyOmo/Questioner)
[![Maintainability](https://api.codeclimate.com/v1/badges/908298e713ba426ef975/maintainability)](https://codeclimate.com/github/BukkyOmo/Questioner/maintainability)


<h3>The UI Template</h3> 

The template for the front end application can be found here <a href="https://bukkyomo.github.io/Questioner/UI/indexpage.html">UI Template</a><br>

<h3>The Application<br></h3>

The main application is hosted here <a href="#">Questioner</a><br>


<h3>Pivotal Tracker Link</h3>
The Pivotal Tracker Story link can be found here<a href="https://www.pivotaltracker.com/n/projects/2232154">PT stories</a><br>

<h3>Number of API Endpoints</h3>
The API currently has 15 endpoints which is bound to increase.<br>

<h3>User Roles</h3><hr>
<h4>Register a User</h4><br>
A user can register so as to access to certain pages of the application by providing their firstname, lastname, username, email, phone Number...<br>The endpoint used here is POST api/v1/auth/signup<br>



<h4>Sign In a User</h4><br>
An already registered user can log into the Questioner application by just providing the correct email and password.<br>The endpoint used here is GET api/v1/auth/signin<br>



<h4>View all meetups</h4><br>
An existing user can view all available meetups on the Questioner application.<br>The endpoint for this is GET api/v1/meetups<br>



<h4>View a specific meetup<br>
A user can view all information about a particular endpoint.<br>The endpoint used here is api/v1/meetups/:meetupId<br>


<h4>Post a question</h4><br>
An existing user should be able to ask questions about an upcoming meetup. The endpoint used here is api/v1/meetups/:meetupId/questions<br>


<h4>View a question</h4><br>
An existing user can view a particular question that has been posted by either them or another user. The endpoint used here is api/v1/meetups/:meetupId/questions/:questionId<br>


<h4>Upvote a specific question</h4><br>
An existing user can upvote a particular question. The endpoint used here is api/v1/questions/:questionId/upvote.<br>


<h4>Downvote a question</h4><br>
An existing user can downvote a particular question. The endpoint used here is api/v1/questions/:questionId/downvote.<br>


<h4>User can reset password</h4><br>
An existing user should be able to reset their password if they cannot remember it. The endpoint used here is 
api/v1/auth/resetpassword.<br>


<h4>User can rsvp a meetup</h4><br>
An existing user can rsvp an upcoming meetup by stating either yes, no or maybe. The endpoint used here is api/v1/meetup/:meetupId/rsvp.<br>


<h4>User can comment on a question record</h4><br>
An existing user can make a comment on a user's question under a meetup record. The endpoint used here is api/v1/questions/:questionId.<br>

<h3>Admin Roles</h3><hr>
<h4>Admin can create a meetup</h4>
An admin can post a meetup record for users view and use. The endpoint used here is api/v1/meetups.<br>


<h4>Admin can delete a meetup</h4>
An admin can delete a meetup record, perhaps any meetup that has expired. The endpoint used here is api/v1/meetups/:meetupId.<br>


<h4>Admin can add images</h4><br>
An admin can add images to a meetup record. The endpoint used here is api/v1/meetups/:meetupId.<br>

<h4>Admin can add tags</h4>
An admin can add tags to a meetup record. The endpoint used here is api/v1/meetups/:meetupId.<br>