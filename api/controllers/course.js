const mongoose = require('mongoose');
const course = require('../models/course');


exports.courses_get_all = (req,res,next) =>{
    course.find().exec()
        .then(docs=>{
            res.status(200).json(docs)
        }).catch(err=>{
        res.status(500).json(err);
    });
};

exports.courses_get_one_by_id = (req,res,next) =>{
    const id = req.params.id;
    course.find({schoolId:id}).exec().then(docs=>{
        res.status(200).json(docs)
    }).catch(err=>{
        res.status(500).json(err);
    })
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



