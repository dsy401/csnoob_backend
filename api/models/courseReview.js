const mongoose = require('mongoose');

const courseReviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    semester: {type: Number, required: true}, //1 is semester 1,2 is semester 2, 3 is semester summer school
    year: {type: String, required:true},
    name: {type:String, required:true}, //eg. Assignment 1
    questionFile: {type:String},
    solutionFile: {type: String},

    courseId: {type: mongoose.Schema.Types.ObjectId, required:true}
})

module.exports = mongoose.model('courseReview', courseReviewSchema,'courseReview')
