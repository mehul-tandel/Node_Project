const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const keys = require('./keys');
const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://mehul_tandel31:'+keys.cluster0+'@cluster0.mr78j.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'a long string',
    resave: false, 
    saveUninitialized: false, 
    store: store
}));

app.use((req,res,next)=>{
    User.findById('626a7e020a41bced81d31c6f')
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err=>console.log(err));
});

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
.connect(MONGODB_URI)
.then(result => {
    User.findOne().then(user => {
        if (!user){
            const user = new User({
                name: 'Max',
                email: 'max@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
}).catch(err => {
    console.log(err);
});