const Schema = require('mongoose').Schema;

const MemberSchema = new Schema({
    name: {
        type: String
    },
    position: {
        type: String
    },
    avatar: {
        type: String
    },
    overall: {
        type: Number
    },
    captain: {
        type: Boolean,
        default: false
    },
    sub:{
        type: Boolean,
        default: false
    }
})

module.exports = MemberSchema