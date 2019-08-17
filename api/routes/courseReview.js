const express = require('express');
const ratingController = require('../controllers/courseReview');
const router = express.Router();

router.get('/:courseId',ratingController.get_course_review_by_courseId)

module.exports = router;
