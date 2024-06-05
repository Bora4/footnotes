import { Thread } from "./Thread";
import { User } from "./User";

export interface Message{
    body: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    user: User;
    thread: Thread;
}