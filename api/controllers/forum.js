const mongoose = require('mongoose');
const forum = require('../models/forum');
const {Result}  = require('../models/result');

exports.get_all_forum = (req,res,next) =>{
    const result = new Result();
    forum.aggregate([
        {
            $lookup: {
                from: 'thread',
                localField: '_id',
                foreignField: 'forumId',
                as: 'thread'
            }
        }
    ]).exec()
        .then(docs=>{
        result.Data = docs.map(s=>{
            return {_id:s._id,title:s.title,subtitle:s.subtitle,category: s.category,threadNum: s.thread.length}
        });
        res.status(200).json(result)
    })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};
