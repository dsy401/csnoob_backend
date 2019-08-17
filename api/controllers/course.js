const mongoose = require('mongoose');
const course = require('../models/course');
const {Result} = require('../models/result')

exports.course_get_all = (req,res,next) =>{
    const result = new Result()
    course.find().exec()
        .then(docs=>{
            result.Data = docs
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false
            result.ErrorMessage = err
            res.status(500).json(result);
    });
};


// const docs = courses.aggregate([
//     {
//         $lookup: {
//             from: 'schools',
//             localField: 'schoolId',
//             foreignField: '_id',
//             as: "school"
//         }
//     },
//     {
//         $unwind: '$haha'
//     }
// ]).exec().then(docs=>{
//     res.status(200).json(docs)
// })



