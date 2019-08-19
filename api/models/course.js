const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {type:String,required:true,unique:true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    school: {type: Number, required: true},
    type: {type: Number, required: true} //0 is undergraduate, 1 is postgraduate
})


module.exports = mongoose.model('course', courseSchema,'course')
