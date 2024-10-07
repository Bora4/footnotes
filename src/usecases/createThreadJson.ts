import { Thread } from '../models/Thread';
import { ThreadJsonRepo } from '../repos/ThreadJsonRepo';
import { Message } from '../models/Message';

//TODO: MAYBE change this to 'CreateType'
interface CreateThreadDTO {
    user_id: number;
    title: string;
    messages: Message[];
}

export const createThreadJson = async (threadRepo: ThreadJsonRepo, threadData: CreateThreadDTO): Promise<Thread> => {
    const newThread = {
        ...threadData,
        created: new Date(),
        modified: new Date(),
    };

    const createdThread = await threadRepo.create(newThread);
    return createdThread;
};
