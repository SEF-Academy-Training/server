const asyncHandler = require('express-async-handler');
const Service = require('../models/service.model');
// const crypto = require('crypto');
const { User } = require('../models/user.model');
const { paginate } = require('../utils/pagination');
const { generateSerialCode } = require('../utils/generateSerialCode');
// const randomString = crypto.randomBytes(4).toString('hex');

exports.CreateService = asyncHandler(async (req, res) => {
	console.log('req.body', req.body);
	const _id = req.user?._id;

	const newService = await Service.create({
		code: await generateSerialCode(Service),
		...req.body,
		created_by: _id,
	});

	if (!newService) {
		return res
			.status(400)
			.send({ success: false, message: 'Something went wrong while create Service' });
	}

	const updateUserServices = await User.findByIdAndUpdate(_id, {
		$push: { services: newService._id },
	});
	if (!updateUserServices) {
		await Service.deleteOne({ _id: newService._id });
		return res
			.status(400)
			.send({ success: false, message: 'Something went wrong while create Service' });
	}

	res.status(201).send({
		success: true,
		data: newService,
		message: 'Service was created successfully',
	});

	// const { id, code, title, userId, status, minston } = req.body;
	// const newService = new Service({
	// 	id,
	// 	code: randomString,
	// 	title,
	// 	userId,
	// 	status,
	// 	minston,
	// });
	// if (!newService)
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: 'Something went wrong while create Service',
	// 	});

	// await newService.save();
	// const user = await User.findById(created_by);
	// user.services.push(newService._id);
	// await user.save();
	// console.log(user);
	// res.status(201).json({
	// 	success: true,
	// 	data: newService,
	// 	message: 'Service was created successfully',
	// });
});

exports.updateService = asyncHandler(async (req, res) => {
	const _id = req.params.id;
	const updatedService = await Service.findByIdAndUpdate(
		{ _id },
		{ ...req.body },
		{
			new: true,
			runValidators: true,
		}
	);
	if (!updatedService) {
		return res.status(404).json({ success: false, error: 'Service not found' });
	}

	res.status(200).send({
		success: true,
		data: updatedService,
		message: 'Service was updated successfully',
	});
});

exports.getService = asyncHandler(async (req, res) => {
	const _id = req.params.id;
	let queryRole = {};
	if (req.user.role == 'Admin') {
		queryRole = {};
	} else {
		queryRole = { created_by: req.user?._id };
	}
	const service = await Service.findOne({ _id, ...queryRole }).populate('papers');
	if (!service)
		return res.status(404).json({
			success: false,
			message: 'Something went wrong while get Service',
		});
	res.status(201).json({
		success: true,
		data: service,
	});
});

exports.getAllServices = asyncHandler(async (req, res) => {
	console.log('req.user?._id', req.user?._id);
	let queryRole = {};
	if (req.user.role == 'Admin') {
		queryRole = {};
	} else {
		queryRole = { created_by: req.user?._id };
	}

	const populateRole = { path: 'created_by', select: 'userName paper _id' };
	const { error, data, pagination } = await paginate(
		Service,
		req,
		queryRole,
		populateRole
	);
	if (error) return res.status(404).json({ success: false, error });
	res.status(200).json({ success: true, pagination, data });
});

exports.deleteService = asyncHandler(async (req, res) => {
	console.log(req.params.id);
	const service = await Service.findByIdAndDelete(req.params.id);

	if (!service) {
		return res.status(404).json({ success: false, error: 'Service not found' });
	}

	return res.status(204).json();
});

exports.getAllServicesForUser = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	console.log(userId);
	// const user = await User.findById({ _id: userId }).populate('services');

	// if (!user) {
	// 	return res.status(404).json({
	// 		success: false,
	// 		message: 'User not found',
	// 	});
	// }
	// if (user.role !== 'User') {
	// 	return res.status(403).json({
	// 		success: false,
	// 		message: 'Access denied. User does not have the required role.',
	// 	});
	// }

	res.status(200).json({
		success: true,
		data: user.services,
		message: 'Services retrieved successfully for the user',
	});
});
