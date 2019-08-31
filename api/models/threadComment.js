const mongoose = require('mongoose');

const threadCommentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {type:String,required:true},
    name: {type: String, required: true},
    threadId: {type:mongoose.Schema.Types.ObjectId,required:true}
})


module.exports = mongoose.model('threadComment',threadCommentSchema,'threadComment')
