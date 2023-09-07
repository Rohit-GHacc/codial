const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport =require('passport');

router.get('/',function(req,res){
    return res.end(`<h1> I'm a user!</h1>`);
})
// router.get('/profile',passport.checkAuthentication,usersController.profile);
router.use('/profile',require('./profile'));

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.post('/update/:id',passport.checkAuthentication,usersController.update); 

router.get('/sign-out',usersController.destroySession);
module.exports = router;