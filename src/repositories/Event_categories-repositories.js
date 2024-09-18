import DBConfig from '../configs/dbConfig.js';
const DBHelper = new DataBaseHelper;
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class CategoriaRepository
{
    //Listar event_categories
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM event_categories";
        returnArray = DBHelper.requestAll(sql);
        return returnArray;
    }

    //Busca event_categories por ID
    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM event_categories where id = $1`;
        const values = [id];
        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }
}