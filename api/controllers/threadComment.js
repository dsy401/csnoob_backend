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
};


exports.post_one_thread_comment = (req,res,next) => {
    const result = new Result();
    const threadCommentModel = new threadComment({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        name: req.body.name,
        threadId: req.body.threadId
    });

    threadCommentModel.save()
        .then(doc=>{
            result.Data = "comment successfully";
            res.status(201).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};
