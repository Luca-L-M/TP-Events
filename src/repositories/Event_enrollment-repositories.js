import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class Event_enrollmentRepository
{
   //Listar Enrollment Endpoint:
   getAllAsync = async (id_event, filtro) =>
   {
       let returnArray = null;
       const client = new Client(DBConfig);
       try
       {
           await client.connect();
           const sql = `SELECT json_build_object('id',E.id, 'id_event',E.id_event,
           json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','******')As user,
           'description',E.description, 'registration_date_time',E.registration_date_time, 'attended',E.attended, 'observations',E.observations, 'rating',E.rating) As collection
           FROM event_enrollment As E inner join users As U on E.id_user = U.id where E.id_event = ${id_event},`;
           if(first_name != null) sql += ` U.first_name = ${filtro.first_name},`
           if(last_name != null) sql += `  U.last_name = ${filtro.last_name},`
           if(username != null) sql += ` U.username = ${filtro.username},`
           if(attended != null) sql += ` E.attended = ${filtro.attended},`
           if(rating != null) sql += ` E.rating = ${filtro.rating}`
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
}