
// takes in array of match winners and returns uuid of winner
// [abc:1] associative array of uuid of players with their goals

module.exports = (matchWinners) => {
    let winners = [];
    let mostGoals = 0

    const draw = isDraw(matchWinners)

    if (draw) {
        for (let key in matchWinners) {
            winners.push(key)
        }
        return winners
    }

    for (let key in matchWinners) {
        if (matchWinners[key] > mostGoals) {
            mostGoals = matchWinners[key]
            winner = key;
        }
    }

    winners.push(winner)
    return winners
}

function isDraw(matchWinners) {
    try {
        let goals = null;

        for (let key in matchWinners) {
            if (goals === null) {
                goals = matchWinners[key]
            } else if (matchWinners[key] !== goals) {
                return false
            }

        }
        return true
        
    } catch (error) {
        return new Error(error)
    }
}