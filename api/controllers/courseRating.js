const mongoose = require('mongoose');
const courseRating = require('../models/courseRating');
const {Result} = require('../models/result')

exports.comment_course_by_courseId = (req,res,next)=>{
    const result = new Result()
    const courseRatingModel = new courseRating({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        name: req.body.name,
        rate: req.body.rate,
        grade: req.body.grade,
        courseId: req.body.courseId,
        semester: req.body.semester,
        year: req.body.year
    })

    courseRatingModel.save()
        .then(doc=>{
            result.Data = "comment successfully.";
            res.status(201).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}


exports.get_comment_by_courseId_by_PageNum = async (req,res,next)=>{
    const result = new Result()
    const pageNum = Number(req.params.PageNum)
    if (isNaN(pageNum) == true || pageNum <= 0){
        result.IsSuccess =false;
        result.ErrorMessage = "Page number is not a integer or zero or negative integer"
        return res.status(200).json(result);
    }
    const courseId = req.params.courseId

    const total = await courseRating.countDocuments({'courseId':courseId})

    const totalPageNum = await Math.floor(total/10) + 1;

    courseRating
        .find({'courseId':courseId})
        .limit(10)
        .skip((pageNum-1)*10)
        .exec()
        .then(doc=>{
            const details = doc.map(s=>{
                return {_id:s._id,comment:s.comment,name:s.name,rate:s.rate,grade:s.grade,year:s.year,semester:s.semester}
            })
            result.Data = {total: totalPageNum,currentPage:pageNum,details:details}
            res.status(200).json(result);
        })
        .catch(err=>{
            result.IsSuccess =false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}

