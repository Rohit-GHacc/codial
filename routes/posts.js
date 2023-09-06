const express = require('express');
const router = express.Router();
const passport = require('passport')
const posts_controller = require('../controllers/posts_controller')
router.post('/create',passport.checkAuthentication,posts_controller.createPost);
module.exports = router;