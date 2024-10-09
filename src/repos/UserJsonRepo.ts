import { Repo } from './Repo';
import { User } from '../models/User';
import { promises as fs } from 'fs';
import { UserResponse } from '../models/User';

const filePath = './data/users.json';

export class UserJsonRepo implements Repo<User> {

    private async readData(): Promise<User[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    private async writeData(users: User[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    private createUserResponse(user: User): UserResponse {
        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
    }

    private createUserResponses(users: User[]): UserResponse[] {
        return users.map(this.createUserResponse);
    }

    async getAll(): Promise<UserResponse[]> {
        const users = await this.readData();
        return this.createUserResponses(users);
    }

    async getById(id: number): Promise<UserResponse | null> {
        const users = await this.getAll()
        return users.find(user => user.id === id) || null;
    }

    async create(user: Omit<User, 'id'>): Promise<UserResponse> {
        const users = await this.readData();

        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = new User(newId, user.email, user.username, user.password);
        users.push(newUser);

        await this.writeData(users);
        return newUser;
    }

    async update(id: number, item: Partial<Omit<User, 'id'>>): Promise<UserResponse | null> {
        const users = await this.readData()
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
        const users = await this.readData()
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return false;
        }

        users[userIndex].deleted = new Date();
        await this.writeData(users);
        return true;
    }

    async login(userData: User): Promise<UserResponse | null> {
        const allUsers = await this.readData();

        const user = allUsers.find(u => u.email === userData.email && u.password === userData.password);

        if(user){
            return user;
        } else {
            return null;
        }

    }
}
