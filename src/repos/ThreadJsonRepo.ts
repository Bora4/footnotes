import { promises as fs } from 'fs';
import { Thread } from '../models/Thread';
import { FileSystemRepo } from './FileSystemRepo';
import { Message } from '../models/Message';
import { MessageJsonRepo } from './MessageJsonRepo';

const filePath = './data/threads.json';

export class ThreadJsonRepo implements FileSystemRepo<Thread> {
    async readData(): Promise<Thread[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    async writeData(threads: Thread[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(threads, null, 2), 'utf-8');
    }

    async getAll(): Promise<Thread[]> {
        return await this.readData();
    }

    async getById(id: number): Promise<Thread | null> {
        const threads = await this.readData();
        const messageRepo = new MessageJsonRepo();
        const messages = await messageRepo.readData();
        const thread = threads.find(thread => thread.id === id) || null;

        if (thread) {
            const threadMessages = messages.filter(message => message.thread_id === id);
            thread.messages = threadMessages;
        }

        return thread;
    }

    async create(thread: Omit<Thread, 'id'>): Promise<Thread> {
        const threads = await this.readData();

        const newId = threads.length > 0 ? threads[threads.length - 1].id + 1 : 1;

        const newthread = { ...thread, id: newId };
        threads.push(newthread);

        await this.writeData(threads);
        return newthread;
    }

    async update(id: number, item: Partial<Omit<Thread, 'id'>>): Promise<Thread | null> {
        const threads = await this.readData();
        const threadIndex = threads.findIndex(thread => thread.id === id);

        if (threadIndex === -1) {
            return null;
        }

        const updatedthread = { ...threads[threadIndex], ...item, modified: new Date() };
        threads[threadIndex] = updatedthread;

        await this.writeData(threads);
        return updatedthread;
    }

    async delete(id: number): Promise<boolean> {
        const threads = await this.readData();
        const threadIndex = threads.findIndex(thread => thread.id === id);

        if (threadIndex === -1) {
            return false;
        }

        threads[threadIndex].deleted = new Date();
        await this.writeData(threads);
        return true;
    }
}