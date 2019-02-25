// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //ES6 destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('Unable to connect to mongodb servers');
  }else{
    console.log('Connected the mongodb server!');
  }
  db.collection('Users').findOneAndUpdate({
    'name' : 'Sam'
  }, {
    $set : {
      'name' : 'Utsav'
    },
      $inc : {
        'age' : 1
      }

  }, {
    returnOrginal : false
  },{
    returnOrginal : false
  }).then((result)=>{
    console.log(result);
  })




  //db.close();
});
