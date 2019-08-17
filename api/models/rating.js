const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {type: String, required: true},
    rate: {type:Number,required:true},
    grade: String,
    courseId: {type: mongoose.Schema.Types.ObjectId, required:true}
})


module.exports = mongoose.model('rating', ratingSchema,'rating')
