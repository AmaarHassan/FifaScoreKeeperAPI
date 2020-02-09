const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const PlayerService = require('../services/player');

const playerService = new PlayerService();

module.exports = async (req, res, next) => {
    try {
        if (req.body && req.url === '/graphql' && req.body.query) {
            const { query } = req.body;
            if (query &&
                (query.includes('IntrospectionQuery')
                    || query.includes('signup')
                    || query.includes('login')
                    || query.includes('verifyEmail')
                    || query.includes('forgotPassword')
                    || query.includes('changePassword')
                    || query.includes('publisher')
                    || query.includes('socialLogin')
                    || query.includes('__schema'))
            ) {
                return next();
            }
        }
        if (req.headers.authorization) {

            const token = req.headers.authorization;

            const options = {
                expiresIn: '7d',
                issuer: 'https://fakestwebever.com'
            };
            const secret = process.env.JWT_SECRET;

            const result = jwt.verify(token, secret, options);
            if (result) {
                const player = await playerService.get(result.uuid);
                if (!player.token) {
                    res.send(new AuthenticationError('UnAuthorized'));
                    return next();
                } else if (player.token && (player.token != token)) {
                    res.send(new AuthenticationError('Tokens do not match'));
                    return next();
                }
                req.player = result;
            } else {
                res.send(new AuthenticationError('Could not authorize. Try loggin in again'));
                return next();
            }
            next()
        } else {
            res.send(new AuthenticationError('Authorization token required'));
            return next()
        }
    } catch (error) {
        res.send(new AuthenticationError(error))
        return next();
    }

}