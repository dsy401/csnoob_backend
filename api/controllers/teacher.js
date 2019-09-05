const mongoose = require('mongoose');
const teacher = require('../models/teacher');
const {Result} = require('../models/result')
const {rateCounter} = require('../../util/rateCounter')


exports.get_teachers_by_schoolNum = (req,res,next)=>{
    const result = new Result()
    teacher
        .aggregate([
            {
                $lookup: {
                    from: 'teacherRating',
                    localField: '_id',
                    foreignField: 'teacherId',
                    as: 'rates'
                },
            },
            {
              $match: {
                  "school": Number(req.params.schoolNum)
              }
            },
            {
                $lookup: {
                    from: 'course',
                    localField: 'courses',
                    foreignField: '_id',
                    as: 'courses'
                }
            }
        ])
        .exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,name:s.name,title:s.title,courses:s.courses,school:s.school,rate: rateCounter(s.rates)}
            });
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })

}


exports.get_all_teacher = (req,res,next)=>{
    const result = new Result()
    teacher
        .aggregate([
            {
                $lookup: {
                    from: 'teacherRating',
                    localField: '_id',
                    foreignField: 'teacherId',
                    as: 'rates'
                },
            },
            {
                $lookup: {
                    from: 'course',
                    localField: 'courses',
                    foreignField: '_id',
                    as: 'courses'
                }
            }
        ])
        .exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,name:s.name,title:s.title,courses:s.courses,school:s.school,rate: rateCounter(s.rates)}
            });
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}

exports.get_teachers_by_name = (req,res,next) => {
    const result = new Result()
    teacher
        .aggregate([
            {
                $lookup: {
                    from: 'teacherRating',
                    localField: '_id',
                    foreignField: 'teacherId',
                    as: 'rates'
                },
            },
            {
                $lookup: {
                    from: 'course',
                    localField: 'courses',
                    foreignField: '_id',
                    as: 'courses'
                }
            },
            {
                $match: {
                    "name":{
                        $regex: req.params.name,
                        $options: "i"
                    }
                }
            }
        ])
        .exec()
        .then(doc=>{
            result.Data = doc.map(s=>{
                return {_id:s._id,name:s.name,title:s.title,courses:s.courses,school:s.school,rate: rateCounter(s.rates)}
            });
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
