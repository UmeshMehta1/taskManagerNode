const { users } = require("../model/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");


exports.registerUser = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    console.log(email, username, password, confirmPassword);

    if (password !== confirmPassword) {
      return res.send("Password and confirmPassword don't match");
    }

    // Using User.create instead of users.create
    await users.create({
      email,
      password: bcrypt.hashSync(password, 8),
      username,
    });

    // Handle successful registration, e.g., redirect or send a success response
    res.status(200).send("User registered successfully");
  } catch (err) {
    // Handle errors, e.g., send an error response or log the error
    console.error(err);
    res.status(500).send("Internal Server Error",err);
  }
};

// LOGIN Starts from here

exports.renderLoginForm = (req, res) => {
  res.send({ message: "Login" });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // SERVER SIDE VALIDATION
    if (!email || !password) {
      return res.send("Email and password are required");
    }

    // check if that email exists or not
    const associatedDataWithEmail = await users.findOne({
      where: {
        email,
      },
    });

    if (!associatedDataWithEmail) {
      return res.send("User with that email doesn't exist");
    }

    // check if password also matches
    const isMatched = bcrypt.compareSync(
      password,
      associatedDataWithEmail.password
    );

    if (isMatched) {
      // Generate a new access token with the user ID
      const token = jwt.sign(
        { id: associatedDataWithEmail.id }, // Use user ID instead of the whole data
        process.env.SECRETKEY,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("token", token, {
        secure: true,
        expire: 120,
      });

      res.json({ accessToken: token, message: "Logged In success" });
    } else {
      res.send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

