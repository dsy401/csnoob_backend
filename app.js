//import module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger')

//import result model
const {Result} = require('./api/models/result');

//import routes
const courseRoutes = require('./api/routes/course');
const CourseRatingRoutes = require('./api/routes/courseRating');
const courseReviewRoutes = require('./api/routes/courseReview');
const teacherRoutes = require('./api/routes/teacher');
const teacherRatingRoutes = require('./api/routes/teacherRating');
const forumRoutes = require('./api/routes/forum');
const threadRoutes = require('./api/routes/thread');
const threadCommentRoutes = require('./api/routes/threadComment');
const generalRoutes = require('./api/routes/general')
const dbconfig = require('./dbconfig')
//

const app = express();

//connect database
mongoose.connect(
    'mongodb+srv://dsy401:'+dbconfig.PASSWORD  +'@csnoob-jouvh.mongodb.net/csnoob?retryWrites=true&w=majority',
    { useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true}
);

//morgan check
app.use(morgan('dev'));

//body-parser config for app
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//access controll setting
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept,Authorization'
    );

    if (req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
        return res.status(200).json({})
    }
    next();
})


//static serve files
app.use('/files',express.static(path.join(__dirname,'files')))


//routes
const router = express.Router();
router.use('/course',courseRoutes);
router.use('/courseRating',CourseRatingRoutes);
router.use('/courseReview',courseReviewRoutes);
router.use('/teacher',teacherRoutes);
router.use('/teacherRating',teacherRatingRoutes);
router.use('/forum',forumRoutes);
router.use('/thread',threadRoutes)
router.use('/threadComment',threadCommentRoutes);
//

//combine all routes
app.use('/api',router)
//
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    const result = new Result()
    result.IsSuccess = false;
    result.ErrorMessage = error.message;
    res.status(error.status || 500);
    res.json(result)
})


if (module === require.main) {

    const server = app.listen(process.env.PORT || 8080, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    });
}



module.exports = app;
