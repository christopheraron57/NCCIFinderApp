//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const searchRoutes = require('./routes/searchRoutes');
const mainRoutes = require('./routes/mainRoutes');
const codeInspectorsRoutes = require('./routes/codeInspectorsRoutes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const dataLoading  = require('./middlewares/dataLoader');


dataLoading.dataLoad();

//create app
const app = express();

//configure app
let port = 8084;
let host = 'localhost';
let url  = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');



//connect to mongodb
mongoose.connect(url)
.then(()=>{
//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err.message))

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.codeInspector = req.session.codeInspector||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});



app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up main and controller routes
app.use('/', mainRoutes);

app.use('/search', searchRoutes);

app.use('/codeInspectors', codeInspectorsRoutes);



app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url)
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{

    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error")
    }

    res.status(err.status);
    res.render('error', {error: err});
});

