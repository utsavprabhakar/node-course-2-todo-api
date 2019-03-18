var express= require('express');
var app= express();
var bodyParser= require('body-parser');

var {mongoose}= require('./db/mongoose.js');
var {Todo} = require('/home/prabhakar/Desktop/node-todo-api/models/todo.js');
var {user} = require('/home/prabhakar/Desktop/node-todo-api/models/user.js');

app.use(bodyParser.json());
app.post('/todos', function(req,res){
  console.log(req.body);
  var newtodo = new Todo({
    text : req.body.text
  });
  newtodo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);

  })
})
app.listen(3000, ()=>{
  console.log('Process started at port 3000');
})