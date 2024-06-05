import { Thread } from "../models/Thread";
import { Repo } from "./Repo";

export class ThreadRepo implements Repo<Thread> {
    private threads: Thread[] = [];

    async getAll(): Promise<Thread[]> {
        return this.threads;
    }

    async getById(id: number): Promise<Thread | null> {
        const thread = this.threads.find(t => t.id === id);
        return thread || null;
    }

    async create(thread: Thread): Promise<Thread> {
        this.threads.push(thread);
        return thread;
    }

    async update(id: number, updatedThread: Thread): Promise<Thread | null> {
        const index = this.threads.findIndex(t => t.id === id);
        if (index !== -1) {
            this.threads[index] = updatedThread;
            return updatedThread;
        }
        return null;
    }

    async delete(id: number): Promise<boolean> {
        const index = this.threads.findIndex(t => t.id === id);
        if (index !== -1) {
            this.threads.splice(index, 1);
            return true;
        }
        return false;
    }
}
