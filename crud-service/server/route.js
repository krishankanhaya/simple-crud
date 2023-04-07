import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser, userPage } from '../controller/user-controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

router.get('/:email', userPage);

export default router;