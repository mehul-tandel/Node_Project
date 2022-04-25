const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()  // sync the models to db => creates/relates tables
    .then(result =>{
        app.listen(3000);
    })
    .catch(err =>{ console.log(err) });


