# Questioner
Questioner is an app that crowd-sources questions for meetups.

[![Build Status](https://travis-ci.org/BukkyOmo/Questioner.svg?branch=server)](https://travis-ci.org/BukkyOmo/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/BukkyOmo/Questioner/badge.svg?branch=server&kill_cache=1")](https://coveralls.io/github/BukkyOmo/Questioner)
[![Maintainability](https://api.codeclimate.com/v1/badges/908298e713ba426ef975/maintainability)](https://codeclimate.com/github/BukkyOmo/Questioner/maintainability)


The UI Template 

The template for the front end application can be found here <a href="https://bukkyomo.github.io/Questioner/UI/indexpage.html">UI Template</a><br>

The Application<br>
The main application is hosted here <a href="">Questioner<br>

The Pivotal Tracker Story link can be found here <a href="https://www.pivotaltracker.com/n/projects/2232154">PT stories</a><br>

The API currently has 7 endpoints which is bound to increase.<br>

User Roles<hr>
Register a User<br>
A user can register so as to access to certain pages of the application by providing their firstname, lastname, username, email, phone Number...<br>The endpoint used here is POST api/v1/auth/signup<br>
Sign In a User<br>
An already registered user can log into the Questioner application by just providing the correct email and password.<br>The endpoint used here is GET api/v1/auth/signin<br>
View all meetups<br>
An existing user can view all available meetups on the Questioner application.<br>The endpoint for this is GET api/v1/meetups<br>
View a specific endpoint<br>
A user can view all information about a particular endpoint.<br>The endpoint used here is api/v1/meetups/:meetupId<br>
Post a question<br>
An existing user should be able to ask questions about an upcoming meetup. The endpoint used here is api/v1/meetups/:meetupId/questions<br>
View a question<br>
An existing user can view a particular question that has been posted by either them or another user