import {Router} from 'express';
import EventServices from '../services/event-services.js';
import Event_enrollmentServices from '../services/event_enrollment-services.js';
import ValidationHelper from '../helpers/validation-helper.js';
import AutheticationHelper from '../helpers/authetication-helper.js';
const router = Router();
const svc = new EventServices();

//Listar eventos
router.get('', async (req, res) =>{
    let respuesta;
    const filtro = req.query;
    const returnArray = await svc.getAllAsync(filtro);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send('Error interno')
    return respuesta;
});

//Detalle evento
router.get('/:id', async (req, res) =>{
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getDetailsEventAsync(id);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(404).send('Not found')
    return respuesta;
});

//Listar participantes
router.get('/:id/enrollment', async (req, res) =>{
    let respuesta;
    const {id_event} = req.params.id;
    const {filtro} = req.query;
    const returnArray = await Event_enrollmentServices.getAllAsync(id_event, filtro);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(404).send('No se encontro ningun resultado')
    return respuesta;
});

//Crear evento
router.post('', async (req, res) =>{
    if (AutheticationHelper.authenticationToken(req.token))
    {
        let respuesta;
        const entity = req.body;
        const max_capcity = await svc.getMaxCapacity(entity.id_location);
        if (ValidationHelper.validarString(entity.name) && ValidationHelper.validarString(entity.descripcion) && max_assistance > max_capcity)
        {
            const returnArray = await svc.createEventAsync(entity);
            if (returnArray != null)
            {
                respuesta = res.status(201).json(returnArray);
            }
            else respuesta = res.status(400).send('Error interno')
        }
    }
    else respuesta = res.status(401).send('Unauthorized')
    return respuesta;
});

//Inscribirse a un evento
router.post('/:id/enrollment', async (req, res) =>{
    if (AutheticationHelper.authenticationToken(req.token))
    {
        let respuesta;
        const {id_event} = req.params.id;
        const returnArray = await Event_enrollmentServices.getAllAsync(id_event, filtro);
        if (returnArray != null)
        {
            respuesta = res.status(201).json(returnArray);
        }
        else respuesta = res.status(400).send('Bad request')
    }
    return respuesta;
});

export default router;