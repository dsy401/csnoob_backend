const mongoose = require('mongoose');
const threadComment = require('../models/threadComment');
const {Result} = require('../models/result');


exports.get_threadComment_by_threadId = (req,res,next) =>{
    const result = new Result();
    threadComment.find({"threadId":req.params.threadId})
        .exec()
        .then(docs=>{
            result.Data = docs;
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
