// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //ES6 destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to mongodb servers');
  }else{
    console.log('Connected the mongodb server!');
  }

  db.collection('Todos').insertOne({
    text : 'Something to do',
    completed : false
  }, (err, result)=>{
    if(err){
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  })
  db.close();
});
//   db.collection('Users').insertOne({
//     email: 
//     age : 21,
//     location: 'New Delhi'
//   }, (err, result)=>{
//     if(err){
//       return console.log('Coudnt insert user', err);
//     }

//     console.log(JSON.stringify(result.ops, undefined, 2));
//   })
//   db.close();
// });
