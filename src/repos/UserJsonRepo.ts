import { FileSystemRepo } from './FileSystemRepo';
import { User } from '../models/User';
import {promises as fs} from 'fs';

const filePath = './data/users.json';

export class UserJsonRepo implements FileSystemRepo<User> {

    async readData(): Promise<User[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    async writeData(users: User[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    async getAll(): Promise<User[]> {
        return await this.readData();
    }

    async getById(id: number): Promise<User | null> {
        const users = await this.readData();
        return users.find(user => user.id === id) || null;
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        const users = await this.readData();

        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = { ...user, id: newId };
        users.push(newUser);

        await this.writeData(users);
        return newUser;
    }

    async update(id: number, item: Partial<Omit<User, 'id'>>): Promise<User | null> {
        const users = await this.readData();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return null;
        }

        const updatedUser = { ...users[userIndex], ...item, modified: new Date() };
        users[userIndex] = updatedUser;

        await this.writeData(users);
        return updatedUser;
    }

    async delete(id: number): Promise<boolean> {
        const users = await this.readData();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return false;
        }

        users[userIndex].deleted = new Date();
        await this.writeData(users);
        return true;
    }
}
