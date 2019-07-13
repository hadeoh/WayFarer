[![Build Status](https://travis-ci.com/hadeoh/WayFarer.svg?branch=develop)](https://travis-ci.com/hadeoh/WayFarer)  [![Maintainability](https://api.codeclimate.com/v1/badges/f854c4402c2f97b0c469/maintainability)](https://codeclimate.com/github/hadeoh/WayFarer/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/f854c4402c2f97b0c469/test_coverage)](https://codeclimate.com/github/hadeoh/WayFarer/test_coverage)  [![Coverage Status](https://coveralls.io/repos/github/hadeoh/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/hadeoh/WayFarer?branch=develop)
# WayFarer
WayFarer is a public bus transportation booking server.

## Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker. You can find the template at https://www.pivotaltracker.com/n/projects/2359689

## API Deployment
API is deployed [here](https://wayfarer1960.herokuapp.com)

## API Documentation
The documentation for API is [here](https://app.swaggerhub.com/apis/hadeoh/wayfarer/1.0)

## Built with
- NodeJS
- ExpressJS
- Postgres
- HTML
- CSS
- JavaScript

## Getting Started

### Installation
- Clone this repository using git clone https://github.com/hadeoh/WayFarer.git .
- Use the .env.example file to setup your environmental variables and rename the file to .env
- Run npm install to install all dependencies
- Run npm start to start the server

### Supporting Packages

#### Linter
- [ESLint](https://eslint.org/)

#### Compiler
- [Babel](https://babeljs.io/)

#### Test Tools
- [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
- [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
- [Chai-http](http://chaijs.com/) - A Chai plugin for testing node.js HTTP servers
- [Istanbul(nyc)](http://chaijs.com/) - Code Coverage Generator

### Testing 
- Run test
  `npm test`

- Run coverage report
  `npm run coverage`


## API Routes
| Description               | HTTP Methods  | Routes                        |
|:-------------------------:|:-------------:|:-----------------------------:|
| Create a user account     | POST          | api/v1/auth/signup            |
| Log in a user             | POST          | api/v1/auth/signup            |
| Create a bus              | POST          | api/v1/buses                  |
| Create a trip             | POST          | api/v1/trips                  |
| Get all trips             | GET           | api/v1/trips                  |
| Book seat on a trip       | POST          | api/v1/bookings               |
| View all bookings         | GET           | api/v1/bookings               |
| Delete a booking          | DELETE        | api/v1/bookings/:bookingId    |
| Cancel a trip             | PATCH         | api/v1/trips/:tripId          |

## Project References
- I learnt how to build and structure my project backend with this tutorial by Bolaji Olajide - https://www.youtube.com/watch?v=WLIqvJzD9DE
- I found this article by Olawale Aladeusi very helpful while setting up my database - https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
- Huge Appreciation to Abass Ajanaku for letting me use his project for reference - https://github.com/fxola/Banka
- Stack Overflow