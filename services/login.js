const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const PlayerService = require('./player');
const playerService = new PlayerService();

module.exports = class PlayerService {

    async login(email, password) {
        try {
            const player = await playerService.getByEmail(email);
            if (!player) {
                throw new Error('Email not found')
            } else {
                const loginReponse = new Promise((resolve, reject) => {
                    bcrypt.compare(password, player.password, async (err, same) => {
                        if (err) {
                            reject(err)
                        }
                        if (same) {
                            const secret = process.env.JWT_SECRET;
                            const options = {
                                expiresIn: '7d',
                                issuer: 'https://fakestwebever.com'
                            }
                            let payload = player;
                            delete payload.token;
                            delete payload.password;
                            const token = jwt.sign(payload, secret, options)
                            await playerService.updateFields({ uuid: player.uuid, token });
                            resolve({ ...player, token })
                        }
                    })
                })
                return loginReponse
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}