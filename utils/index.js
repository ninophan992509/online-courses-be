exports.getPutSchema = function (schema) {
    return {
        ...schema,
        required: ["id"],
        properties: { ...schema.properties, id: { type: "integer" } }
    }
}