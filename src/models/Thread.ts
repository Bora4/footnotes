import { Message } from "./Message";

export interface Thread{
    id: number;
    title: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    messages: Message[];
}