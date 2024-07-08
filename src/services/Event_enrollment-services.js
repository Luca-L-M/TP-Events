import Event_enrollmentRepository from '../repositories/event_enrollment-repositories.js';

export default class Event_enrollmentRepositor
{
    //Listar enrollment
    getAllAsync = async (id_event, filtro) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.getAllAsync(id_event, filtro);
        return returnArray;
    }

    //Buscar enrollment en un evento
    getAllByIdAsync = async (id) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.getAllByIdAsync(id);
        return returnArray;
    }
}