import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
const {Client, Pool} = pkg;

export default class UsersRepository
{
    LoginAsync = async (entity) =>
    {
        let returnArray = null;
        const KEY = 'claveToken';
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
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
            const consulta = await client.query(sql, values);
            await client.end();
            if(consulta != null)
            {
                const token = jwt.sign(login, KEY, options);
                const result =
                {
                    succcess: true,
                    message: '',
                    token: token
                }
                console.log(result);
                returnArray = result;
            }
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }
}