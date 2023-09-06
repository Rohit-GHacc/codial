const express = require(`express`);
const port = 8900;
const app = express();
const expressLayouts = require('express-ejs-layouts');
//to set up connection to mongodb
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
 // unlike other libraries it requires argument (session) coz it needss to store the session 
const MongoStore = require('connect-mongo');
// const sassMiddleware = require('sass-middleware')   <<-----------------------------------------------------DOUBT  HERE

// this middleware is to be used whenever the server starts so use it before starting the server:
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

app.use(express.urlencoded());
app.use(cookieParser())
// IMPORTANT NOTE: add this line before using express router line
app.use(expressLayouts);

//setting up individual static files for individual ejs files AND use style and script variable at that specific position in layout.ejs
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//for accessing static files
app.use(express.static('./assets'));



// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'conect-mongodb setup ok')
    }
    ),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);

// use express router 
app.use('/',require('./routes')); // after using passport

//running the server
app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err}`); // this is called interpolation
    }
    console.log(`Server running at port: ${port}`);
})