import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import './services/passport';
import mongoDb  from './helpers/mongoDB';
import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes());

// ================================Database connection=====================================
const mongoURL = process.env.NODE_ENV === 'testing' ? process.env.DB_CONNECTION_STRING : mongoDb.makeConnectionString();
mongoose.connect(mongoURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('connecting', function() {
  console.log(chalk.yellow('connecting to MongoDB...'));
});

db.on('error', function(error) {
  console.log(chalk.red('Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('connected', function() {
  console.log(chalk.green(mongoURL+' => connected'));
});

db.once('open', function() {
  console.log(chalk.green('MongoDB connection opened!'));
});

db.on('reconnected', function () {
  console.log(chalk.blue('MongoDB reconnected!'));
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    isError: true,
    errorMessage: err.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

export default app;
