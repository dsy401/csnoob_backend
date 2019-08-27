const mongoose = require('mongoose');
const course = require('../models/course');
const {Result} = require('../models/result')

exports.course_get_all = (req,res,next) =>{
    const result = new Result()
    course.find().exec()
        .then(docs=>{
            result.Data = docs.map(s=>{
                const stage = Number(s.code.split(' ')[1][0])
                return {_id:s._id,code:s.code,name:s.name,description:s.description,school:s.school,type:s.type,stage:stage}
            })
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



