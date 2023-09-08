const Post = require('../models/posts')
const Comment = require('../models/comments')
module.exports.createPost = async (req,res)=>{
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    req.flash('success','Post Created');
    console.log(req.flash());
    return res.redirect('back');
}

module.exports.destroy = async function(req,res){
    try{
        console.log(req.params.id)
        const post = await Post.findById(req.params.id);
        console.log(post.user ,'\n', req.user.id)
    if(post.user == req.user.id){
        post.deleteOne();

        await Comment.deleteMany({post: req.params.id})
        req.flash('success','Post and its associated comments deleted');
        res.redirect('back');
    }
    else{
        req.flash('error',"You can't delete this post");
        res.redirect('back');
    }
    }
    catch(err){
        console.log(err);
    }
}