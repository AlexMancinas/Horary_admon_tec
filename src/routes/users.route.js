const express = require('express');
const router = express.Router();
const {getUserById, getAllUsers, createUser, updateUser, deleteUser} = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;