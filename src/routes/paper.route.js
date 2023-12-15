const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paper.controller');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authenticate } = require('../middlewares/authenticateMiddleware');
const { uploadFile } = require('../middlewares/uploadMiddleware');
const { newPaperValidation, updatePaperValidation } = require('../validation/paper.validation');

router.use(authenticate);
router
	.route('/')
	.post(
		uploadFile.single('file'),
		validationMiddleware(newPaperValidation),
		paperController.createPaper
	)
	.get(paperController.getAllPapers);

router
	.route('/:id')
	.all(validateObjectId)
	.get(paperController.getPaper)
	.patch(
		uploadFile.single('file'),
		validationMiddleware(updatePaperValidation),
		paperController.updatePaper
	)
	.delete(paperController.deletePaper);

module.exports = router;
