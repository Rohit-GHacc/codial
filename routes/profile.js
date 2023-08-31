const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const profileController = require('../controllers/profile_controller')
router.get('/',usersController.profile)
router.get('/posts',profileController.posts);
module.exports = router;