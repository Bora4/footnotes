// This is a router if you are going to use JSON filesystem as data source

import express from 'express';
import path from 'path';
import { ThreadJsonRepo } from '../src/repos/ThreadJsonRepo';
// import { viewThreadsJson } from '../src/usecases/viewThreadsJson';
import { createThreadJson } from '../src/usecases/createThreadJson';
import { createMessageJson } from '../src/usecases/createMessageJson';
import { MessageJsonRepo } from '../src/repos/MessageJsonRepo';
// import { updateThreadJson } from '../src/usecases/updateThreadJson';
// import { deleteThreadJson } from '../src/usecases/deleteThreadJson';

const router = express.Router();
const threadRepo = new ThreadJsonRepo();
const messageRepo = new MessageJsonRepo();

router.get('/', async (req, res) => {
    try {
        const threads = await threadRepo.getAll();
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching threads', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const thread = await threadRepo.getById(Number(id));
        if (thread) {
            res.json(thread);
        } else {
            res.status(404).json({ message: 'thread not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thread', error });
    }
});

router.post('/', async (req, res) => {
    const formData = req.body;
    const userData = req.session.user;
    if (!userData) {
        // Maybe this could be changed to a json response
        return res.redirect('/users/login');
    }
    if (!formData) {
        res.status(400).json({ message: 'No data found' });
    }
    try {

        let threadData = {
            title: formData.title,
            user_id: userData.id,
        };
        const newThread = await createThreadJson(threadRepo, threadData);

        let messageData = {
            user_id: userData.id,
            body: formData.body,
            thread_id: newThread.id,
        }
        await createMessageJson(messageRepo, messageData);

        res.status(201).json(newThread);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thread', error });
    }
});

// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     try {
//         const updatedThread = await updateThreadJson(threadRepo, Number(id), updatedData);
//         if (updatedThread) {
//             res.json(updatedThread);
//         } else {
//             res.status(404).json({ message: 'Thread not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating Thread', error });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deleted = await deleteThreadJson(threadRepo, Number(id));
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ message: 'Thread not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting Thread', error });
//     }
// });

export default router;
