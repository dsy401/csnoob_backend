const mongoose = require('mongoose');
const thread = require('../models/thread')
const {Result} = require('../models/result')

exports.get_all_threads_by_forumId = (req,res,next) =>{
    const result = new Result();
    thread.find({'forumId':req.params.forumId})
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
