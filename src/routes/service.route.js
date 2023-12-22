const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const {
	newServiceValidation,
	updateServiceValidation,
} = require('../validation/service.validation');
const {
	getAllServices,
	updateService,
	deleteService,
	CreateService,
	getService,
} = require('../controllers/service.controller');

// -------------------------------------- all Services routes ----------------------
router
	.route('/')
	.all(authenticate)
	.post(validationMiddleware(newServiceValidation), CreateService)
	.get(getAllServices); //authorizeAdmin,

// single Services routes operations --
router.get('/:id', authenticate, validateObjectId, getService);

router
	.route('/:id')
	.all(authorizeAdmin, validateObjectId)
	.patch(validationMiddleware(updateServiceValidation), updateService)
	.delete(deleteService);

module.exports = router;
