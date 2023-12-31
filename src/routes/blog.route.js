const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const blogController = require('../controllers/blog.controller');
const {
	newBlogValidation,
	updateBlogValidation,
} = require('../validation/blog.validation');

// -------------------------------------- all blogs routes ----------------------
router.post(
	'/',
	authorizeAdmin,
	upload.single('cover'),
	validationMiddleware(newBlogValidation),
	blogController.createBlog
);
router.get('/', blogController.getAllBlogs);

// single blogs routes operations --
router.get('/:id', validateObjectId, blogController.getBlog);
router
	.route('/:id')
	// .all(authorizeAdmin, validateObjectId)
	.patch(
		validateObjectId,
		upload.single('cover'),
		authorizeAdmin,
		validationMiddleware(updateBlogValidation),
		blogController.updateBlog
	)
	.delete(validateObjectId, authorizeAdmin, blogController.deleteBlog);

module.exports = router;
