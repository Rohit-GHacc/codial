const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/',function(req,res){
    return res.end(`<h1> I'm a user!</h1>`);
})
// router.get('/profile',usersController.profile);
router.use('/profile',require('./profile'));
module.exports = router;