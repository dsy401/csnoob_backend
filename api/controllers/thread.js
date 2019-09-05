const mongoose = require('mongoose');
const thread = require('../models/thread')
const {Result} = require('../models/result')

//分页
exports.get_all_threads_by_forumId_by_pageNum = async (req,res,next) =>{
    const result = new Result();
    const pageNum = Number(req.params.PageNum)
    if (isNaN(pageNum) == true || pageNum <= 0){
        result.IsSuccess =false;
        result.ErrorMessage = "Page number is not a integer or zero or negative integer"
        return res.status(200).json(result);
    }
    const total = await thread
        .countDocuments({'forumId':req.params.forumId});
    const totalPageNum = await Math.floor(total/10) + 1;
    // thread
    //     .find({'forumId':req.params.forumId})
    //     .sort({'_id':-1})
    //     .limit(10)
    //     .skip((pageNum-1)*10)
    //     .exec()
    //     .then(docs=>{
    //         result.Data =
    //             {
    //                 total: totalPageNum,
    //                 currentPage:pageNum,
    //                 details:docs
    //             };
    //         res.status(200).json(result)
    //     })
    //     .catch(err=>{
    //         result.IsSuccess = false;
    //         result.ErrorMessage = err;
    //         res.status(500).json(result)
    //     })
    thread.aggregate([
        {
          $match:{'forumId':mongoose.Types.ObjectId(req.params.forumId)}
        },
        {
            $sort: {'_id':-1}
        },
        {
            $skip: (pageNum-1)*10
        },
        {
            $limit: 10
        },
        {
            $lookup:{
                from: 'threadComment',
                localField: "_id",
                foreignField: "threadId",
                as: "threads"
            }
        }
    ])
        .exec()
        .then(docs=>{
            result.Data =
                {
                    total: totalPageNum,
                    currentPage:pageNum,
                    details:docs.map(s=>{
                        return {
                            _id:s._id,author:s.author,title:s.title,content:s.content,forumId:s.forumId,
                            lastThread:{
                                name: s.threads.length ===0?"":s.threads[s.threads.length-1].name,
                                _id: s.threads.length===0?"":s.threads[s.threads.length-1]._id,
                            },
                            replyNum: total
                        }
                    })
                };
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })


};


exports.post_one_thread = (req,res,next)=>{
    const result = new Result();
    const threadModel = new thread({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        forumId: req.body.forumId
    });

    threadModel.save()
        .then(doc=>{
            result.Data = "comment successfully.";
            res.status(201).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
};

exports.get_one_thread_by_thread_id = (req,res,next) =>{
    const result = new Result();
    thread.findOne({"_id":req.params.threadId})
        .exec()
        .then(doc=>{
            result.Data = doc;
            res.status(200).json(result)
        })
        .catch(err=>{
            result.IsSuccess = false;
            result.ErrorMessage = err;
            res.status(500).json(result)
        })
}
