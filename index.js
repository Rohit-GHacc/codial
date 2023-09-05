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

app.use(session({
    name: 'codial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// use express router 
app.use('/',require('./routes')); // after using passport

//running the server
app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err}`); // this is called interpolation
    }
    console.log(`Server running at port: ${port}`);
})