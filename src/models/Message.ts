import { BaseEntity } from "./BaseEntity";
import { Thread } from "./Thread";
import { UserResponse } from "./User";

export interface IMessage extends BaseEntity{
    id: number,
    user_id: number,
    thread_id: number,
    body: string;
    created: Date;
    modified: Date;
    deleted?: Date;

    /** @virtual */
    // These should only be populated dynamically
    user?: UserResponse;
    thread?: Thread;
}

export class Message implements IMessage {

    public created: Date;
    public modified: Date;

    constructor(
        public id: number,
        public user_id: number,
        public thread_id: number,
        public body: string,
        public deleted?: Date
    ) {
        this.created = new Date();
        this.modified = new Date();
    }
}