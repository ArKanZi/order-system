const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const { flash } = require('express-flash-message');

const ENV = process.env;

app.use(session({
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(express.json());
app.use(express.urlencoded({urlencoded: true}));
//serve static files
app.use('/static', express.static(path.join(__dirname, '../assets')));
//end

app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'pug');

app.use(require('./routes/users.routes'));
app.use(require('./routes/home.routes'));
app.use(require('./routes/category.routes'));
app.use(require('./routes/product.routes'));

module.exports = app;