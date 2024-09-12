import jwt from 'jsonwebtoken';

export default class AutheticationHelper
{
    authenticationToken = async (token) => {
        const KEY = 'claveToken';
        let Token = token;
        let payload = null;
        try {
            payload = await jwt.verify(Token, KEY);
        } catch (e) {
            console.log(e)
        }
        return payload;
    }
}