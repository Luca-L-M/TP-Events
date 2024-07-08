import jwt from 'jsonwebtoken';

export default class AutheticationHelper
{
    authenticationToken = async (token) => {
        const KEY = 'claveToken';
        let token = token;
        let payload = null;
        try {
            payload = await jwt.verify(token, KEY);
        } catch (e) {
            console.log(e)
        }
        return payload;
    }
}