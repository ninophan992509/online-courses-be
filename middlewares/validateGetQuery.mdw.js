const Ajv = require('ajv').default;

module.exports = schema => (req, res, next) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  if (req.query.limit) req.query.limit = parseInt(req.query.limit);
  if (req.query.page) req.query.page = parseInt(req.query.page);

  const valid = validate(req.query);
  if (!valid) {
    return res.status(400).json(validate.errors);
  }

  next();
}