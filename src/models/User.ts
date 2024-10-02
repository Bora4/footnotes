import { BaseEntity } from "./BaseEntity";
import { Message } from "./Message";
import { Thread } from "./Thread";

export interface User extends BaseEntity{
    id: number;
    nickname: string;
    email: string;
    password: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    threads: Thread[];
    messages: Message[];
}