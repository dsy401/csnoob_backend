const express = require('express');
const teacherController = require('../controllers/teacher');
const router = express.Router();


router.get('/',teacherController.get_all_teacher)
module.exports = router;
