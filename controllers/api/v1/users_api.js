const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req,res)=>{
    // we need to generate jsonwebtoken whenever username and password is received
    try {
        let user = User.findOne({email: req.body.email});
        
        console.log(JSON.stringify(user));
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid username or password'
            });
        }
        else{
            return res.status(200).json({
                message: 'Sign in successful, here is your token please keep it safe',
                data: {
                    token: jwt.sign(user.toJson(),'codial',{expiresIn: '10000'})
                }
            })
        }

    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            
            message: 'Internal Server Error'
        });
    }
}