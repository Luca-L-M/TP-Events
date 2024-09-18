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
    validarMail = (data) =>
    {
        const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mail.test(data))
        {
            return true;
        }
        else return false;
    }
}