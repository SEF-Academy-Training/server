const { User } = require("../models/user.model");
const asyncHandler = require('express-async-handler'); 
const jwt = require('jsonwebtoken')

module.exports = {
      registerCtrl : asyncHandler(async (req, res) => {
        const { userEmail } = req.body;
      
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ userEmail });
      
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'User with this email already exists.' });
        }
      
        try {
          // Find the total number of users
          const totalUsers = await User.countDocuments();
      
          // Create a new user with the generated user number
          const newUser = new User({ ...req.body, userNumber: totalUsers + 1 });
      
          // Save the new user to the database
          await newUser.save();
      
          res.status(201).json({ success: true, message: 'Account successfully created. Please login.' });
        } catch (error) {
          // Handle any errors that occur during the save operation
          console.error(error);
          res.status(500).json({ success: false, message: 'Internal server error.' });
        }
      }) ,
      

    loginCtrl: asyncHandler(async (req, res) => {
        const { userEmail, password } = req.body;
        const userExist = await User.findOne({ userEmail });
        if (!userExist) return res.status(404).json({ success: false, error: "User not found." });
        if (userExist.accountStatus === "Inactive") return res.status(403).json({ success: false, message: "User Account is inActive" })
        const matchPassword = await userExist.comparePassword(password);
        if (!matchPassword) return res.status(400).json({ success: false, error: "Incorrect password. Please check your password and try again." });
        const { accessToken, refreshToken } = userExist.generateTokens();
        res.cookie('accessToken', accessToken, {withCredentials: true, httpOnly: false,});
        res.cookie('refreshToken', refreshToken, {withCredentials: true, httpOnly: false, });
        res.status(200).json({ success: true, data: userExist });
    }),




    logoutCtrl: asyncHandler(async (req, res) => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.send({ success: true });
    }),




    getCurrentUserCtrl: asyncHandler(async (req, res) => {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).json({ success: false, error: "user not found." })
        res.status(200).json({ success: true, data: user });
    }),




    refreshAccessTokenCtrl: asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ success: false, error: 'No token provided' });
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (decoded.exp < Date.now() / 1000) return res.status(401).json({ success: false, error: 'your session is expired please login again' });
        const user = await User.findOne({ _id: decoded._id });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        const { accessToken } = await user.generateTokens(user);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(200).json({ success: true });
    })
}