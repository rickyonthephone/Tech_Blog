const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);


module.exports = router;