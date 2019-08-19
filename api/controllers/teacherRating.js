const mongoose = require('mongoose');
const teacherRating = require('../models/teacherRating');
const {Result} = require('../models/result');


exports.comment_teacher_by_teacherId = (req,res,next)=>{
    const result = new Result();
    const teacherRatingModel = new teacherRating({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        rate: req.body.rate,
        teacherId: req.body.teacherId
    });
    teacherRatingModel.save()
        .then(doc=>{
            result.Data = "comment successfully.";
            res.status(201).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};

exports.get_comment_by_teacherId = (req,res,next)=>{
    const result = new Result();
    const teacherId = req.params.teacherId;
    teacherRating.find({'teacherId':teacherId}).exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,comment:s.comment,rate:s.rate}
            });
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
