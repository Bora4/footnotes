import { MessageJsonRepo } from '../repos/MessageJsonRepo';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Thread } from '../models/Thread';

//TODO: MAYBE change this to 'CreateType'
interface CreateMessageDTO {
    body: string,
    user_id: number,
    thread_id: number,
}

export const createMessageJson = async (messageRepo: MessageJsonRepo, messageData: CreateMessageDTO): Promise<Message> => {
    const newMessage = {
        ...messageData,
        created: new Date(),
        modified: new Date(),
    };

    const createdMessage = await messageRepo.create(newMessage);
    return createdMessage;
};
