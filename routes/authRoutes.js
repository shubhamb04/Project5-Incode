const { Router } = require('express');
const authController = require('../controllers/authController');
const { alreadyAuth } = require('../middleware/authMiddleware');
const router = Router();

/* Authentication routes */
router.get('/signup', alreadyAuth, authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', alreadyAuth, authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;