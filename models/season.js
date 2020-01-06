const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')
const BaseSchema = require('./baseSchema')
const schemaConstants = require('../constants/schema')

const SeasonSchema = extendSchema(BaseSchema, {
    title: {
        type: String,
        default: 'Misc',
        required: [true, schemaConstants.NAME_MISSING]
    },
    startedAt: {
        type: Date,
        default: new Date()
    },
    uuid: {
        type: String,
        required: [true, schemaConstants.UUID_MISSING]
    }
})

class SeasonClass {

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
            );
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async insert(season) {
        try {
            return await this.create(season)
        }
        catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
// load class in the schema
SeasonSchema.loadClass(SeasonClass);
// make mongoose model
const SeasonModel = mongoose.model('Season', SeasonSchema);
// export
module.exports = SeasonModel