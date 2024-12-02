import DataBaseHelper from "../helpers/db-helper.js";
const DBHelper = new DataBaseHelper;

export default class Event_enrollmentRepository
{
    //Listar Enrollment Endpoint:
    getAllAsync = async (id_event, filtro = {}) =>
    {
        let returnArray = null;
        let sql = `
        SELECT
            E.id AS id,
            E.id_event AS id_event,
            U.id AS user_id,
            U.first_name AS first_name,
            U.last_name AS last_name,
            U.username AS username,
            E.description AS description,
            E.registration_date_time AS registration_date_time,
            E.attended AS attended,
            E.observations AS observations,
            E.rating AS rating
        FROM
            event_enrollments AS E
            Inner Join users AS U on E.id_user = U.id
        WHERE
            E.id_event = $1`;
        let values = [id_event];
        
        if(filtro.hasOwnProperty("first_name"))
        {
            sql = `${sql} And U.first_name = $${values.length + 1}`;
            values.push(filtro.first_name);
        }
        if(filtro.hasOwnProperty("last_name"))
        {
            sql = `${sql} And U.last_name = $${values.length + 1}`;
            values.push(filtro.last_name);
        }
        if(filtro.hasOwnProperty("username"))
        {
            sql = `${sql} And U.username = $${values.length + 1}`;
            values.push(filtro.username);
        }
        if(filtro.hasOwnProperty("attended"))
        {
            sql = `${sql} And E.attended = $${values.length + 1}`;
            values.push(filtro.attended);
        }
        if(filtro.hasOwnProperty("rating"))
        {
            sql = `${sql} And E.rating = $${values.length + 1}`;
            values.push(filtro.rating);
        }

        returnArray = await DBHelper.requestValues(sql, values);
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
            event_enrollments As ER inner join events As E on E.id = ER.id_event
        where
            E.id_event = $1`;
        const values = [id];

        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Buscar un enrollment especifico
    getEnrollmentAsync = async (id_event, id_user) =>
    {
        let returnArray = null;
        const sql = `
        SELECT
            *
        FROM
            event_enrollments
        where
            id_event = $1 and id_user = $2`;
        const values = [id_event, id_user];

        returnArray = DBHelper.requestOne(sql, values);
        return returnArray;
    }

    //Devolver asistencias
    getAssistanceAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT Distinct 
            *
        FROM 
            event_enrollments
        WHERE 
            id_event = $1`;
        const values = [id];
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Crear enrollment
    createAsync = async (entity, assistance, max_assistance) =>
    {
        console.log('inscipcion: ', entity);
        let returnArray = null;
        const today = new Date().toISOString().split('T')[0];
        const sql = `
        Insert into event_enrollments(id_event, id_user, description, registration_date_time, attended, observations, rating)
        Values ($1,$2,$3,$4,$5,$6,$7)`;
        const values = [entity.id_event, entity.id_user, entity.description, today, entity.attended, entity.observation || null, entity.rating || null]
        returnArray = DBHelper.requestCount(sql, values);

        //Si llega al maximo de assistencias cambia el estado a falso
        if(assistance + 1 == max_assistance)
        {
            const sql2 = `
            Update events Set enabled_for_enrollment=$2
            Where id = $1`;
            const values2 = [entity.id_event, false]
            const enrollment = DBHelper.requestCount(sql2, values2);
        }
        return returnArray;
    }

    //eliminar enrollment
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM event_enrollments where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}