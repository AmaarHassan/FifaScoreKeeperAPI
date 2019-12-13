const queryBuilder = (query) => {
    // no filter obj  ||      // empty filter {}
    if (!query.filter || (Object.keys(query.filter).length < 1)) {
        query.filter = {}
    }
    if (!query.conditions || (Object.keys(query.conditions).length < 1)) {
        query.conditions = {}
    }
    if (!query.limit) {
        query.limit = 100
    }
    if (!query.order || (Object.keys(query.order).length < 1)) {
        query.order = { firstName: 1 }
    }
    if (!query.skip) {
        query.skip = 0
    }

    return query;
}

module.exports = queryBuilder