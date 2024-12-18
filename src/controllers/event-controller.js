import {Router} from 'express';
import EventServices from '../services/event-services.js';
import EventEnrollmentServices from '../services/event_enrollment-services.js';
import ValidationHelper from '../helpers/validation-helper.js';
const VHelper = new ValidationHelper;
import AuthMiddleware from '../middleware/authentication-middleware.js';
const Auth = new AuthMiddleware;
const router = Router();
const svc = new EventServices();
const enrollment = new EventEnrollmentServices();

//Listar eventos
router.get('', Auth.AuthMiddleware, async (req, res) =>{
    const filtro = req.query;
    const returnArray = await svc.getAllAsync(filtro);
    if (returnArray != null)
    {
        return res.status(200).json(returnArray);
    }
    else return res.status(500).send('Error interno')
});

//Detalle evento
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const returnArray = await svc.getDetailsEventAsync(id);
    if (returnArray != null)
    {
        return res.status(200).json(returnArray);
    }
    else return res.status(404).send('Not found')
});

//Listar participantes
router.get('/:id/enrollment', async (req, res) =>{
    const id_event = req.params.id;
    const filtro = req.query;

    const returnArray = await enrollment.getAllAsync(id_event, filtro);
    if (returnArray != null)
    {
        return res.status(200).json(returnArray);
    }
    else return res.status(404).send('No se encontro ningun resultado');
});

//Crear evento
router.post('', Auth.AuthMiddleware, async (req, res) =>{
    try {
        const entity = req.body;
        const max_capcity = await svc.getMaxCapacityAsync(entity.id_event_location);
        if (!(VHelper.validarString(entity.name) || VHelper.validarString(entity.descripcion)))
        {
            return res.status(400).send('El name o description están vacíos o tienen menos de tres (3) letras');
        }
        else if (entity.max_assistance > max_capcity)
        {
            return res.status(400).send('El max_assistance es mayor que el max_capacity del id_event_location');
        }
        else if (!(VHelper.validarInt(entity.price) && VHelper.validarInt(entity.duration_in_minutes)))
        {
            return res.status(400).send('El price o duration_in_minutes son menores que cero');
        }
        else
        {
            const returnArray = await svc.createAsync(entity);
            return res.status(201).json(returnArray);
        }
    } catch (e) {
        console.log(e);
    }
});

//Modificar evento
router.put('', Auth.AuthMiddleware, async (req, res) =>{
    try {
        const entity = req.body;
        const max_capcity = await svc.getMaxCapacityAsync(entity.id_event_location);
        if (!(VHelper.validarString(entity.name) || VHelper.validarString(entity.descripcion)))
        {
            return res.status(400).send('El name o description están vacíos o tienen menos de tres (3) letras');
        }
        else if (entity.max_assistance > max_capcity)
        {
            return res.status(400).send('El max_assistance es mayor que el max_capacity del id_event_location');
        }
        else if (!(VHelper.validarInt(entity.price) && VHelper.validarInt(entity.duration_in_minutes)))
        {
            return res.status(400).send('El price o duration_in_minutes son menores que cero');
        }
        else
        {
            const returnArray = await svc.updateAsync(entity);
            if (returnArray == null) return res.status(404).send('Not found');
            else return res.status(200).json(returnArray);
        }
    } catch (e) {
        console.log(e);
    }
});

//eliminar un evento
router.delete('/:id', Auth.AuthMiddleware, async (req, res) =>{
    try {
        const id = req.params.id;

        const assistance = await enrollment.getAssistanceAsync(id);
        if (assistance != null)
        {
            return res.status(400).send('Bad request');
        }
        else
        {
            const returnArray = await svc.deleteByIdAsync(id);
            if (returnArray == null) return res.status(404).send('Not found');
            else return res.status(200).json(returnArray);
        }
    } catch (e) {
        console.log(e);
    }
});

//Inscribirse a un evento
router.post('/:id/enrollment', Auth.AuthMiddleware, async (req, res) =>{
    try {
        const entity = req.body;
        const Evento = await svc.getDetailsEventAsync(entity.id_event);
        const existe = await enrollment.getEnrollmentAsync(entity.id_event, entity.id_user);
        const today = Date.now();
        const assistance = await enrollment.getAssistanceAsync(entity.id_event);
        if (assistance + 1 > Evento.max_assistance)
        {
            return res.status(400).send('Exceda la capacidad máxima de registrados (max_assistance) al evento.');
        }
        else if (Evento.start_date < today)
        {
            return res.status(400).send('El evento ya empezo o ya termino');
        }
        else if (Evento.enable_for_enrollment)
        {
            return res.status(400).send('El evento no esta habilitado para la inscripcion');
        }
        else if (existe) {
            return res.status(400).send('El usuario ya está inscrito');
        }
        else
        {
            const returnArray = await enrollment.createAsync(entity, assistance, Evento.max_assistance);
            if (returnArray == null) return res.status(404).send('Not found');
            else return res.status(201).json(returnArray);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error interno');
    }
});

//eliminar un enrollment
router.delete('/:id/enrollment', async (req, res) =>{
    try {
        if (AuthHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const Evento = await svc.getDetailsEventAsync(id);
            const existe = await enrollment.getEnrollmentAsync(entity.id_event, entity.id_user);
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
                const returnArray = await enrollment.deleteByIdAsync(id);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else return res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

//rating HACER (QUE MIERDA ES UN PATCH?)
router.patch('/:id/enrollment/:entero', async (req, res) =>{
    try {
        if (AuthHelper.authenticationToken(req.token))
        {
            const id = req.params.id;
            const Evento = await svc.getDetailsEventAsync(id);
            const existe = await enrollment.getEnrollmentAsync(entity.id_event, entity.id_user);
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
                const returnArray = await enrollment.deleteByIdAsync(id);
                if (returnArray == null) return res.status(404).send('Not found');
                else return res.status(200).json(returnArray);
            }
        }
        else return res.status(401).send('Unauthorized');
    } catch (e) {
        console.log(e);
    }
});

export default router;