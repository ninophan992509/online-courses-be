module.exports = {
  required: [],
  additionalProperties: true,
  properties: {
    limit: {
      type: "integer",
      minimum: 1
    },
    page: {
      type: "integer",
      minimum: 1
    }
  }
}