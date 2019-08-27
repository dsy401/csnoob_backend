const express = require('express');
const teacherController = require('../controllers/teacher');
const router = express.Router();


router.get('/',teacherController.get_all_teacher)
router.get('/:name',teacherController.get_teachers_by_name)
module.exports = router;
