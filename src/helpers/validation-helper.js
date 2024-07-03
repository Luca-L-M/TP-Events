export default class ValidationHelper
{
    //valida int
    validarInt = (data) => {
        if(data.parseInt())
        {
            return true;
        }
        else return false;
    }

    //validar Mail
    validarMail = (data) => {
        if(data)
        {
            return true;
        }
        else return false;
    }
}