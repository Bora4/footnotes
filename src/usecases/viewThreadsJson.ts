import { Thread } from "../models/Thread";
import { ThreadJsonRepo } from "../repos/ThreadJsonRepo";
export const viewThreadsJson = async (threadRepo: ThreadJsonRepo): Promise<Thread[]> => {
    return await threadRepo.getAll();
}
// TODO: delete this