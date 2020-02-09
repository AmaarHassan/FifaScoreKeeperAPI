const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (req, res, next) => {
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
                req.player = result;
            } else {
                res.send(new AuthenticationError('Could not authorize. Try loggin in again'));
            }
            next()
        } else {
            res.send(new AuthenticationError('Authorization token required'));
        }
    } catch (error) {
        res.send(new AuthenticationError(error))
    }

}