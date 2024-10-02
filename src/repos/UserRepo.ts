import { promises as fs } from 'fs';
import { User } from '../models/User';
import { Repo } from './Repo';

//TODO: change this to DB repo

const filePath = './data/users.json';

export class UserRepo implements Repo<User> {
    private async readJsonFile(): Promise<User[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    private async writeJsonFile(users: User[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    async getAll(): Promise<User[]> {
        return await this.readJsonFile();
    }

    async getById(id: number): Promise<User | null> {
        const users = await this.readJsonFile();
        return users.find(user => user.id === id) || null;
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        const users = await this.readJsonFile();

        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = { ...user, id: newId };
        users.push(newUser);

        await this.writeJsonFile(users);
        return newUser;
    }

    async update(id: number, item: Partial<Omit<User, 'id'>>): Promise<User | null> {
        const users = await this.readJsonFile();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return null;
        }

        const updatedUser = { ...users[userIndex], ...item, modified: new Date() };
        users[userIndex] = updatedUser;

        await this.writeJsonFile(users);
        return updatedUser;
    }

    async delete(id: number): Promise<boolean> {
        const users = await this.readJsonFile();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return false;
        }

        users[userIndex].deleted = new Date();
        await this.writeJsonFile(users);
        return true;
    }
}