const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

exports.getPutSchema = function (schema) {
    return {
        ...schema,
        required: ["id"],
        properties: { ...schema.properties, id: { type: "integer" } }
    }
}

exports.getPageQuery = function (page) {
    if (page === undefined || page === "") {
        return DEFAULT_PAGE;
    }
    try {
        page = parseInt(page);
        if (page < 0) {
            page = 1;
        }
        return page;
    } catch (ex) {
        console.error("Trying to parse page query", ex);
        return DEFAULT_PAGE;
    }
}

exports.getLimitQuery = function (limit) {
    if (limit === undefined || limit === "") {
        return DEFAULT_LIMIT;
    }
    try {
        limit = parseInt(limit);
        if (limit < 0) {
            limit = 1;
        }
        return limit;
    } catch (ex) {
        console.error("Trying to parse limit query", ex);
        return DEFAULT_LIMIT;
    }
}

exports.getCategoryQuery = function (category_id) {
    if (category_id === undefined || category_id === "") {
        return null;
    }
    try {
        category_id = parseInt(category_id);
        if (category_id < 0) {
            category_id = null;
        }
        return category_id;
    } catch (ex) {
        console.error("Trying to parse category id query", ex);
        return null;
    }
}