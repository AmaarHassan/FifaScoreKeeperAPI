// takes in array of matchPlayers and returns an array of players
// single element means the winner 
// multiple elements mean draw between the players

module.exports = async (matchPlayers) => {
    let winners = [];
    let mostGoals = 0;
    let winner;

    const draw = isDraw(matchPlayers)

    if (draw) {
        for (let matchPlayer of matchPlayers) {
            winners.push(matchPlayer.player)
        }
        return winners
    }

    for (let matchPlayer of matchPlayers) {
        if (matchPlayer.goals.length > mostGoals) {
            mostGoals = matchPlayer.goals
            winner = matchPlayer.player
        }
    }

    winners.push(winner)
    return winners
}

function isDraw(matchPlayers) {
    try {
        let goals = null;

        for (let matchPlayer of matchPlayers) {
            if (goals === null) {
                goals = matchPlayer.goals.length
            } else {
                if (matchPlayer.goals.length != goals) {
                    return false
                }
            }
        }
        return true

    } catch (error) {
        return new Error(error)
    }
}