import { MessageJsonRepo } from "../repos/MessageJsonRepo";
export const deleteMessageJson = async (messageRepo: MessageJsonRepo, id: number): Promise<boolean> => {
    return await messageRepo.delete(id);
};
