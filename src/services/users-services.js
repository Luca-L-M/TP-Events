import UsersRepository from '../repositories/usesr-repositories.js';

export default class UsersServices
{
    LoginAsync = async (entity) =>
    {
        const repo = new UsersRepository(entity);
        const returnArray = await repo.LoginAsync();
        return returnArray;
    }
}