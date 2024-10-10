// This is a router if you are going to use JSON filesystem as data source

import express from 'express';
import { UserJsonRepo } from '../src/repos/UserJsonRepo';
import { createUserJson } from '../src/usecases/createUserJson';
import { updateUserJson } from '../src/usecases/updateUserJson';
import { deleteUserJson } from '../src/usecases/deleteUserJson';
import { loginUserJson } from '../src/usecases/loginUserJson';

const router = express.Router();
const userRepo = new UserJsonRepo();

// router.get('/', async (req, res) => {
//     try {
//         const users = await userRepo.getAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error });
//     }
// });

// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await userRepo.getById(Number(id));
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error });
//     }
// });

router.post('/', async (req, res) => {
    //TODO: add checks here
    const userData = req.body;
    try {
        const newUser = await createUserJson(userRepo, userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const user = await loginUserJson(userRepo, userData);
        if (user) {
            req.session.user = user;
        }
        if (userData.rememberMe) {
            res.cookie('rememberMe', userData, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production'  // Only send cookie over HTTPS in production
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Could not log in', error });
    }
})
router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }

        res.clearCookie('rememberMe');

        res.status(200).json({ message: 'Logged out successfully' });
    });
});


router.get('/get-auth', async (req, res) => {
    try {
        if (req.session.user) {
            res.status(200).json({ isAuthenticated: true, userId: req.session.user.id, username: req.session.user.username });
        } else {
            res.status(200).json({ isAuthenticated: false });
        }
    } catch (error) {
        res.status(404).json({ message: 'Error', error });
    }
})

// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     try {
//         const updatedUser = await updateUserJson(userRepo, Number(id), updatedData);
//         if (updatedUser) {
//             res.json(updatedUser);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating user', error });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deleted = await deleteUserJson(userRepo, Number(id));
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error });
//     }
// });

export default router;
