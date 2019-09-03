const mongoose = require('mongoose');
const threadComment = require('../models/threadComment');
const {Result} = require('../models/result');


exports.get_threadComment_by_threadId_byPageNum = async (req,res,next) =>{
    const result = new Result();
    const pageNum = Number(req.params.PageNum)
    if (isNaN(pageNum) == true || pageNum <= 0){
        result.IsSuccess =false;
        result.ErrorMessage = "Page number is not a integer or zero or negative integer"
        return res.status(200).json(result);
    }
    const total = await threadComment.countDocuments({'threadId':req.params.threadId});
    const totalPageNum = await Math.floor(total/10) + 1
    threadComment
        .find({"threadId":req.params.threadId})
        .limit(10)
        .skip((pageNum-1)*10)
        .exec()
        .then(docs=>{
            result.Data = {total: totalPageNum,skip: (pageNum-1)*10,details:docs}
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
