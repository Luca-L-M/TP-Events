import DataBaseHelper from '../helpers/db-helper.js';
const DBHelper = new DataBaseHelper;
import jwt from 'jsonwebtoken';

export default class UsersRepository
{
    LoginAsync = async (entity) =>
    {
        let returnArray = null;
        const KEY = 'claveToken';
        try
        {
            const login =
            {
                username: entity.username,
                password: entity.password
            };
            const options =
            {
                expiresIn: '1h'
            };
            const sql = `select * From users Where username= $1 And password= $2`;
            const values = [entity.username, entity.password];
            
            const consulta = await DBHelper.requestOne(sql, values);
            if(consulta && consulta.username === entity.username)
            {
                const token = jwt.sign(consulta, KEY, options);
                const result =
                {
                    success: true,
                    message: '',
                    token: token
                }
                returnArray = result;
            }
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }

    RegisterAsync = async (entity) =>
    {
        const sql = `Insert into Users(first_name, last_name, username, password) Values ($1,$2,$3,$4)`;
        const values = [entity.first_name, entity.last_name, entity.username, entity.password];
        const returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    VerificarUsuarioAsync = async (token) =>
    {
        let returnArray = null;
        const Token = token;
        try
        {
            returnArray = jwt.verify(Token, KEY);
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }
}