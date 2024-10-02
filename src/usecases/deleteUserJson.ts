import { UserJsonRepo } from '../repos/UserJsonRepo';

export const deleteUserJson = async (userRepo: UserJsonRepo, id: number): Promise<boolean> => {
    return await userRepo.delete(id);
};
