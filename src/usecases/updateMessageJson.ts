import { MessageJsonRepo } from '../repos/MessageJsonRepo';
import { Message } from '../models/Message';

export const updateMessageJson = async (
    messageRepo: MessageJsonRepo,
    id: number,
    messageData: Partial<Omit<Message, 'id'>>
): Promise<Message | null> => {
    return await messageRepo.update(id, { ...messageData });
};
