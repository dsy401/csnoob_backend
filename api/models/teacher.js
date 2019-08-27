const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    title:{type:String,required:true},
    courses: [{type: mongoose.Schema.Types.ObjectId,ref:'course'}],
    school: {type: Number, required: true},

})

module.exports = mongoose.model('teacher', teacherSchema,'teacher')
