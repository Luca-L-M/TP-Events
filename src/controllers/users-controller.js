import {Router} from 'express';
import UsersServices from '../services/users-services.js';
const router = Router();
const svc = new UsersServices();

//login
router.post('/login', async (req, res) =>{
    let respuesta;
    const entity = req.body;
    const returnArray = await svc.LoginAsync(entity);
    //if (ValidarHelper.comprobarUsername(entity.username) ) respuesta = res.status(400).send('mail invalido');
    if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(401).send('username o contraseña invalida');
    return respuesta;
});

//registro
router.post('/register', async (req, res) =>{
    let respuesta;
    const entity = req.body;
    const returnArray = await svc.RegisterAsync(entity);
    // //if (ValidarHelper.comprobarUsername(entity.username))
    // {
    //     respuesta = res.status(400).send('mail invalido');
    // }
    if (returnArray != null)
    {
        respuesta = res.status(201).json(returnArray);
    }
    else respuesta = res.status(400).send('Error interno');
    return respuesta;
});

export default router;