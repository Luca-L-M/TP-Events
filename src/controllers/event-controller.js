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
            const max_capcity = await svc.getMaxCapacityAsync(entity.id_location);
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
            const assistance = await Event_enrollmentServices.getAssistanceAsync(id);
            if (assistance == null)
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
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const entity = req.body;
            const Evento = await svc.getDetailsEventAsync(entity.id_event);
            const existe = await Event_enrollmentServices.getEnrollmentAsync(entity.id_event, entity.id_user);
            const today = Date.now();
            const assistance = await Event_enrollmentServices.getAssistanceAsync(entity.id_evento);
            if (assistance + 1 > Evento.max_assistance)
            {
                return res.status(400).send('Exceda la capacidad máxima de registrados (max_assistance) al evento.');
            }
            else if (Evento.start_date > today)
            {
                return res.status(400).send('El evento ya empezo o ya termino');
            }
            else if (!Evento.enable_for_enrollment)
            {
                return res.status(400).send('El evento no esta habilitado para la inscripcion');
            }
            else if (existe != null)
            {
                return res.status(400).send('El usuario ya esta inscrito');
            }
            else
            {
                const returnArray = await Event_enrollmentServices.createAsync(entity);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(201).json(returnArray);                return res.status(201).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

//eliminar un enrollment
router.delete('/:id/enrollment', async (req, res) =>{
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const Evento = await svc.getDetailsEventAsync(id);
            const existe = await Event_enrollmentServices.getEnrollmentAsync(entity.id_event, entity.id_user);
            if (existe == null)
            {
                return res.status(400).send('El usuario no esta inscrito a este evento');
            }
            else if (Evento.start_date > today)
            {
                return res.status(400).send('El evento ya empezo o ya termino');
            }
            else
            {
                const returnArray = await Event_enrollmentServices.deleteByIdAsync(id);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

//rating HACER (QUE MIERDA ES UN PATCH?)
router.patch('/:id/enrollment/:entero', async (req, res) =>{
    try {
        if (AutheticationHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const Evento = await svc.getDetailsEventAsync(id);
            const existe = await Event_enrollmentServices.getEnrollmentAsync(entity.id_event, entity.id_user);
            if (existe == null)
            {
                return res.status(400).send('El usuario no esta inscrito a este evento');
            }
            else if (Evento.start_date > today)
            {
                return res.status(400).send('El evento ya empezo o ya termino');
            }
            else
            {
                const returnArray = await Event_enrollmentServices.deleteByIdAsync(id);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else respuesta = res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

export default router;