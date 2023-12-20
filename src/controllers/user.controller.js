const { User } = require('../models/user.model');
const { paginate } = require('../utils/pagination');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
module.exports = {
	getAllUsersCtrl: asyncHandler(async (req, res) => {
		const { error, data, pagination } = await paginate(User, req);
		if (error) return res.status(404).json({ success: false, error });
		res.status(200).json({ success: true, pagination, data });
	}),
	getOneUserCtrl: asyncHandler(async (req, res) => {
		const user = await User.findOne({ _id: req.params.id });
		if (!user)
			return res.status(404).json({ success: false, error: 'user not found.' });
		res.status(200).json({ success: true, data: user });
	}),
	createByAdminCtrl: asyncHandler(async (req, res) => {
		const { userEmail } = req.body;
		const existingUser = await User.findOne({ $or: [{ userEmail }] });
		if (existingUser)
			return res.status(400).json({
				success: false,
				error: `This ${
					existingUser.userEmail === userEmail ? 'userEmail' : 'MobileNumber'
				} already in use ..!`,
			});

		if (userEmail) {
			const user = await User.exists({ userEmail });
			if (user)
				return res
					.status(400)
					.json({ success: false, error: 'User Email already in use.' });
		}
		const totalUsers = await User.countDocuments();

		const newUser = new User({ ...req.body, userNumber: totalUsers + 1 });
		await newUser.save();
		res.status(201).json({ success: true, data: newUser });
	}),
	updateByAdminCtrl: asyncHandler(async (req, res) => {
		const { password, userEmail } = req.body;
		let user = await User.findById(req.params.id);
	  
		if (!user) {
		  return res.status(404).json({ success: false, error: 'User not found' });
		}
	  
		// Check if the provided email is already in use by another user
		if (userEmail && user.userEmail !== userEmail) {
		  const existingUser = await User.findOne({ userEmail });
	  
		  if (existingUser) {
			return res.status(400).json({
			  success: false,
			  error: 'Email already in use by another user.',
			});
		  }
		}
	  
		if (password) {
		  const genSalt = await bcrypt.genSalt(10);
		  const hash = await bcrypt.hash(password, genSalt);
		  req.body.password = hash;
		}
	  
		const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
		  new: true,
		});
	  
		res.status(200).json({ success: true, data: updatedUser });
	  }),
	  
	updateUserProfileCtrl: asyncHandler(async (req, res) => {
		console.log('req.file', req.file);
		if (req.file) req.body.profileImage = `users/${req.file.filename}`;
		if (req.body.mobileNumber) {
			const existingUser = await User.findOne({
				_id: { $ne: req.user._id },
				$or: [{ mobileNumber: req.body.mobileNumber }],
			});
			if (existingUser)
				return res
					.status(400)
					.json({ success: false, error: `This MobileNumber already in use ..!` });
		}
		const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
			new: true,
		});
		if (!updatedUser)
			return res.status(404).json({ success: false, error: 'user not found.' });
		res.status(200).json({ success: true, data: updatedUser });
	}),
	deleteUserCtrl: asyncHandler(async (req, res) => {
		const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
		if (!deletedUser)
			return res.status(404).json({ success: false, error: 'user not found.' });
		res.status(200).json({ success: true, data: deletedUser._id });
	}),
};
