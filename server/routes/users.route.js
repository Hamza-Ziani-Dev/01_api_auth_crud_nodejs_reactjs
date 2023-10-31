const express = require('express');
const { AddUser, FindAllUsers, FindSinglUser, UpdateUser, DeleteUser } = require('../controllers/users.controller');
const router = express.Router()
// const verifyJWT = require('../middleware/verifyJWT');



// router.use(verifyJWT);
/* add user */
router.post('/users', AddUser)

/* find all users */
router.get('/users', FindAllUsers)

/* find single user */
router.get('/users/:id', FindSinglUser)

/* Update user */
router.put('/users/:id', UpdateUser)

/* Delete user */
router.delete('/users/:id', DeleteUser)

module.exports = router;