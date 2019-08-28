const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String,required:true},
    content: {type: String,required: true},
    forumId: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('thread',threadSchema,'thread')
