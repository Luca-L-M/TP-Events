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

    //Buscar un enrollment especifico
    getEnrollmentAsync = async (id_event, id_user) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.getEnrollmentAsync(id_event, id_user);
        return returnArray;
    }

    //Devolver max_assistance
    getAssistanceAsync = async (id) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.getAssistanceAsync(id);
        return returnArray;
    }

    //crear enrollment
    createAsync = async (entity) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    //eliminar enrollment
    deleteByIdAsync = async (id) =>
    {
        const repo = new Event_enrollmentRepository();
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }
}