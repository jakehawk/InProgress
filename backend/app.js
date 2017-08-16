const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/how2mana', { useMongoClient: true });
}

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
	res.status(422).send({ error: err._message });
});

module.exports = app;
