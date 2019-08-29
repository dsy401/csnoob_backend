const express = require('express');
const threadController = require('../controllers/thread');
const router = express.Router()


router.get('/:forumId/:PageNum',threadController.get_all_threads_by_forumId_by_pageNum);

module.exports = router;
