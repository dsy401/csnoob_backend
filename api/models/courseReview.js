const mongoose = require('mongoose');

const courseReviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true}, //eg. Assignment 1
    fileUrl: {type: String, required:true},
    courseId: {type: mongoose.Schema.Types.ObjectId, required:true}
})

module.exports = mongoose.model('courseReview', courseReviewSchema,'courseReview')
