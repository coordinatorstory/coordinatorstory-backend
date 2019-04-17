# OurStory back-end

A rest API built with Express.

Deployed at [https://ourstory-api.herokuapp.com/api/](https://ourstory-api.herokuapp.com/api/)

[Documentation for the API](/docs/api.md)

## Lambda School build week, April 15th 2019

> You will use your skills to be responsible for the back-end architecture of this project. You will work closely with your Front End Architect and your Scrum Master in order to discover project needs and deliver working Endpoints for your application.

## Implemented features

- Visitors can view a list of stories, organized by country
- Coordinators can create an account
- Coordinators can login and view their stories
- Coordinators can create, update, and delete stories

## Technologies and concepts

- RESTful web APIs built with JavaScript, Express, and Node
- Middleware for security, logging, request parsing, and authentication
- Server-side routing with protected routes
- Authentication via JSON web tokens
- Data modeling and relational databases
- Database migrations and seeding
- SQL queries for accessing, inserting, and modifying data with Knex
- Request validation with Joi
- Separate environments for development, testing, and production
- Test-driven development and automated testing with Jest
- Secrets management with environment variables
- Git flow for organizations
- Automatic continuous deployment
- API documentation

## Takeaways

- Using TDD has been a boon for me this build week. I love the security of being able to make a change to my code and have the tests run automatically and then see immediately that the changes didn't cause any regressions. Writing tests first takes some getting used to, and I frequently had to go back and fix the test code after implementing the functionality that I was testing, but the additional time and effort up front makes development relatively breezy. No need to poke around in the browser or a REST client after every code change. Testing the back-end is much more straight-forward than UI testing.
- As usual, it's been great to see all the things we've learned over the past month being used together to build a complete solution. I've been able to eliminate some blind spots in my mind about how exactly an app gets staged, tested, and deployed.
- Writing documentation is a lot of work! Even for something as simple as this app, with a handful of endpoints, it takes time to put everything down in a easy-to-digest format. It's also absolutely essential for an API since the consumer has no UI to provide clues on how to use the app. No one can use what you've built without the docs.
- I found back-end development to be a vacation compared to building the client app. The volume of code lines written is probably a third of the what I wrote for the client SPA during last build week, with the two projects being comparable in complexity.
- Continuous automatic deployment is a dream. Just push to `master` and call it a day. I'll be using this whenever I can in the future.
- There is so much that can be done with middleware. I'd like to explore if there is a way to more easily handle errors in a global way instead of using a try/catch in every endpoint function. The nested try/catch and if/else statements, sometimes with four different logical code paths, all in one function immediately seems like a code smell to me. My instinct is that there should be a better way to do it, but I'll have to investigate further.
