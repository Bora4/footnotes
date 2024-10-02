// This is a router if you are going to use JSON filesystem as data source

import express from 'express';
import { UserJsonRepo } from '../src/repos/UserJsonRepo';
import { createUserJson } from '../src/usecases/createUserJson';
import { updateUserJson } from '../src/usecases/updateUserJson';
import { deleteUserJson } from '../src/usecases/deleteUserJson';

const router = express.Router();
const userRepo = new UserJsonRepo();

router.get('/', async (req, res) => {
    try {
        const users = await userRepo.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userRepo.getById(Number(id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

router.post('/', async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await createUserJson(userRepo, userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = await updateUserJson(userRepo, Number(id), updatedData);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteUserJson(userRepo, Number(id));
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

export default router;
