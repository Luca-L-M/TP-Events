import Event_tagsRepository from './../repositories/event_tags-repositories.js';

export default class Event_tagsServices
{
    getAllAsync = async () =>
    {
        const repo = new Event_tagsRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        const repo = new Event_tagsRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

    createAsync = async (entity) =>
    {
        const repo = new Event_tagsRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    updateAsync = async (entity) =>
    {
        const repo = new Event_tagsRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    deleteByIdAsync = async (id) =>
    {
        const repo = new Event_tagsRepository();
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }
}