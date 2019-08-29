const express = require('express');
const courseRatingController = require('../controllers/courseRating');
const router = express.Router();

router.post('/', courseRatingController.comment_course_by_courseId);
router.get('/:courseId/:PageNum',courseRatingController.get_comment_by_courseId_by_PageNum)
module.exports = router;
