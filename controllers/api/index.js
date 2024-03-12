const router = require('express').Router();
const postRoutes = require('../api/postRoutes');
const userRoutes = require('../api/userRoutes');
const commentRoutes = require('../api/commentRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);


module.exports = router;

