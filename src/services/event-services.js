import EventRepository from '../repositories/event-repositories.js';

export default class EventServices
{
    //Listar eventos
    getAllAsync = async () =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    //Buscar eventos, ver como hacer para utilizar más de 1 a la vez
    getAllByFilterAsync = async (filtro) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getAllByFilterAsync(filtro);
        return returnArray;
    }

    //Detalle evento
    getDetailsEventAsync = async (id) =>
    {
        const repo = new EventRepository();
        const returnArray = await repo.getDetailsEventAsync(id);
        return returnArray;
    }
}