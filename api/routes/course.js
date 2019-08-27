const express = require('express');
const courseController = require('../controllers/course');
const router = express.Router();

router.get('/', courseController.course_get_all);
router.get('/:code',courseController.get_courses_by_code)
module.exports = router;
