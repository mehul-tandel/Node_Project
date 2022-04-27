const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) =>{
    MongoClient.connect('mongodb+srv://mehul_tandel31:QYkUvK15nBZ2kFkR@cluster0.mr78j.mongodb.net/shop?retryWrites=true&w=majority')
.then(client => {
    console.log('Connected!');
    _db = client.db();
    cb();
})
.catch(err => {
    console.log(err);
    throw err;
});
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;