const express = require('express');
const router = express.Router();
const passport = require('passport');
const comments_controller = require('../controllers/comments_controller');
router.post('/create',passport.checkAuthentication,comments_controller.createComment);
router.get('/destroy/:id',passport.checkAuthentication,comments_controller.destroy);
module.exports = router;
