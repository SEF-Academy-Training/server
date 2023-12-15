const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const serviceController = require('../controllers/Service.controller');
const {
	newServiceValidation,
	updateServiceValidation,
} = require('../validation/service.validation');

// -------------------------------------- all Services routes ----------------------
router
	.post(
		'/',
		// authorizeAdmin,
		authenticate,
		validationMiddleware(newServiceValidation),
		serviceController.createService
	)
	.get(serviceController.getAllServices);
// router.get('/', authenticate, serviceController.getAllServices);

// single Services routes operations --
router.get('/:id', authenticate, validateObjectId, serviceController.getService);

router
	.route('/:id')
	.all(authorizeAdmin, validateObjectId)
	.patch(validationMiddleware(updateServiceValidation), serviceController.updateService)
	.delete(serviceController.deleteService);

module.exports = router;
