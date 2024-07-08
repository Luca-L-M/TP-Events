import {Router} from 'express';
import ProvinceServices from '../services/province-services.js'
import ValidationHelper from '../helpers/validation-helper.js'
const router = Router();
const svc = new ProvinceServices();

//Lista de provincias
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

//Busca provincia por ID
router.get('/:id', async (req, res) =>{
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(404).send('No se encontro ningun resultado')
    return respuesta;
});

//Lista locaciones en una provincia
router.get('/:id/location', async (req, res) =>{
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getLocationByIdAsync(id);
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(404).send('No se encontro ningun resultado');
    return respuesta;
});

router.post('', async (req, res) =>{
    try {
        const entity = req.body;
        if (!(ValidationHelper.validarString(entity.name)))
        {
            res.status(400).send('El campo name está vacío o tiene menos de tres (3) letras');
        }
        else if (!(ValidationHelper.validarInt(entity.latitude) && ValidationHelper.validarInt(entity.longitude)))
        {
            res.status(400).send('Los campos latitude y longitude no son números');
        }
        else
        {
            const returnArray = await svc.createAsync(entity);
            if (returnArray != null)
            {
                res.status(201).send('La provincia fue creada con exito');
            }
        }
    } catch (e) {
        console.log(e);
    }
});

router.put('', async (req, res) =>{
    let respuesta;
    let entity = req.body;
    if (ValidationHelper.validarString(entity.name) &&  ValidationHelper.validarInt(entity.latitude) && ValidationHelper.validarInt(entity.longitude))
    {
        respuesta = res.status(400).send('Bad request')
    }
    else
    {
        const returnArray = await svc.updateAsync(entity);
        if (returnArray != null)
        {
            respuesta = res.status(200).send('La provincia fue modificada con exito');
        }
        else respuesta = res.status(404).send('No se encontro ningun resultado')
    }
    return respuesta;
});

router.delete('/:id', async (req, res) =>{
    let respuesta;
    let id = req.params.id;
    const returnArray = await svc.deleteByIdAsync(id);
    if (returnArray != null)
    {
        respuesta = res.status(200).send('La provincia fue eliminada con exito')
    }
    else respuesta = res.status(404).send('No se encontro ningun resultado')
    return respuesta;
});

export default router;