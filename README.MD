# RESTful API with NodeJS with ExpressJS and Sequelize

build RESTful API with [NodeJS](https://nodejs.org), [ExpressJS](https://expressjs.com/), [Express Validator](https://express-validator.github.io/docs/), [Sequelize](https://sequelize.org/) & [JSON Web Token](https://jwt.io/)

## Description

This project is an implementation of a web service API based on a mini project assignment on campus. This service was built using Express JS technology and applies the RESTful API concept and authentication using JWT (JSON Web Token).

## Main Feature

- Authentication feature
- CRUD features (create, read, update, delete)
- Positive patient data search feature
- Dead patient data search feature
- Data search feature for recovered patients
- Data search feature based on patient name keywords

## Tools yang digunakan

- ExpressJS
- Dotenv
- Sequelize
- Mysql2
- Express Validator
- Nodemon
- JSON Web Token
- Body Parser **(Optional)**
- Serve Favicon **(Optional)**

## Installation

Here are the steps to install and run this project:

1. Clone this repository

   HTTPS:
    ```bash
   git clone https://github.com/azzmnrwebdev/covid19-expressjs.git
   ```

   SSH:
    ```bash
   git@github.com:azzmnrwebdev/covid19-expressjs.git
   ```
2. Run `npm install` to install all dependencies and packages
3. Copy the `.env.example` file and paste it, then change the name of the copied file to `.env`. Set the environment configuration by editing the `.env` file.
4. Create a database that matches the database name in the environment configuration file.
5. Run this command `sequelize db:migrate` for the migration process.
6. Run `npm start` and enjoy!!

## Use

## Use of Postman

## Documentation Postman

https://documenter.getpostman.com/view/29602079/2s9YC1WEdL