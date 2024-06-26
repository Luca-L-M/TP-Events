import LocationsRepository from '../repositories/locations-repositories.js';

export default class LocationsServices
{
    getAllAsync = async () =>
    {
        const repo = new LocationsRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        const repo = new LocationsRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

 
}