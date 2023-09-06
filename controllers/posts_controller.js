const Post = require('../models/posts')
module.exports.createPost = async (req,res)=>{
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}