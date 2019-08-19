const teacherRatingController = require('../controllers/teacherRating');
const express = require('express');
const router = express.Router();

router.post('/',teacherRatingController.comment_teacher_by_teacherId)
router.get('/:teacherId',teacherRatingController.get_comment_by_teacherId)

module.exports = router;
