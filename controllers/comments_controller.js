const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.createComment = async function(req,res){
    try{
    const post = await Post.findById(req.body.post.trim());
    if(post){
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post.trim(),
            user: req.user._id,
            
        });
        post.comments.push(comment); //updating comments field in post schema
        post.save();// we need to save whenvever we update something
    
    res.redirect('/');
    }
}
    catch(error){
        console.log(error);
    } 
    
}