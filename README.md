# Speer Technologies - Backend Assessment
Youngjin Kwak.

Please let me know if you have any questions or concerns.
My email is kkan0615@gmail.com

## Setup
### Requirement
- Node.js > 20
- PostgresSQL

### How to start server
1. Install Node.js and Postgres SQL
2. Create Database
3. Create .env file under root directory with following options
```
DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
```
4. Run command "yarn install" to install all packages.
5. Run command "yarn build" to build the app.
   1. If you can see "dist" folder under root directory, it's successfully built.
6. Run command "yarn start" to run the app.
   1. If you can open with "localhost:8000", it's successfully running.

### Install Packages
```
yarn install
```

### Start development
```
yarn dev
```

### Start production
```
yarn build & yarn start
```

### Testing
```
yarn test
```

## Packages
### Framework
- Express.js
- Typescript
### Database
- PostgresSQL
- [Drizzle ORM](https://orm.drizzle.team/): Type based ORM
### Others
- [jest](https://jestjs.io/): Jest Library
- [jwt](https://jwt.io/): Json Web Token Library
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js): Hash the password
- [nodemon](https://nodemon.io/): reload, automatically. 
- [ts-node](https://typestrong.org/ts-node/): TypeScript execution and REPL for node.js

-------------

DUE DATE: 48 hours from when you start the assessment, however, if you require more time feel free to ask! Good luck!



Project Overview

You have been asked to build a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application should also allow users to share their notes with other users and search for notes based on keywords.



Technical Requirements

Implement a RESTful API using a framework of your choice (e.g. Express, DRF, Spring).
Use a database of your choice to store the data (preferably MongoDB or PostgreSQL).
Use any authentication protocol and implement a simple rate limiting and request throttling to handle high traffic.
Implement search functionality to enable users to search for notes based on keywords. ( preferably text indexing for high performance )
Write unit tests and integration tests your API endpoints using a testing framework of your choice.


API Endpoints

Your API should implement the following endpoints:

Authentication Endpoints

POST /api/auth/signup: create a new user account.
POST /api/auth/login: log in to an existing user account and receive an access token.
Note Endpoints

GET /api/notes: get a list of all notes for the authenticated user.
GET /api/notes/:id: get a note by ID for the authenticated user.
POST /api/notes: create a new note for the authenticated user.
PUT /api/notes/:id: update an existing note by ID for the authenticated user.
DELETE /api/notes/:id: delete a note by ID for the authenticated user.
POST /api/notes/:id/share: share a note with another user for the authenticated user.
GET /api/search?q=:query: search for notes based on keywords for the authenticated user.


Deliverables

A GitHub repository with your code.
A README file with
Details explaining the choice of framework/db/ any 3rd party tools.
instructions on how to run your code and run the tests.
Any necessary setup files or scripts to run your code locally or in a test environment.


Evaluation Criteria

Your code will be evaluated on the following criteria:

Correctness: does the code meet the requirements and work as expected?
Performance: does the code use rate limiting and request throttling to handle high traffic?
Security: does the code implement secure authentication and authorization mechanisms?
Quality: is the code well-organized, maintainable, and easy to understand?
Completeness: does the code include unit, integration, and end-to-end tests for all endpoints?
Search Functionality: does the code implement text indexing and search functionality to enable users to search for notes based on keywords?




-------------



Complete what you can from the assessment to the best of your ability and submit to https://docs.google.com/forms/d/e/1FAIpQLSeYU8P-RlgCcl8eI8vttI7AI-8OfywP-YFzkWzML_apXj4bSA/viewform?usp=sf_link.



Best of luck!