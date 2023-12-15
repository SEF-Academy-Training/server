const router = require('express').Router();
router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));
router.use('/blogs', require('./blog.route'));
router.use('/services', require('./service.route'));
router.use('/papers', require('./paper.route'));
router.use('/chat', require('./chat.route'));

module.exports = router;
