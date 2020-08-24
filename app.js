const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/api');
const usersRouter = require('./routes/api/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, function () {
    console.log('App is listening on port 3000!');
});
