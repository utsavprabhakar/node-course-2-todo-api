// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //ES6 destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to mongodb servers');
  }else{
    console.log('Connected the mongodb server!');
  }
  // db.collection('Todos').find(new ObjectID('5c7042979c8f79d8cdfe6893')).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err)=>{
  //   console.log('Unable to fetch todos', err);
  // })
  db.collection('Todos').find().count().then((count)=>{
    console.log('Todos count : '+ count);
    console.log(JSON.stringify(docs, undefined, 2));
  },(err)=>{
    console.log('Unable to fetch todos', err);
  })




  //db.close();
});
