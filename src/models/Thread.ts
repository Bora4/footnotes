import { BaseEntity } from "./BaseEntity";
import { Message } from "./Message";

export interface Thread extends BaseEntity{
    id: number;
    title: string;
    created: Date;
    modified: Date;
    deleted?: Date;
    messages: Message[];
}