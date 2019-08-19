const express = require('express');
const courseRatingController = require('../controllers/courseRating');
const router = express.Router();

router.post('/', courseRatingController.comment_course_by_courseId);
router.get('/:courseId',courseRatingController.get_comment_by_courseId)
module.exports = router;
