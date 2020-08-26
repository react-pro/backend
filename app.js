const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;

const MONGO_URI = process.env.MONGOLAB_URI || config.MONGOLAB_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

const checkAuthorization = require('./routes/middleware/auth.middleware');

const indexRouter = require('./routes/api');
const authRouter = require('./routes/api/auth');
const roadmapRouter = require('./routes/api/roadmap');
const usersRouter = require('./routes/api/users');


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/roadmap', checkAuthorization, roadmapRouter);

app.use('/api/users', checkAuthorization, usersRouter);

app.listen(PORT, function () {
    console.log('App is listening on port 8000!');
});
