import { BaseEntity } from "./BaseEntity";
import { Message } from "./Message";
import { Thread } from "./Thread";

export interface IUser extends BaseEntity{
    id: number;
    username: string;
    email: string;
    password: string;
    created: Date;
    modified: Date;
    deleted?: Date;

    /** @virtual */
    // These should only be populated dynamically
    threads?: Thread[];
    messages?: Message[];
}
export class User implements IUser {

    public created: Date;
    public modified: Date;

    constructor(
        public id: number,
        public email: string,
        public username: string,
        public password: string,
        public deleted?: Date
    ) {
        this.created = new Date();
        this.modified = new Date();
    }
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
}