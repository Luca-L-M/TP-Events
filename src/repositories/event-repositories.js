import DataBaseHelper from "../helpers/db-helper";

export default class EventRepository
{
    //Listar eventos Endpoint:
    getAllAsync = async (filtro) =>
    {
        let returnArray = null;
        let sql = `
        SELECT
            E.id, E.name, 
            E.description,
            E.start_date,
            E.duration_in_minutes,
            E.price,
            E.enabled_for_enrollment,
            E.max_assistance, 
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') As User,
            json_build_object('id',C.id, 'name',C.name, 'display_order', C.display_order) As Category,
            json_build_object('id',EL.id, 'id_location',EL.id_location, 'name',EL.name, 'full_address',EL.full_address, 'max_capacity',EL.max_capacity, 'latitude',EL.latitude, 'longitude',EL.longitude, 'id_creator_user',EL.id_creator_user) As Ubication
        FROM
            events as E
            Inner Join users as U on E.id_creator_user = U.id
            Left join event_categories As C on E.id_event_category = C.id
            inner join event_locations As EL on E.id_event_location = EL.id
            Left join event_tags As ET on E.id = ET.id_event
            inner join tags As T on ET.id_tag = T.id
        Where 1=1`;
        let values = [];
        if (filtro.hasOwnProperty("name")) {
            sql += ` AND E.name = $${values.length + 1}`;
            values.push(filtro.name);
        }
        if (filtro.hasOwnProperty("category")) {
            sql += ` AND C.name = $${values.length + 1}`;
            values.push(filtro.category);
        }
        if (filtro.hasOwnProperty("start_date")) {
            sql += ` AND E.start_date = $${values.length + 1}`;
            values.push(filtro.start_date);
        }
        if (filtro.hasOwnProperty("tag")) {
            sql += ` AND T.name = $${values.length + 1}`;
            values.push(filtro.tag);
        }
        sql += ` Group by E.id, U.id, C.id, El.id`

        returnArray = DataBaseHelper.requestValues(sql,values);
        return returnArray;
    }

    //Detalles de un evento(id) Endpoint:
    getDetailsEventAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT 
            E.id, 
            E.name, 
            E.description, 
            E.start_date, 
            E.duration_in_minutes, 
            E.price, 
            E.enabled_for_enrollment, 
            E.max_assistance, 
            json_build_object('id', EL.id, 'id_location', EL.id_location, 'name', EL.name, 'full_address', EL.full_address, 'max_capacity', EL.max_capacity, 'latitude', EL.latitude, 'longitude', EL.longitude, 'id_creator_user', EL.id_creator_user) AS "Location",
            json_build_object('id', U.id, 'first_name', U.first_name, 'last_name', U.last_name, 'username', U.username, 'password', '*****') AS "Creator_user",
            json_build_object('id', T.id, 'name', T.name) AS "Tags",
            json_build_object('id', C.id, 'name', C.name, 'display_order', C.display_order) AS "Category"
        FROM 
            events AS E 
            INNER JOIN users AS U ON E.id_creator_user = U.id
            left JOIN event_categories AS C ON E.id_event_category = C.id
            INNER JOIN event_locations AS EL ON E.id_event_location = EL.id 
            INNER JOIN locations AS L ON EL.id_location = L.id 
            INNER JOIN provinces AS P ON L.id_province = P.id
            Left JOIN event_tags AS ET ON E.id = ET.id_event
            Left JOIN tags AS T ON ET.id_tag = T.id
        WHERE 
            E.id = $1
        Group by
            E.id, El.id, U.id, T.id, C.id`;
        const values = [id];
        returnArray = DataBaseHelper.requestOne(sql, values);
        return returnArray;
    }
}