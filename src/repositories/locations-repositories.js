import DataBaseHelper from "../helpers/db-helper";

export default class LocationsRepository
{
    getAllAsync = async () =>
    {

        try
        {
            const sql = 'SELECT * FROM locations';
            const result = await DataBaseHelper.requestAll(sql);
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        try
        {
            const sql = `SELECT * FROM locations where id = ${id}`;
            const result = await DataBaseHelper.requestValues(sql);
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        return returnArray;
    }
}