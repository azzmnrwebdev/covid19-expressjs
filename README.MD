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

1. Clone this repository with

    HTTPS:
    ```bash
    git clone https://github.com/azzmnrwebdev/covid19-expressjs.git
    ```

    SSH:
    ```bash
    git@github.com:azzmnrwebdev/covid19-expressjs.git
    ```

2. Run `npm install` to install all dependencies and packages.
3. Copy the `.env.example` file and paste the copied file. Rename the pasted file to `.env`.
4. Edit the required environment configuration in the `.env` file.

    Example:
    ```bash
    # Application Configuration
    APP_PORT=5000

    # Database Configuration
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=
    DB_DATABASE=covid19-express
    DB_CONNECTION=mysql
    ```

5. Put a free value in the `TOKEN_KEY` environment variable in the `.env` file as the secret key to sign the token.

    Example:
    ```bash
    TOKEN_KEY=secret123
    ```

6. Create a database that matches the database name in the environment configuration file.
7. Run this command `sequelize db:migrate` for the migration process.
8. Run `npm start` and enjoy!!

## API Usage

1.  Register

    Request:
    ```http
    POST http://localhost:5000/api/user/register

    Body:

    {
        "fullName" : "John Doe",
        "userName" : "johndoe",
        "email"    : "johndoe@gmail.com",
        "password" : "johndoe123"
    }
    ```

2.  Login

    Request:
    ```http
    POST http://localhost:5000/api/user/login

    Body:

    {
        "email"    : "johndoe@gmail.com",
        "password" : "johndoe123"
    }
    ```

3.  Get All Patient

    Request:
    ```http
    GET http://localhost:5000/api/patients
    ```

4. Create Patient

    Headers:
    | Key | Value | Description |
    |-----|-------|-------------|
    | Accept | application/json |  |
    | X-Access-Token | `token_login` |  |

    Request:
    ```http
    POST http://localhost:5000/api/patients

    Body:

    {
        "name" : "Fajar Kurniawan",
        "phone" : "0812345678953",
        "address" : "Jakarta Timur",
        "status" : "positive",
        "in_date_at" : "2023-04-10"
    }
    ```
    NB: Patient status can be filled with positive values, dead, and recovered. If the patient status is positive then the `out_date_at` key in the JSON data does not need to be filled in.

5. Detail Patient

    Request:
    ```http
    GET http://localhost:5000/api/patients/{id}
    ```

6. Update Patient

    Headers:
    | Key | Value | Description |
    |-----|-------|-------------|
    | Accept | application/json |  |
    | X-Access-Token | `token_login` |  |

    Request:
    ```http
    PUT http://localhost:5000/api/patients/{id}

    Body:

    {
        "status" : "recovered",
        "out_date_at": "2023-06-25"
    }
    ```

7. Get Patient Positive

    Request:
    ```http
    GET http://localhost:5000/api/patients/status/positive
    ```

8. Get Patient Dead

    Request:
    ```http
    GET http://localhost:5000/api/patients/status/dead
    ```

10. Get Patient Recovered

    Request:
    ```http
    GET http://localhost:5000/api/patients/status/recovered
    ```

11. Get Patient By Name

    Request:
    ```http
    GET http://localhost:5000/api/patients/search/{name}
    ```

12. Delete Patient

    Headers:
    | Key | Value | Description |
    |-----|-------|-------------|
    | Accept | application/json |  |
    | X-Access-Token | `token_login` |  |

    Request:
    ```http
    DELETE http://localhost:5000/api/patients/{id}
    ```

## Documentation Postman

https://documenter.getpostman.com/view/29602079/2s9YC1WEdL