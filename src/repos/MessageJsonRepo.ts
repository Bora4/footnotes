import { promises as fs } from 'fs';
import { Message } from '../models/Message';
import { FileSystemRepo } from './FileSystemRepo';

const filePath = './data/messages.json';

export class MessageJsonRepo implements FileSystemRepo<Message>
{
    async readData(): Promise<Message[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    async writeData(messages: Message[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8');
    }

    async getAll(): Promise<Message[]> {
        return await this.readData();
    }

    async getById(id: number): Promise<Message | null> {
        const messages = await this.readData();

        return messages.find(message => message.id === id) || null;
    }
    async create(message: Omit<Message, 'id'>): Promise<Message> {
        const messages = await this.readData();

        const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
        const newMessage = { ...message, id: newId };

        messages.push(newMessage);

        await this.writeData(messages);
        return newMessage;
    }

    async update(id: number, item: Partial<Omit<Message, 'id'>>): Promise<Message | null> {
        const messages = await this.readData();
        const messageIndex = messages.findIndex(message => message.id === id);

        if (messageIndex === -1) {
            return null;
        }

        const updatedMessage = { ...messages[messageIndex], ...item, modified : new Date()};

        messages[messageIndex] = updatedMessage;

        await this.writeData(messages);
        return updatedMessage;
    }
    async delete(id: number): Promise<boolean> {

        const messages = await this.readData();

        const messageIndex = messages.findIndex(message => message.id === id);

        if (messageIndex === -1) {
            return false;
        }

        messages[messageIndex].deleted = new Date();

        await this.writeData(messages);
        return true;
    }

}