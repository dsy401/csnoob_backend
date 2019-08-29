const teacherRatingController = require('../controllers/teacherRating');
const express = require('express');
const router = express.Router();

router.post('/',teacherRatingController.comment_teacher_by_teacherId)
router.get('/:teacherId/:PageNum',teacherRatingController.get_comment_by_teacherId_by_PageNum)

module.exports = router;
