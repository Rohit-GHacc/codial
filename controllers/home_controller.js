const Post = require('../models/posts');
const User = require('../models/users')
module.exports.home = function(req,res){
    // return res.end(`<h1> Express is up for Codial!!</h1>`);
    
    return res.render('home',{
        title: 'Home'
    });
}

module.exports.createPost = async (req,res)=>{
    await Post.create({
        content: req.body.content
    });
    return res.redirect('back');
}

// module.exports.actionName = function(req,res){}