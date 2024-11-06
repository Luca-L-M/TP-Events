import UsersRepository from '../repositories/users-repositories.js';
const repo = new UsersRepository();

export default class UsersServices
{
    LoginAsync = async (entity) =>
    {
        const returnArray = await repo.LoginAsync(entity);
        return returnArray;
    }
    RegisterAsync = async (entity) =>
    {
        const returnArray = await repo.RegisterAsync(entity);
        return returnArray;
    }
    VerificarUsuarioAsync = async (token) =>
    {
        const returnArray = await repo.VerificarUsuarioAsync(token);
        return returnArray;
    }
}