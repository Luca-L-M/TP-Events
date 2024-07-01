import Event_CategoriesRepository from '../repositories/event_categories-repositories.js';

export default class Event_categoriesServices
{
    getAllAsync = async () =>
    {
        const repo = new Event_categoriesRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        const repo = new Event_categoriesRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
}