import Event_locationRepository from '../repositories/event_location-repositories.js';

export default class Event_locationServices
{
    getAllAsync = async () =>
    {
        const repo = new Event_locationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        const repo = new Event_locationRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
}