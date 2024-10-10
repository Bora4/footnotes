// This is a router if you are going to use JSON filesystem as data source

import express from 'express';
import { MessageJsonRepo } from '../src/repos/MessageJsonRepo';
import { createMessageJson } from '../src/usecases/createMessageJson';
// import { updateMessageJson } from '../src/usecases/updateMessageJson';
// import { deleteMessageJson } from '../src/usecases/deleteMessageJson';

const router = express.Router();
const messageRepo = new MessageJsonRepo();

router.get('/', async (req, res) => {
    try {
        const messages = await messageRepo.getAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const Message = await messageRepo.getById(Number(id));
        if (Message) {
            res.json(Message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Message', error });
    }
});

router.post('/', async (req, res) => {
    const formData = req.body;
    const userData = req.session.user;
    if (!userData) {
        res.status(401).json({ message: 'User not found!'});
        return; // This is here to silence another error
    }
    if (!formData) {
        res.status(400).json({ message: 'No data found' });
    }
    try {

        //TODO: change this to CreateMessage type
        let messageData = {
            user_id: userData.id,
            thread_id: Number(formData.thread_id),
            body: formData.body,
        };
        const newMessage = await createMessageJson(messageRepo, messageData);

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: 'Error creating message', error });
    }
});

// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     try {
//         const updatedMessage = await updateMessageJson(messageRepo, Number(id), updatedData);
//         if (updatedMessage) {
//             res.json(updatedMessage);
//         } else {
//             res.status(404).json({ message: 'Message not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating Message', error });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deleted = await deleteMessageJson(messageRepo, Number(id));
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ message: 'Message not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting Message', error });
//     }
// });

export default router;
