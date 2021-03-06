const mongoose = require('mongoose')


const teacherRatingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {type: String, required: true},
    name: {type:String,required:true},
    rate: {type:Number,required:true},
    semester: {type: Number, required:true}, //1 is semester 1,2 is semester 2, 3 is semester summer school
    year: {type: String, required: true},
    teacherId :{type:mongoose.Schema.Types.ObjectId,required:true }
})


module.exports = mongoose.model('teacherRating',teacherRatingSchema,'teacherRating')
