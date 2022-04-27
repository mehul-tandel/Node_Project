const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(username, email){
        this.username = username;
        this.email = email;
    }
    
    save(){
        const db = getDb();
        return db.collection('users')
        .insertOne(this);
    }

    static findByPk(userId) {
        const db = getDb();
        return db.collection('users')
        .find({_id: mongodb.ObjectId(userId)}) //get cursor
        .next()
        .then(user =>{
            console.log(user);
            return user;
        })
        .catch(err => console.log(err));
        //alternative: findOne({_id: mongodb.ObjectId(userId)}) 
    }
}

module.exports = User;