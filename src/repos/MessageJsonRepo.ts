import { promises as fs } from 'fs';
import { Message } from '../models/Message';
import { Repo } from './Repo';
import { UserJsonRepo } from './UserJsonRepo';

const filePath = './data/messages.json';

export class MessageJsonRepo implements Repo<Message> {
    private async readData(): Promise<Message[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    private async writeData(messages: Message[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8');
    }

    async getAll(): Promise<Message[]> {
        const messages = await this.readData();
        const userRepo = new UserJsonRepo();

        const allUsers = await userRepo.getAll();

        const messagesWithUser = messages.map(message => {
            const user = allUsers.find(user => user.id === message.user_id);
            return {
                ...message,
                user: user
            };
        });
        return messagesWithUser;
    }

    async getById(id: number): Promise<Message | null> {
        const messages = await this.getAll();

        return messages.find(message => message.id === id) || null;
    }

    async getThreadMessages(thread_id: number): Promise<Message[]> {
    const allMessages = await this.getAll();

    const threadMessages = allMessages.filter(message => {
        return message.thread_id === thread_id;
    });

    return threadMessages;
}

    async create(message: Omit<Message, 'id'>): Promise<Message> {
        const messages = await this.getAll();

        const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;

        const newMessage = new Message(newId, message.user_id, message.thread_id, message.body);

        messages.push(newMessage);

        await this.writeData(messages);
        return newMessage;
    }

    async update(id: number, item: Partial<Omit<Message, 'id'>>): Promise<Message | null> {
        const messages = await this.getAll();
        const messageIndex = messages.findIndex(message => message.id === id);

        if (messageIndex === -1) {
            return null;
        }

        //TODO: change this to new Message();
        const updatedMessage = { ...messages[messageIndex], ...item, modified: new Date() };

        messages[messageIndex] = updatedMessage;

        await this.writeData(messages);
        return updatedMessage;
    }
    async delete(id: number): Promise<boolean> {

        const messages = await this.getAll();

        const messageIndex = messages.findIndex(message => message.id === id);

        if (messageIndex === -1) {
            return false;
        }

        messages[messageIndex].deleted = new Date();

        await this.writeData(messages);
        return true;
    }

}