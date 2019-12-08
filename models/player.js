const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaConstants = require('../constants/schema');
const regexConstants = require('../constants/regex');

// validation schema with mongoose

const PlayerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, schemaConstants.FIRST_NAME_MISSING]
    },
    lastName: {
        type: String,
        required: [true, schemaConstants.LAST_NAME_MISSING]
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return regexConstants.EMAIL_REGEX.test(v);
            },
            message: props => `${props.value} ${schemaConstants.INVALID_EMAIL}`
        },
        required: [true, schemaConstants.EMAIL_MISSING]
    },
    password: {
        type: String,
        required: [true, schemaConstants.PASSWORD_MISSING],
        minlength: [8, schemaConstants.PASSWORD_INVALID_LENGTH]
    },
    uuid: {
        type: String,
        required: [true, schemaConstants.UUID_MISSING]
    }
})

class PlayerClass {

    // this is for gettin all players
    static async getAll() {
        try {
            return await this.find(
                // condition
                {},
                // returns
                { _id: false, __v: false }
            );
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    // get single player??
    static async get(uuid) {
        try {
            return await this.findOne(
                // condition
                { uuid: uuid },
                // returns
                { _id: false, __v: false }
            );
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async insert(player) {
        try {
            return await this.create(player)
        }
        catch (error) {
            console.log(error);
            return error
        }
    }
}
// load class in the schema
PlayerSchema.loadClass(PlayerClass);
// make mongoose model
const PlayerModel = mongoose.model('Players', PlayerSchema);
// export
module.exports = PlayerModel