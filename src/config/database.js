const mongoose = require('mongoose');
const OurService = require('../models/ourService.model');
const { initialOurServices } = require('./enums');

const createInitialItems = async (model, data) => {
	const existingItems = await model.find();

	if (existingItems.length === 0) {
		for (const service of data) {
			await model.create(service);
		}
	}
};

const connectDB = async () => {
	console.log('initialOurServices', initialOurServices);
	try {
		await mongoose.connect(process.env.MONGO_URL);

		// create 6 initial ourServices in first create database
		createInitialItems(OurService, initialOurServices);
		
	} catch (error) {
		console.error('Error connecting to database:', error.message);
		process.exit(1);
	}
};
module.exports = { connectDB };
