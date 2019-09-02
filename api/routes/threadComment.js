const express = require('express');
const threadCommentController = require('../controllers/threadComment');
const router = express.Router()

router.get('/getThreadCommentByThreadId/:threadId',threadCommentController.get_threadComment_by_threadId);
router.post('/',threadCommentController.post_one_thread_comment)

module.exports = router;
