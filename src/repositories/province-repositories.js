import DataBaseHelper from "../helpers/db-helper.js";

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

    //Busca provincia por ID
    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM provinces where id = $1`;
        const values = [id];
        returnArray = DataBaseHelper.requestValues(sql, values);
        return returnArray;
    }

    //Lisata locaciones en una provincia
    getLocationByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT L.* FROM provinces As P inner join locations As L On P.id = L.id_province where P.id = $1`;
        const values = [id];
        returnArray = DataBaseHelper.requestValues(sql, values);
        return returnArray;
    }

    //Crea una provincia
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