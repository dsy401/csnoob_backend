const mongoose = require('mongoose');
const courseRating = require('../models/courseRating');
const {Result} = require('../models/result')

exports.comment_course_by_courseId = (req,res,next)=>{
    const result = new Result()
    const courseRatingModel = new courseRating({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        rate: req.body.rate,
        grade: req.body.grade,
        courseId: req.body.courseId,
        semester: req.body.semester,
        year: req.body.year
    })

    courseRatingModel.save()
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
    const result = new Result()
    const courseId = req.params.courseId
    courseRating.find({'courseId':courseId}).exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,comment:s.comment,rate:s.rate,grade:s.grade,year:s.year,semester:s.semester}
            })
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}

