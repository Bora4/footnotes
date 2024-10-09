import { BaseEntity } from "./BaseEntity";
import { Thread } from "./Thread";
import { UserResponse } from "./User";

export interface Message extends BaseEntity{
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