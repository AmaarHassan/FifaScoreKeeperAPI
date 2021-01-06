const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')
const BaseSchema = require('./baseSchema')
const schemaConstants = require('../constants/schema')
const MatchPlayer = require('./matchPlayer')

const MatchSchema = extendSchema(BaseSchema, {
    playedAt: {
        type: Date,
        default: null
    },
    matchPlayers: [MatchPlayer],
    uuid: {
        type: String,
        required: [true, schemaConstants.UUID_MISSING]
    },
    season: {
        type: String,
        default: null
    }
})

class MatchClass {

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

    static async get(query) {
        try {
            let { conditions, filter, skip, limit, order } = query;
            return await this.findOne(
                conditions,
                filter
            ).limit(limit).skip(skip).sort(order).lean();
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

    static async getBySeason(season) {
        try {
            return await this.find(
                { season },
                { _id: false, __v: false }
            ).lean();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async getPlayerIdsWithStats(season) {
        try {
            return await this.aggregate([
                { $unwind: '$matchPlayers' },
                { $match: { season: season } },
                {
                    $group: {
                        _id: '$matchPlayers.player',
                        goals: { $push: "$matchPlayers.goals" }
                    }
                }
            ])
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}
// load class in the schema
MatchSchema.loadClass(MatchClass);
// make mongoose model
const MatchModel = mongoose.model('Match', MatchSchema);
// export
module.exports = MatchModel