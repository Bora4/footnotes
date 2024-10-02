import { User } from '../models/User';
import { UserJsonRepo } from '../repos/UserJsonRepo';

export const updateUserJson = async (
    userRepo: UserJsonRepo,
    id: number,
    userData: Partial<Omit<User, 'id'>>
): Promise<User | null> => {
    return await userRepo.update(id, { ...userData });
};
