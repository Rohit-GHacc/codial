const User = require('../models/users');

module.exports.profile = async function(req,res){
    // return res.end(`<h1>Users Profile</h1>`);
    const user= await User.findById(req.params.id)
    return res.render('user_profile',{
        title: 'Users Profile',
        profile_user: user
    });
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     await User.findByIdAndUpdate(req.params.id,req.body);
    //     return res.redirect('back');
    // }
    // else{

    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("*****Multer error",err);
                }
                else{
                    console.log(req.file);
                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){
                        // this is saving the path of the uploaded file into the avatar field in the user.
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                }
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){    // this function is from passport.js
        if(err){
            return next(err);
        }
        req.flash('success','You have logged out!');
        return res.redirect('/');
    }); 
    
}