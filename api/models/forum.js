const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String},
    subtitle: {type: String},
    category: Number, //0 is general, 1 is discussion, 2 is activities
})



module.exports = mongoose.model('forum',forumSchema,'forum');

