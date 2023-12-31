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
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message:'Comment created'
            })
        }
    req.flash('success','Comment uploaded');
    res.redirect('/');
    }
}
    catch(error){
        console.log(error);
    } 
    
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            
            let postId = comment.post; 
            comment.deleteOne();

            await Comment.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}})
            req.flash('success','comment deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error',"You can't delete this comment");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
}