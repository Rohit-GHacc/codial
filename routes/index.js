const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require('passport');
console.log('router loaded');

router.post('/',passport.checkAuthentication,homeController.createPost);
router.get('/',homeController.home);
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;