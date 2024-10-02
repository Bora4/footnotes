import { BaseEntity } from "./BaseEntity";
import { Thread } from "./Thread";
import { User } from "./User";

export interface Message extends BaseEntity{
    id: number,
    user_id: number,
    thread_id: number,
    body: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    user: User;
    thread: Thread;
}