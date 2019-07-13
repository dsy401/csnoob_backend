const mongoose = require('mongoose');

const coursesSchema = mongoose.Schema({
    _id: Number,
    code: {type:String,required:true,unique:true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    schoolId: {type: Number, required: true},
    type: {type: Number, required: true} //0 is undergraduate, 1 is postgraduate
})


module.exports = mongoose.model('courses', coursesSchema)
