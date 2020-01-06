const TeamService = require('../../services/team')
const TeamType = require('../types/output/team')
const { CreateTeamInputType } = require('../types/input/team')
const teamService = new TeamService()

const TeamMutations = {
    // create a player
    createTeam: {
        type: TeamType.Team,
        args: {
            input: { type: CreateTeamInputType }
        },
        resolve: async (parent, args) => {
            try {
                console.log(args)
                return await teamService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = TeamMutations