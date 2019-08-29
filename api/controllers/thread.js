const mongoose = require('mongoose');
const thread = require('../models/thread')
const {Result} = require('../models/result')

exports.get_all_threads_by_forumId = async (req,res,next) =>{
    const result = new Result();
    const pageNum = Number(req.params.PageNum)
    if (isNaN(pageNum) == true || pageNum <= 0){
        result.IsSuccess =false;
        result.ErrorMessage = "Page number is not a integer or zero or negative integer"
        return res.status(200).json(result);
    }
    const total = await thread
        .count({'forumId':req.params.forumId})

    const totalPageNum = await Math.floor(total/10) + 1
    thread
        .find({'forumId':req.params.forumId})
        .limit(10)
        .skip((pageNum-1)*10)
        .exec()
        .then(docs=>{
            result.Data = {total: totalPageNum, currentPage:pageNum, details:docs};
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};
