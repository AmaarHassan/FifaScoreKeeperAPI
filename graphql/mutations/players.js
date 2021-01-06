const PlayerService = require('../../services/player')
const LoginService = require('../../services/login')
const PlayerType = require('../types/output/player')
const { CreatePlayerInputType, LoginInputType } = require('../types/input/player')
const playerService = new PlayerService()
const authService = new LoginService();

const PlayerMutations = {
    // create a player
    createPlayer: {
        type: PlayerType.Player,
        args: {
            input: { type: CreatePlayerInputType }
        },
        resolve: async (parent, args) => {
            try {
                return await playerService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    },

    login: {
        type: PlayerType.LoggedIn,
        args: {
            input: { type: LoginInputType }
        },
        resolve: async (parent, args) => {
            try {
                const { email, password } = args.input;
                return await authService.login(email, password);
            } catch (error) {
                throw new Error('Could not login ', error)
            }
        }
    },

    logout: {
        type: PlayerType.LogoutType,
        resolve: async (parent, args, ctx) => {
            try {
                const player = ctx.req.player.uuid;
                return await authService.logout(player);
            } catch (error) {
                throw new Error('Could not login ', error)
            }
        }
    }
}

module.exports = PlayerMutations