module.exports.posts = function(req,res){
    // return res.end(`<h1>Users posts!!</h1>`)
    return res.render('users_posts',{
        title: 'Users Posts'
    });
}