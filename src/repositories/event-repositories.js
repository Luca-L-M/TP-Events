import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventRepository
{
    //Listar eventos Endpoint:
    getAllAsync = async () =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, 
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') AS "User",
            json_build_object('id',C.id, 'name',C.name, 'display_order',C.display_order) AS "Category",
            json_build_object('id',EL.id, 'id_location',EL.id_location, 'name',EL.name, 'full_address',EL.full_address, 'max_capacity',EL.max_capacity, 'latitude',EL.latitude, 'longitude',EL.longitude, 'id_creator_user',EL.id_creator_user) AS "Ubication"
            FROM events AS E Inner Join users AS U ON E.id_creator_user = U.id
            inner join event_categories AS C ON E.id_event_category = C.id
            inner join event_locations AS EL ON E.id_event_location = EL.id
            inner join event_tags AS ET ON E.id = ET.id_event inner join tags AS T ON ET.id_tag = T.id`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }

    //Buscar eventos Endpoint:
    getAllByFilterAsync = async (filtro) =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            let sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, 
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') As "User",
            json_build_object('id',C.id, 'name',C.name, 'display_order', C.display_order) As "Category",
            json_build_object('id',EL.id, 'id_location',EL.id_location, 'name',EL.name, 'full_address',EL.full_address, 'max_capacity',EL.max_capacity, 'latitude',EL.latitude, 'longitude',EL.longitude, 'id_creator_user',EL.id_creator_user) As "Ubication"
            FROM events as E Inner Join users as U on E.id_creator_user = U.id
            inner join event_categories As C on E.id_event_category = C.id
            inner join event_locations As EL on E.id_event_location = EL.id
            inner join event_tags As ET on E.id = ET.id_event inner join tags As T on ET.id_tag = T.id Where`;
            if(filtro.name != null) sql += ` E.name = ${filro.name},`
            if(filtro.category != null) sql += ` C.name = ${filtro.category},`
            if(filtro.start_date != null) sql += ` E.start_date = ${filtro.start_date},`
            if(filtro.tag != null) sql += ` T.name = ${filtro.tag}`
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error)
        {
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }

    //Detalles de un evento(id) Endpoint:
    getDetailsEventAsync = async (id) =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            /*let sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, 
            json_build_object('id',EL.id, 'id_location',EL.id_location, 'name',EL.name, 'full_address',EL.full_address, 'max_capacity',EL.max_capacity, 'latitude',EL.latitude, 'longitude',EL.longitude, 'id_creator_user',EL.id_creator_user,
                json_build_object('id',L.id, 'name',L.name, 'id_province',L.id_province, 'latitude',L.latitude, 'longitude',L.longitude,
                    json_build_object('id',P.id, 'name',P.name, 'full_name',P.full_name, 'latitude',P.latitude, 'longitude',P.longitude, 'display_order',P.display_order) AS "Province") AS "Location",
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') AS "Creator_user") AS "Event_location",
            json_build_object('id',T.id, 'name',T.name) AS "Tags",
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') AS "Creator_user",
            json_build_object('id',C.id, 'name',C.name, 'display_order',C.display_order) AS "Category"
            FROM events AS E INNER JOIN users AS U ON E.id_creator_user = U.id
            INNER JOIN event_categories AS C ON E.id_event_category = C.id
            INNER JOIN event_locations AS EL ON E.id_event_location = EL.id INNER JOIN locations AS L ON EL.id_location = L.id INNER JOIN provinces AS P ON L.id_province = P.id
            INNER JOIN event_tags AS ET ON E.id = ET.id_event INNER JOIN tags AS T ON ET.id_tag = T.id
            Where E.id = ${id}`;*/
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
                INNER JOIN event_categories AS C ON E.id_event_category = C.id
                INNER JOIN event_locations AS EL ON E.id_event_location = EL.id 
                INNER JOIN locations AS L ON EL.id_location = L.id 
                INNER JOIN provinces AS P ON L.id_province = P.id
                INNER JOIN event_tags AS ET ON E.id = ET.id_event 
                INNER JOIN tags AS T ON ET.id_tag = T.id
            WHERE 
                E.id = ${id}`;
            const events = await client.query(sql);
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