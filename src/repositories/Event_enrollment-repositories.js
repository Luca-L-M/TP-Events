import DataBaseHelper from "../helpers/db-helper";

export default class Event_enrollmentRepository
{
    //Listar Enrollment Endpoint:
    getAllAsync = async (id_event, filtro) =>
    {
        let returnArray = null;
        let sql = `
        SELECT
            json_build_object('id',E.id, 'id_event',E.id_event,
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','******') As user,
            'description',E.description, 'registration_date_time',E.registration_date_time, 'attended',E.attended, 'observations',E.observations, 'rating',E.rating) As collection
        FROM
            event_enrollment As E inner join users As U on E.id_user = U.id
        where
            E.id_event = $1,`;
        let values = [id_event];
        if(filtro.hasOwnProperty("first_name"))
        {
            sql += ` And U.first_name = $${values.length + 1}`;
            values.push(filtro.first_name);
        }
        if(filtro.hasOwnProperty("last_name"))
        {
            sql += ` And U.last_name = $${values.length + 1}`;
            values.push(filtro.last_name);
        }
        if(filtro.hasOwnProperty("username"))
        {
            sql += ` And U.username = $${values.length + 1}`;
            values.push(values.username);
        }
        if(filtro.hasOwnProperty("attended"))
        {
            sql += ` E.attended = $${values.length + 1}`;
            values.push(values.attended);
        }
        if(filtro.hasOwnProperty("rating"))
        {
            sql += ` E.rating = $${values.length + 1}`;
            values.push(values.rating);
        }

        returnArray = DataBaseHelper.requestValues(sql, values);
        return returnArray;
    }

    //Buscar enrollment en un evento
    getAllByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `
        SELECT
            ER.*
        FROM
            event_enrollment As ER inner join events As E on E.id = ER.id_event
        where
            E.id_event = $1`;
        const values = [id];

        returnArray = DataBaseHelper.requestValues(sql, values);
        return returnArray;
    }
}