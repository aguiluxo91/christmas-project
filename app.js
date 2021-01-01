const express = require('express');
const Post = require("./models/post.model");
const path = require('path')
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require('./config/hbs.config');
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
})

const router = require('./config/routes.config');
app.use('/', router);



const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.info(`App listen at ${port} port`);
});

