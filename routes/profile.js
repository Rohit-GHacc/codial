const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const profileController = require('../controllers/profile_controller')
router.get('/',usersController.profile)
router.get('/posts',profileController.posts);
router.get('/sign-out',profileController.signOut);
module.exports = router;