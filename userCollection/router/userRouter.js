const express = require('express');
const {saveUserData, getUserData, getUserDatanew, deleteData  } = require('../contollers/userController');
const verifyToken = require('../middleware/authMiddleware')
// const {generateNewPDF} = require('../contollers/pdfController')
const {loginData, token} = require('../contollers/AuthController');
const { signup } = require('../contollers/SignupController');
// const { reset, authenticateUser } = require('../contollers/resetController');
const { forgetPassword } = require('../contollers/forgotPasswordController');
// const {forgetPassword} =require('../')



const router = express.Router();

router.post('/submit-data', verifyToken, saveUserData);
router.get('/get-data/:id', getUserData);
router.get('/get-newdata', verifyToken, getUserDatanew);
router.post('/login', loginData);
router.delete('/delete-user/:id', verifyToken, deleteData);
router.post('/signup', signup);
router.post("/forgot-password", forgetPassword)

module.exports = router;