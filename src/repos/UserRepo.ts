import { User } from "../models/User";
import { Repo } from "./Repo";

export class UserRepo implements Repo<User>{
    private users: User[] = [];
    async getAll(): Promise<User[]> {
        return this.users;
    }

    async getById(id: number): Promise<User | null> {
        return 
    }
}