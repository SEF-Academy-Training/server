const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const ourServiceController = require('../controllers/ourService.controller');
const {
	newOurServiceValidation,
	updateOurServiceValidation,
} = require('../validation/ourService.validation');

// -------------------------------------- all ourServices routes ----------------------
router.post(
	'/',
	authorizeAdmin,
	upload.single('cover'),
	validationMiddleware(newOurServiceValidation),
	ourServiceController.createOurService
);
router.get('/', ourServiceController.getAllOurServices);

// single ourServices routes operations --
router.get('/:id', validateObjectId, ourServiceController.getOurService);
router
	.route('/:id')
	// .all(authorizeAdmin, validateObjectId)
	.patch(
		validateObjectId,
		upload.single('cover'),
		authorizeAdmin,
		validationMiddleware(updateOurServiceValidation),
		ourServiceController.updateOurService
	)
	.delete(validateObjectId, authorizeAdmin, ourServiceController.deleteOurService);

module.exports = router;
