const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schemaConstants = require('../constants/schema')

const FifaGameSchema = new Schema({
    name: {
        type: String,
        required: [true, schemaConstants.NAME_MISSING]
    },
    year: {
        type: String,
        required: [true, schemaConstants.YEAR_MISSING]
    },
    poster: {
        type: String
    },
    uuid: {
        type: String,
        required: [true, schemaConstants.UUID_MISSING]
    }
})

class FifaGameClass {

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

    static async insert(game) {
        try {
            console.log(game)
            console.log('here to insert the game')
            return await this.create(game)
        }
        catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
// load class in the schema
FifaGameSchema.loadClass(FifaGameClass);
// make mongoose model
const FifaGameModel = mongoose.model('FifaGame', FifaGameSchema);
// export
module.exports = FifaGameModel