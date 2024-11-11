import Event_CategoriesRepository from '../repositories/event_categories-repositories.js';
const repo = new Event_CategoriesRepository();

export default class Event_categoriesServices
{
    getAllAsync = async () =>
    {
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) =>
    {
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
}