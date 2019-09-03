const express = require('express');
const threadCommentController = require('../controllers/threadComment');
const router = express.Router()

router.get('/getThreadCommentByThreadId/:threadId/:PageNum',threadCommentController.get_threadComment_by_threadId_byPageNum);
router.post('/',threadCommentController.post_one_thread_comment)

module.exports = router;
