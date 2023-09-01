const express = require(`express`);
const port = 8900;
const app = express();
const expressLayouts = require('express-ejs-layouts');

// IMPORTANT NOTE: add this line before using express router line
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


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