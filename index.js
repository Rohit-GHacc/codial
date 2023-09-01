const express = require(`express`);
const port = 8900;
const app = express();
const expressLayouts = require('express-ejs-layouts');
//to set up connection to mongodb
const db = require('./config/mongoose');

// IMPORTANT NOTE: add this line before using express router line
app.use(expressLayouts);

//setting up individual static files for individual ejs files AND use style and script variable at that specific position in layout.ejs
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//for accessing static files
app.use(express.static('./assets'));

// use express router 
app.use('/',require('./routes'));


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//running the server
app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err}`); // this is called interpolation
    }
    console.log(`Server running at port: ${port}`);
})