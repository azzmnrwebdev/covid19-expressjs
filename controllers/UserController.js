const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
const Response = require("./res/Response");

class UserController {
  async register(req, res) {
    try {
      const { fullName, userName, email, password } = req.body;

      // Validate user input
      if (!(email && password && fullName && userName)) {
        return res.status(422).json({
          success: false,
          message: "All input is required",
        });
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await models.User.findOne({ where: { email } });
      if (oldUser) {
        return res.status(409).json({
          success: false,
          message: "User Already Exist. Please Login",
        });
      }

      // Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await models.User.create({
        fullName,
        userName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // create a token when registering
      const token = jwt.sign({ id: user.id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      // store tokens
      user.token = token;

      // response if the account is successfully created
      return res.status(201).json({
        success: true,
        message: "Account has been successfully created!",
        data: user,
      });
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        return res.status(400).json({
          success: false,
          message: "All input is required",
        });
      }

      // Validate if user exist in our database
      const user = await models.User.findOne({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        // create a token when logging in
        const token = jwt.sign({ id: user.id, email }, process.env.TOKEN_KEY, {
          expiresIn: "2h",
        });

        // store tokens
        user.token = token;

        // response login successful
        return res.status(200).json({
          success: true,
          message: "Login successfully",
          data: user,
        });
      }

      // response login failed
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }
}

const User = new UserController();

module.exports = User;
