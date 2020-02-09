const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const extendSchema = require('mongoose-extend-schema')
const BaseSchema = require('./baseSchema')
const schemaConstants = require('../constants/schema')
const regexConstants = require('../constants/regex')

// validation schema with mongoose
const PlayerSchema = extendSchema(BaseSchema, {
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
    },
    token: {
        type: String
    }
})

PlayerSchema.pre('save', function (next) {
    const player = this;
    // not for old players
    if (!player.isModified || !player.isNew) {
        next();
    } else {
        bcrypt.hash(player.password, 10, function (err, encrypted) {
            if (err) {
                consoe.log('Could not hash the password ', err)
                next(err)
            } else {
                player.password = encrypted
                next()
            }
        })
    }
})

class PlayerClass {

    static async getAll(query) {
        try {
            let { conditions, filter, skip, limit, order } = query;
            return await this.find(
                conditions,
                filter
            ).limit(limit).skip(skip).sort(order).lean();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async get(uuid) {
        try {
            return await this.findOne(
                // condition
                { uuid: uuid },
                // returns
                { _id: false, __v: false }
            ).lean();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async getByEmail(email) {
        try {
            return await this.findOne(
                // condition
                { email },
                // returns
                { _id: false, __v: false }
            ).lean();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async getMultipleByUuids(uuids) {
        try {
            return await this.find(
                // condition
                { uuid: { $in: uuids } },
                // returns
                { _id: false, __v: false }
            ).lean();
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
            throw new Error(error)
        }
    }

    static async updateFields(fields) {
        try {
            return await this.update({ uuid: fields.uuid }, fields)
        }
        catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
// load class in the schema
PlayerSchema.loadClass(PlayerClass);
// make mongoose model
const PlayerModel = mongoose.model('Players', PlayerSchema);
// export
module.exports = PlayerModel