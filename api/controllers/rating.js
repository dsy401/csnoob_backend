const mongoose = require('mongoose');
const rating = require('../models/rating');
const result = require('../models/result')

exports.comment_course_by_courseId = (req,res,next)=>{
    result.reset()
    const ratingModel = new rating({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        rate: req.body.rate,
        grade: req.body.grade,
        courseId: req.body.courseId
    })

    ratingModel.save()
        .then(doc=>{
            result.Data = "comment successfully."
            res.status(201).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}


exports.get_comment_by_courseId = (req,res,next)=>{
    result.reset()
    const courseId = req.params.courseId
    rating.find({'courseId':courseId}).exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,comment:s.comment,rate:s.rate,grade:s.grade}
            })
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
