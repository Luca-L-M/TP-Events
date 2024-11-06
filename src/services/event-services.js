import EventRepository from '../repositories/event-repositories.js';
const repo = new EventRepository();

export default class EventServices
{
    //Listar eventos
    getAllAsync = async (filtro) =>
    {
        const returnArray = await repo.getAllAsync(filtro);
        return returnArray;
    }

    //Detalle evento
    getDetailsEventAsync = async (id) =>
    {
        const returnArray = await repo.getDetailsEventAsync(id);
        return returnArray;
    }

    //Devolver max_capacity
    getMaxCapacityAsync = async (id) =>
    {
        const returnArray = await repo.getMaxCapacityAsync(id);
        return returnArray;
    }

    //Devolver max_assistance
    getMaxAssistanceAsync = async (id) =>
    {
        const returnArray = await repo.getMaxAssistanceAsync(id);
        return returnArray;
    }

    //Crear evento
    createAsync = async (entity) =>
    {
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    //Modificar evento
    updateAsync = async (entity) =>
    {
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    //eliminar evento
    deleteByIdAsync = async (id) =>
    {
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }
}