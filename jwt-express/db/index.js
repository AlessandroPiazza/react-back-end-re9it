const config = require('../config');
const MongoClient = require ('mongodb').MongoClient;

var db;
var collection;
//MongoClient.connect(url, {useNewUrlParser: true } )



MongoClient.connect(config.MONGO_URL, {useNewUrlParser: true },(err, client) => {
    if(!err){
        console.log('Connection established to MongoDB.');
         collection = client.db("re9it").collection("users");
    }else{
        console.log("Not possible to established the connection to MongoDB.");
    }
})

module.exports = {
    register: (data) =>{
        collection.insertOne(data)
    },
    findUser: (data, handler) => {
        collection.findOne(data, (err, result) => {
            handler(err, result);
        })
    }
    // collection.findOne({name: 'Togo'}, (err, item) => {
        // console.log(item)
    //   })
}