import {Router} from 'express';
import ProvinceServices from './../services/province-services.js'
const router = Router();
const svc = new ProvinceServices();

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

router.post('', async (req, res) =>{
    let respuesta;
    let entity = req.body;
    const returnArray = await svc.createAsync(entity);
    console.log(returnArray);
    if (returnArray != null)
    {
        respuesta = res.status(200).send('La provincia fue creada con exito');
    }
    else respuesta = res.status(500).send('Error interno')
    return respuesta;
});

router.put('', async (req, res) =>{
    let respuesta;
    let entity = req.body;
    const returnArray = await svc.updateAsync(entity);
    if (returnArray != null)
    {
        respuesta = res.status(200).send('La provincia fue modificada con exito');
    }
    else respuesta = res.status(500).send('Error interno')
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
    else respuesta = res.status(500).send('Error interno')
    return respuesta;
});

export default router;