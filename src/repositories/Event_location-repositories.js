import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class Event_locationRepository
{
    getAllAsync = async () =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'SELECT * FROM event_locations';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id_location) =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = `SELECT * FROM event_locations where id = ${id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }


}