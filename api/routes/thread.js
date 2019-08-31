const express = require('express');
const threadController = require('../controllers/thread');
const router = express.Router()

router.get('/:threadId',threadController.get_one_thread_by_thread_id)
router.get('/getThreadsByForumId/:forumId/:PageNum',threadController.get_all_threads_by_forumId_by_pageNum);
router.post('/',threadController.post_one_thread)

module.exports = router;
