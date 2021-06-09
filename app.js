const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const auth_mdw = require('./middlewares/auth.mdw');
const Response = require('./response/response').Response;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', function (req, res, next) {
  res.json({
    message: 'Hello from onlline courses API'
  });
});

app.use('/api/auth', require('./routes/auth.route'));

app.use('/api/categories', require('./routes/categories.route'));

app.use('/api/courses', require('./routes/courses.route'));

app.use('/api/feedbacks', require('./routes/feedbacks.route'));

app.use('/api/chapters', require('./routes/chapters.route'));

app.use('/api/documents', require('./routes/documents.route'));

app.use('/api/storage', require('./middlewares/auth.mdw'), require('./routes/storage.route'));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode == undefined) {
    res.status(500).json({ message: "Have some error on server" });
  } else {
    const rt = new Response(err.message, false, null);
    res.status(err.statusCode).json(rt);
  }
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
})