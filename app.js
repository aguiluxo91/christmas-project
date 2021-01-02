const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const path = require('path')
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require('./config/hbs.config');
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
})

const router = require('./config/routes.config');
app.use('/', router);

app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500)
    res.render('errors/error', {
        error: error
    });
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.info(`App listen at ${port} port`);
});

