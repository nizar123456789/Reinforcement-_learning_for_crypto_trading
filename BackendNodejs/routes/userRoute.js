const express = require('express');

const { getUsers, getUser, CreateUser, DeleteUser, UpdateUser, UserLogin } = require('../controllers/userController');

const router = express.Router();

//GET all users
router.get('/', getUsers);

//GET a single user

router.get('/:id', getUser);

//POST a single User

router.post('/Register', CreateUser);
//Login User
router.post('/Login', UserLogin);

// DELETE user
router.delete('/:id', DeleteUser);

//UPDATE a user
router.patch('/:id', UpdateUser);

module.exports = router;