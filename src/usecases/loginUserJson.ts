import { User } from '../models/User';
import { UserJsonRepo } from '../repos/UserJsonRepo';

export const loginUserJson = async (userRepo: UserJsonRepo, userData: User): Promise<User | null> => {

    const allUsers = await userRepo.getAll();

    const user = allUsers.find(u => u.email === userData.email && u.password === userData.password);

    if (user) {
        return user;
    } else {
        return null;
    }
};
