const express = require(`express`);
const port = 8900;
const app = express();

// use express router 
app.use('/',require('./routes'));



//running the server
app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err}`); // this is called interpolation
    }
    console.log(`Server running at port: ${port}`);
})