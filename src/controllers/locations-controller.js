import {Router} from 'express';
import LocationServices from '../services/location-services.js';
import Event_locationRepository from '../repositories/Event_location-repositories.js';
import AutheticationHelper from '../helpers/authetication-helper.js';
const AuthHelper = new AutheticationHelper;
const router = Router();
const svc = new LocationServices();

//listar todas las locations
router.get('', async (req, res) =>{
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send('Error interno')
    return respuesta;
});

//buscar una location
router.get('/:id', async (req, res) =>{
    let respuesta;
    let id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(404).send('No se encontro ningun resultado')
    return respuesta;
});

router.get('/:id/event-location', async (req, res) =>{
    try {
        if (AuthHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const returnArray = await Event_locationRepository.getByIdAsync(id);
            if (returnArray == null) return res.status(404).send('Not found');
            else return res.status(200).json(returnArray);
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});


export default router;