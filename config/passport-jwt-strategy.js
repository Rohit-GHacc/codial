const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// module which is used to extract jwt from header of JWT
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codial'
};

passport.use(new JWTStrategy(opts,async function(jwtPayload,done){
    const user = await User.findById(jwtPayload._id);
    if(user){
        return done(null,user);
    }
    else{
        return done(null,false);
    }
}));

module.exports = passport;