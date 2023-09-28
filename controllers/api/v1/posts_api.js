const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200,{
        message: "List   of posts",
        posts: posts
    });
}   

module.exports.destroy = async function(req,res){
    try{
        // console.log(req.params.id)
        const post = await Post.findById(req.params.id);
        // console.log(post.user ,'\n', req.user.id)
    if(post.user == req.user.id){
        post.deleteOne();

        await Comment.deleteMany({post: req.params.id});

        // if(req.xhr){

        //     return res.status(200).json({
        //         data: {
        //             post_id: req.params.id
        //         },
        //         message: 'Post deleted'
        //     })
        // }
        // req.flash('success','Post and its associated comments deleted');
        return res.json(200,{
            message: 'Post and its associated comments deleted'
        })
    }
    else{
        return res.status().json({
            message: 'You cannot delete this post'
        })
    }
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}