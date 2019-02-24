// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //ES6 destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to mongodb servers');
  }else{
    console.log('Connected the mongodb server!');
  }
  // db.collection('Users').deleteMany({name: 'Utsav'}).then((results)=>{
  //   console.log(results);
  // }, (err)=>{
  //   console.log('Some error', err);
  // })
//  ObjectID x =  ObjectId("5c72827e9c8f79d8cdfea8d1");
  db.collection('Users').findOneAndDelete({_id : new ObjectID("5c72827e9c8f79d8cdfea8d1")}).then((result)=>{
    console.log(result);
  })




  //db.close();
});
