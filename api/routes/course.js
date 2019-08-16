const express = require('express');
const coursesController = require('../controllers/course');
const router = express.Router();

router.get('/', coursesController.courses_get_all);
router.get('/:id',coursesController.courses_get_one_by_id)
module.exports = router;
