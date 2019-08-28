const express = require('express');
const threadController = require('../controllers/thread');
const router = express.Router()


router.get('/:forumId',threadController.get_all_threads_by_forumId);

module.exports = router;
