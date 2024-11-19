const express = require("express");
const User = require("../modal/authModal");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(bodyParser.json());
app.use(cors());

const forgetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    console.log("Request received for email:", email); // Log the incoming email
  
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log("User not found with email:", email); // Log when user is not found
        return res.status(404).json({ message: "User does not exist" });
      }
  
      console.log("User found:", user); // Log the found user object
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      console.log("Password updated successfully for:", user.email); // Log successful password update
  
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error); // Log any errors during the process
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports = { forgetPassword };