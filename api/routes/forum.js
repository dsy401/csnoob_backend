const express = require('express');
const forumController = require('../controllers/forum');
const router = express.Router();

router.get('/',forumController.get_all_forum)
module.exports = router;
