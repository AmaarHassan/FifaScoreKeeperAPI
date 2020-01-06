const Schema = require('mongoose').Schema

const MatchPlayer = new Schema({
    player: {
        type: String
    },
    team: {
        type: String
    },
    goals: [{
        executed: {
            type: Boolean,
            default: false
        },
        member: {
            type: String
        },
        time: {
            type: Number
        }
    }],
    consensus: {
        type: Boolean,
        default: false
    }
})

module.exports = MatchPlayer