const {Result} = require('../models/result');
const thread = require('../models/thread')
const threadComment = require('../models/threadComment');
exports.get_threadNum_and_PostNum = async (req,res,next) =>{
    const result = new Result();
    try{
        const threadNum = await thread.countDocuments({})
        const postNum = await threadComment.countDocuments({})
        result.Data = {threadNum:threadNum,postNum:postNum}
        res.status(200).json(result)
    }catch (err) {
        result.IsSuccess = false;
        result.ErrorMessage = err;
        res.status(500).json(result)
    }
}
