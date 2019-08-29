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

exports.get_comment_by_teacherId_by_PageNum = async (req,res,next)=>{
    const result = new Result();
    const pageNum = Number(req.params.PageNum)
    if (isNaN(pageNum) == true || pageNum <= 0){
        result.IsSuccess =false;
        result.ErrorMessage = "Page number is not a integer or zero or negative integer"
        return res.status(200).json(result);
    }
    const teacherId = req.params.teacherId;

    const total = await teacherRating.countDocuments({'teacherId':teacherId});

    teacherRating
        .find({'teacherId':teacherId})
        .limit(10)
        .skip((pageNum-1)*10)
        .exec()
        .then(doc=>{
            result.Data = {total: total,details:doc}
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};
