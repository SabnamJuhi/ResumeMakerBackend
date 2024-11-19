const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../modal/authModal");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const loginData = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received credentials:', { email, password });

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token expiration time (adjust as needed)
      }
    );

    // const receivedToken = token;

// // Set the token in localStorage
// localStorage.setItem('token', receivedToken);

const userWithoutPassword = {
    id: user.id,
    email: user.email,
  };

  res.json({ token, user: userWithoutPassword });

    // res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginData };
