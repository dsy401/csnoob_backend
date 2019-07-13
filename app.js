//import module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

//import routes
const coursesRoutes = require('./api/routes/courses')

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
app.use('/courses',coursesRoutes);


module.exports = app;
