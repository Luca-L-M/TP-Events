import UsersRepository from '../repositories/users-repositories.js';

export default class UsersServices
{
    LoginAsync = async (entity) =>
    {
        const repo = new UsersRepository();
        const returnArray = await repo.LoginAsync(entity);
        return returnArray;
    }
    RegisterAsync = async (entity) =>
    {
        const repo = new UsersRepository();
        const returnArray = await repo.RegisterAsync(entity);
        return returnArray;
    }
}