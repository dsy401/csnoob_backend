//import module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

//import result model
const result = require('./api/models/result')

//import routes
const courseRoutes = require('./api/routes/course')

const app = express();

//connect database
mongoose.connect(
    'mongodb+srv://dsy401:'
    + process.env.MONGO_ATLAS_PW +
    '@csnoob-jouvh.mongodb.net/csnoob?retryWrites=true&w=majority',
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

//routes
app.use('/course',courseRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    result.reset()
    result.IsSuccess = false;
    result.ErrorMessage = error.message;
    res.status(error.status || 500);
    res.json(result)
})

module.exports = app;
