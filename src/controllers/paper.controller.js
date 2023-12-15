const Paper = require('../models/paper.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination');
const Service = require('../models/service.model');

const paperController = {
	getAllPapers: asyncHandler(async (req, res) => {
		let roleQuery = '';
		if (req.user.role == 'Admin') {
			roleQuery = {};
		} else {
			roleQuery = { user: req.user._id };
		}

		const { error, data, pagination } = await paginate(Paper, req, roleQuery);
		if (error) {
			return res.status(404).send({ success: false, error });
		}

		res.status(200).send({ success: true, data, pagination });
	}),

	getPaper: asyncHandler(async (req, res) => {
		let roleQuery = '';
		if (req.user.role == 'Admin') {
			roleQuery = {};
		} else {
			roleQuery = { user: req.user?._id };
		}

		const paper = await Paper.findOne({ _id: req.params.id, ...roleQuery });
		if (!paper) {
			return res.status(404).send({ success: false, error: 'Paper not found' });
		}

		res.status(200).send({ success: true, data: paper });
	}),

	createPaper: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.file = `/papers/${req.file.filename}`;
		}

		const newPaper = await Paper.create(req.body);

		if (!newPaper) {
			return res.status(400).send({
				success: false,
				message: 'Something went wrong while create Paper',
			});
		}

		// add new paper id into it's service
		await Service.findByIdAndUpdate(
			{ _id: newPaper?.service },
			{ $push: { papers: newPaper._id } }
		);

		res.status(201).send({
			success: true,
			data: newPaper,
			message: 'new Paper was created successfully',
		});
		infoLogger.info(
			`Paper ${newPaper?.document} | ${newPaper?._id} | new Paper was created successfully by user ${req.user?._id}`
		);
	}),

	updatePaper: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.file = `/papers/${req.file.filename}`;
		}
		const { id } = req.params;

		const updatedPaper = await Paper.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});

		if (!updatedPaper) {
			return res.status(404).send({ success: false, error: 'Paper not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedPaper,
			message: 'Paper was updated successfully',
		});
		infoLogger.info(
			`Paper ${updatedPaper?.document} | ${updatedPaper?._id} | Paper was updated successfully by user ${req.user?._id}`
		);
	}),

	deletePaper: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedPaper = await Paper.findByIdAndDelete({ _id: id });

		if (!deletedPaper) {
			return res.status(404).send({ success: false, error: 'Paper not found' });
		}

		res.status(201).send({
			success: true,
			message: 'Paper was deleted successfully',
		});

		// delete paper id from it's service
		const servicePapers = await Service.findById({ _id: deletedPaper?.service });
		servicePapers.papers = servicePapers.papers?.filter(
			(paper) => paper != deletedPaper?._id
		);

		await Service.findByIdAndUpdate({ _id: deletedPaper?.service }, { servicePapers });

		infoLogger.info(
			`Paper ${deletedPaper?.title} | ${deletedPaper?._id} | Paper was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = paperController;
