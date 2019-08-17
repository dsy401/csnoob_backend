const express = require('express');
const ratingController = require('../controllers/rating');
const router = express.Router();

router.post('/', ratingController.comment_course_by_courseId);
router.get('/:courseId',ratingController.get_comment_by_courseId)
module.exports = router;
