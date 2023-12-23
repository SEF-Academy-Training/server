const OurService = require('../models/ourService.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination');

const ourServiceController = {
	getAllOurServices: asyncHandler(async (req, res) => {
		console.log('req.body', req.body);
		const { error, data, pagination } = await paginate(OurService, req);
		if (error) {
			return res.status(404).send({ success: false, error });
		}

		res.status(200).send({ success: true, data, pagination });
	}),

	getOurService: asyncHandler(async (req, res) => {
		const ourService = await OurService.findOne({ _id: req.params.id });
		if (!ourService) {
			return res.status(404).send({ success: false, error: 'OurService not found' });
		}

		res.status(200).send({ success: true, data: ourService });
	}),

	createOurService: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/ourServices/${req.file.filename}`;
		}

		const newOurService = await OurService.create(req.body);

		if (!newOurService) {
			return res.status(400).send({
				success: false,
				message: 'Something went wrong while create OurService',
			});
		}

		res.status(201).send({
			success: true,
			data: newOurService,
			message: 'new OurService was created successfully',
		});
		infoLogger.info(
			`OurService ${newOurService?.title} | ${newOurService?._id} | new OurService was created successfully by user ${req.user?._id}`
		);
	}),

	updateOurService: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/ourServices/${req.file.filename}`;
		}
		const { id } = req.params;

		const updatedOurService = await OurService.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});

		if (!updatedOurService) {
			return res.status(404).send({ success: false, error: 'OurService not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedOurService,
			message: 'OurService was updated successfully',
		});
		infoLogger.info(
			`OurService ${updatedOurService?.title} | ${updatedOurService?._id} | OurService was updated successfully by user ${req.user?._id}`
		);
	}),

	deleteOurService: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedOurService = await OurService.findByIdAndDelete({ _id: id });

		if (!deletedOurService) {
			return res.status(404).send({ success: false, error: 'Service not found' });
		}

		res.status(201).send({
			success: true,
			message: 'OurService was deleted successfully',
		});
		infoLogger.info(
			`OurService ${deletedOurService?.title} | ${deletedOurService?._id} | Service was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = ourServiceController;

// ------------------------------ auto Update OurService Status------------------------
// exports.autoUpdateOurServiceStatus = async (req, res) => {
// 	try {
// 		const currentDate = new Date();
// 		const draftOurServices = await OurService.find({ isPublished: false });

// 		if (!draftOurServices) return null;

// 		for (const OurService in draftOurServices) {
// 			if (OurService.publish_date >= currentDate) {
// 				await OurService.updateOne(
// 					{ _id: OurService?._id },
// 					{ $set: { isPublished: true } }
// 				);
// 				infoLogger.info(
// 					`OurService ${OurService?.title} | ${OurService?._id} | isPublished auto updated from  false 'draft' to true 'published'`
// 				);
// 			}
// 		}
// 	} catch (error) {
// 		error.message = 'something went wrong while auto update OurService isPublished';
// 		if (process.env.NODE_ENV == 'development') {
// 			console.log(error);
// 		}
// 		errorLogger.error(error);
// 	}
// };
