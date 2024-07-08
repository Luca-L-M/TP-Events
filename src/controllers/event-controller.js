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
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const entity = req.body;
            const max_capcity = await svc.getMaxCapacity(entity.id_location);
            if (!(ValidationHelper.validarString(entity.name) || ValidationHelper.validarString(entity.descripcion)))
            {
                return res.status(400).send('El name o description están vacíos o tienen menos de tres (3) letras');
            }
            else if (entity.max_assistance > max_capcity)
            {
                return res.status(400).send('El max_assistance es mayor que el max_capacity del id_event_location');
            }
            else if (!(ValidationHelper.validarInt(entity.price) && ValidationHelper.validarInt(entity.duration_in_minutes)))
            {
                return res.status(400).send('El price o duration_in_minutes son menores que cero');
            }
            else
            {
                const returnArray = await svc.createAsync(entity);
                return res.status(201).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

//Modificar evento
router.put('', async (req, res) =>{
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const entity = req.body;
            const max_capcity = await svc.getMaxCapacity(entity.id_location);
            if (!(ValidationHelper.validarString(entity.name) || ValidationHelper.validarString(entity.descripcion)))
            {
                return res.status(400).send('El name o description están vacíos o tienen menos de tres (3) letras');
            }
            else if (entity.max_assistance > max_capcity)
            {
                return res.status(400).send('El max_assistance es mayor que el max_capacity del id_event_location');
            }
            else if (!(ValidationHelper.validarInt(entity.price) && ValidationHelper.validarInt(entity.duration_in_minutes)))
            {
                return res.status(400).send('El price o duration_in_minutes son menores que cero');
            }
            else
            {
                const returnArray = await svc.updateAsync(entity);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

//eliminar un evento
router.delete('/:id', async (req, res) =>{
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const enrollment = await Event_enrollmentServices.getMaxCapacity(id);
            if (enrollment == null)
            {
                return res.status(400).send('Bad request');
            }
            else
            {
                const returnArray = await svc.deleteByIdAsync(id);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
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