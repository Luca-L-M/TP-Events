import {Router} from 'express';
import UsersServices from '../services/users-services.js';
import ValidationHelper from '../helpers/validation-helper.js';
const VHelper = new ValidationHelper;
const router = Router();
const svc = new UsersServices();

//login
router.post('/login', async (req, res) =>{
    let respuesta;
    const entity = req.body;
    const returnArray = await svc.LoginAsync(entity);
    if (VHelper.validarMail(entity.username) ) respuesta = res.status(400).send('mail invalido');
    else if (returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(401).send('username o contraseña invalida');
    return respuesta;
});

//registro
router.post('/register', async (req, res) =>{
    try {
        const entity = req.body;
        const returnArray = await svc.RegisterAsync(entity);
        if (VHelper.validarMail(entity.username))
        {
            return res.status(400).send('mail invalido');
        }
        else if (returnArray != null)
        {
            return res.status(201).json(returnArray);
        }
        else return res.status(400).send('Error interno');
    } catch (e) {
        console.log(e);
    }
});

export default router;