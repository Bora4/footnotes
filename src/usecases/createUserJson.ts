import { User } from '../models/User';
import { UserJsonRepo } from '../repos/UserJsonRepo';

//TODO: MAYBE change this to 'CreateType'
interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export const createUserJson = async (userRepo: UserJsonRepo, userData: CreateUserDTO): Promise<User> => {
    const newUser = {
        ...userData,
        created: new Date(),
        modified: new Date(),
        threads: [],
        messages: [],
    };

    const createdUser = await userRepo.create(newUser);
    return createdUser;
};
