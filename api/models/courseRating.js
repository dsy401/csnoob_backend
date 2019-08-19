const mongoose = require('mongoose');

const courseRatingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {type: String, required: true},
    rate: {type:Number,required:true},
    grade: String,
    semester: {type: Number, required:true}, //1 is semester 1,2 is semester 2, 3 is semester summer school
    year: {type: String, required: true},
    courseId: {type: mongoose.Schema.Types.ObjectId, required:true}
})


module.exports = mongoose.model('courseRating', courseRatingSchema,'courseRating')
