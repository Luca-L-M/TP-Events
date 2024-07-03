import DataBaseHelper from "../helpers/db-helper";

export default class ProvinceRepository
{
    //Listar provincias endpoint:
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM provinces";
        returnArray = DataBaseHelper.requestAll(sql);
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM provinces where id = $1`;
        const values = [id];
        returnArray = DataBaseHelper.requestValues(sql, values);
        return returnArray;
    }

    createAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Insert into provinces(name, full_name, latitude, longitude, display_order) Values ($1,$2,$3,$4,$5)`;
        const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order]
        returnArray = DataBaseHelper.requestCount(sql, values);
        return returnArray;
    }

    updateAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Update provinces Set name= $1, full_name= $2, latitude= $3, longitude= $4, display_order= $5 Where id= $6`;
        const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order, entity.id];
        returnArray = DataBaseHelper.requestCount(sql, values);
        return returnArray;
    }

    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM provinces where id = $1`;
        const values = [id]
        returnArray = DataBaseHelper.requestCount(sql, values);
        return returnArray;
    }
}