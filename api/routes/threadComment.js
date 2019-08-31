const express = require('express');
const threadCommentController = require('../controllers/threadComment');
const router = express.Router()

router.get('/getThreadCommentByThreadId/:threadId',threadCommentController.get_threadComment_by_threadId);


module.exports = router;
