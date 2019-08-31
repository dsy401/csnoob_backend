const express = require('express');
const generalController = require('../controllers/general');
const router = express.Router();


router.get('/getThreadNumAndPostNum',generalController.get_threadNum_and_PostNum)



module.exports = router;
