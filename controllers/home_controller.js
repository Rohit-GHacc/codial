const Post = require('../models/posts');
const User = require('../models/users')
module.exports.home = async function(req,res){
    // return res.end(`<h1> Express is up for Codial!!</h1>`);

    // populate the user of each post
    const posts = await Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
        
    })
    
    return res.render('home',{
        title: 'Home',
        posts: posts
    });
}



// module.exports.actionName = function(req,res){}