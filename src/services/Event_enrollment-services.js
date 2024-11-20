import Event_enrollmentRepository from '../repositories/event_enrollment-repositories.js';
const repo = new Event_enrollmentRepository();

export default class Event_enrollmentServices
{
    //Listar enrollment
    getAllAsync = async (id_event, filtro) =>
    {
        const returnArray = await repo.getAllAsync(id_event, filtro);
        return returnArray;
    }

    //Buscar enrollment en un evento
    getAllByIdAsync = async (id) =>
    {
        const returnArray = await repo.getAllByIdAsync(id);
        return returnArray;
    }

    //Buscar un enrollment especifico
    getEnrollmentAsync = async (id_event, id_user) =>
    {
        const returnArray = await repo.getEnrollmentAsync(id_event, id_user);
        return returnArray;
    }

    //Devolver max_assistance
    getAssistanceAsync = async (id) =>
    {
        const returnArray = await repo.getAssistanceAsync(id);
        return returnArray;
    }

    //crear enrollment
    createAsync = async (entity, assistance, max_assistance) =>
    {
        const returnArray = await repo.createAsync(entity, assistance, max_assistance);
        return returnArray;
    }

    //eliminar enrollment
    deleteByIdAsync = async (id) =>
    {
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }
}