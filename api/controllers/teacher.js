const mongoose = require('mongoose');
const teacher = require('../models/teacher');
const {Result} = require('../models/result')

exports.get_all_teacher = (req,res,next)=>{
    const result = new Result()
    teacher.find().populate('courses')
        .exec()
        .then(doc=>{
            result.Data = doc;
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
