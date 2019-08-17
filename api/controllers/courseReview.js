const mongoose = require('mongoose');
const courseReview = require('../models/courseReview');
const {Result} = require('../models/result')


exports.get_course_review_by_courseId = (req,res,next)=>{
    const result = new Result()
    const courseId = req.params.courseId;
    courseReview.find({'courseId':courseId}).exec()
        .then(doc=>{
            result.Data = doc;
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
