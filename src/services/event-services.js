import EventRepository from '../repositories/event-repositories.js';

export default class EventServices
{
    //Listar eventos
    getAllAsync = async (filtro) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync(filtro);
        return returnArray;
    }

    //Detalle evento
    getDetailsEventAsync = async (id) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getDetailsEventAsync(id);
        return returnArray;
    }

    //Devolver max_capacity
    getMaxCapacityAsync = async (id) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getMaxCapacityAsync(id);
        return returnArray;
    }

    //Crear evento
    createAsync = async (entity) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    //Modificar evento
    updateAsync = async (entity) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }
}