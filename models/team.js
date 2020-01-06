const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schemaConstants = require('../constants/schema')
const Member = require('./memberSchema')

const TeamSchema = new Schema({
    name: {
        type: String
    },
    game: {
        // later we can put reference of uuid of the fifa game document
        type: String
    },
    stars: {
        type: Number
    },
    league: {
        type: String
    },
    logo: {
        type: String
    },
    attack: {
        type: Number
    },
    midfield: {
        type: Number
    },
    defence: {
        type: Number
    },
    members: [Member],
    uuid: {
        type: String,
        required: [true, schemaConstants.UUID_MISSING]
    }
})

class TeamClass {

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

    static async getByGame(game) {
        try {
            return await this.find(
                // condition
                { game },
                // returns
                { _id: false, __v: false }
            );
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async insert(team) {
        try {
            return await this.create(team)
        }
        catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}
// load class in the schema
TeamSchema.loadClass(TeamClass);
// make mongoose model
const TeamModel = mongoose.model('Team', TeamSchema);
// export
module.exports = TeamModel