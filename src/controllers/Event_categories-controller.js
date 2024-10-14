import {Router} from 'express';
import ValidationHelper from '../helpers/validation-helper.js';
const VHelper = new ValidationHelper;
import AuthMiddleware from '../middlewares/authenticationMiddleware.js';
const Auth = new AuthMiddleware;
import Event_categoriesServices from '../services/event_categories-services.js';
const router = Router();
const svc = new Event_categoriesServices();

//devuelve todas las categorias
router.get('', Auth.AuthMiddleware, async (req, res) =>{
    const returnArray = await svc.getAllAsync();
    if (returnArray != null) return res.status(200).json(returnArray);
    else return res.status(500).send('Error interno');
});

router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray != null) return res.status(200).json(returnArray);
    else return res.status(404).send('No se encontro ningun resultado');
});

router.post('/:id', async (req, res) => {
    let createdEntity = false;
    try {
        const entity = req.body;
        if (v.fullLetters(entity.name))
        {
            createdEntity = await svc.createAsync(entity);
        }
        if (createdEntity){
            return res.status(201).send("Categoría creada");
        }
        else
        {
            return res.status(400).send("Datos inválidos.")
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno.");
    }
});

export default router;