const express = require('express');
const router = express.Router()
const {register, login, refresh, logout} = require('../controllers/auth.controller')
 

/* Register Admin */
router.post('/register', register);

/* Register Admin */
router.post('/login', login);

/* Refreach Admin */
router.get('/refresh', refresh);


/* Logout Admin */
router.post('/logout', logout);




module.exports = router;