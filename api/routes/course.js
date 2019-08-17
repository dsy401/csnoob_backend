const express = require('express');
const courseController = require('../controllers/course');
const router = express.Router();

router.get('/', courseController.course_get_all);
module.exports = router;
