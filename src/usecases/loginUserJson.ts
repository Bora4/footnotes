import { User, UserResponse } from '../models/User';
import { UserJsonRepo } from '../repos/UserJsonRepo';

export const loginUserJson = async (userRepo: UserJsonRepo, userData: User): Promise<UserResponse | null> => {

    return await userRepo.login(userData);
};
