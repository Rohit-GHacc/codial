module.exports.profile = function(req,res){
    // return res.end(`<h1>Users Profile</h1>`);
    return res.render('user_profile',{
        title: 'Users Profile'
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

module.exports.signIn = (req,res)=>{
    res.render('user_sign_in',{
        title: 'Sign In'
    });
}

//get the sign up data
module.exports.create = (req,res)=>{
    //todo later
}