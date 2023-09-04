const User = require('../models/users');

module.exports.profile = async function(req,res){
    // return res.end(`<h1>Users Profile</h1>`);
    // return res.render('user_profile',{
    //     title: 'Users Profile'
    // });

    if(req.cookies.user_id){
        const user = await User.findById(req.cookies.user_id);
        if(user){
            res.render('user_profile',{
                title: 'Users Profile',
                user: user
            });
        }else
        return res.redirect('/users/sign-in');
    }else
    return res.redirect('/users/sign-in');
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
module.exports.createSession = async (req,res)=>{
    //todo later

    //doing now
    // STEPS TO AUTHENTICATE:
    //find the user
    const user = await User.findOne({email: req.body.email});

    //handle user not found
    if(!user){
        console.log("No such user found Please Sign up first");
        return res.redirect('/users/sign-up');
    }
    // handle user found
    else if(user){
        //handle password which didn't match
        if(user.password != req.body.password){
            console.log('wrong password');
            res.redirect('back');
        }
        //handle session creation
        res.cookie('user_id',user.id);
        res.redirect('/users/profile');


    }

}