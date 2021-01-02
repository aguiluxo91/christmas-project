const hbs = require('hbs');
const path = require('path');
const moment = require('moment');
hbs.registerPartials(path.join(__dirname, '../views/partials'));


hbs.registerHelper('date', (date) => {
    return moment(date).startOf().fromNow();
});