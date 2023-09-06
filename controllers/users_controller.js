const User = require('../models/users');

module.exports.profile = function(req,res){
    // return res.end(`<h1>Users Profile</h1>`);
    return res.render('user_profile',{
        title: 'Users Profile'
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in',{
        title: 'Sign In'
    });
}

//get the sign up data
module.exports.create = async (req,res)=>{
    //todo later

    //doing now
    if(req.body.password != req.body.confirm_password){
        res.redirect('back');
    }
    try{
    const user = await User.findOne({email: req.body.email})
    // console.log('type of user is ',typeof(user));
    if(!user){
        await User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    else{
        return res.redirect('back')
    }
    }
    
    catch(error){
        console.log(error);
    }

}

// sign in and create a session for the user
module.exports.createSession = (req,res)=>{
    //todo later

    //doing now
    return res.redirect('/');
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });  // this function is from passport.js
    
}