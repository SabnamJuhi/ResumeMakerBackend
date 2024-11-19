// const express = require("express");
// const User = require("../modal/userModal");
// const bcrypt = require("bcrypt");


// const forgetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;

//   console.log("email", email, "newPassword", newPassword);
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User Does not Exist" });
//     }
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     // Update the user's password
//     user.password = hashedPassword;
//     await user.save();

//     // await UpdatedUser.save();
//     res.json({message: "Password Updated Successfully"})
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = { forgetPassword };