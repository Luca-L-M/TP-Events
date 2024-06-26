import Event_enrollmentRepository from '../repositories/Event_enrollment-repositories.js';

export default class Event_enrollmentRepositor
{
    //Listar enrollment
    getAllAsync = async (id_event, filtro) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.getAllAsync(id_event, filtro);
        return returnArray;
    }
}