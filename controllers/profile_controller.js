module.exports.posts = function(req,res){
    // return res.end(`<h1>Users posts!!</h1>`)
    return res.render('users_posts',{
        title: 'Users Posts'
    });
}

module.exports.signOut = async function(req,res){
    try{
        const user = req.cookies;
        
        console.log(user);
        res.render('user_sign_in');
        
        res.clearCookie('user_id');
        console.log('\nafter rendering: ', user);
        return;
    }
    catch(error){
        console.log(error);
    }
}