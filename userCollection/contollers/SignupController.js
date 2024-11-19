const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('../modal/authModal');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    
    res.status(201).json({
      message: "Signup successful",
      userId: newUser._id,
      username: newUser.username,  // You can shorthand this as well
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup };
