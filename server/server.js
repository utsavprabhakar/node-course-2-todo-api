var express= require('express');
var app= express();
var bodyParser= require('body-parser');

var {mongoose}= require('./db/mongoose.js');
var {Todo} = require('./../models/todo.js');
var {User} = require('./../models/user.js');

app.use(bodyParser.json());

// var Todo = mongoose.model('Todo', {
//   text: {
//     type : String,
//     required : true
//   },
//   completed : {
//     type: Boolean,
//     default :false
//   },
//   completedAt : {
//     type : Number,
//     default : null
//   }
// });

// var newTodo = new Todo({
//   text : 'Cook dinner'
// });

// newTodo.save().then((todo)=>{
//    console.log('saved todo', todo);
// }, (e)=>{
//   console.log('unable to save todo');
// })

// var User = mongoose.model('User',{
//   email : {
//       type: String,
//       required : true,
//       minlength: 1,
//       trim : true
//   }
// });

// var newUser = new User({
//   email: 'utsav.prabhakar@gmail.com  '
// });
// newUser.save().then((user)=>{
//   console.log(user);

// }, (e)=>{
//   console.log('User cant be saved', e);
// })
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

app.get('/todos', (req, res)=>{
  Todo.find({}).then((todos)=>{
    res.send({
      todos: todos
    });
  }, (e)=>{
    res.status(400).send(e);

  });
})

app.get('/users', (req, res)=>{
  User.find({}).then((users)=>{
    res.send({
      users : users
    });
  }, (e)=>{
    res.status(400).send(e);
  })
});

// app.post('/users', (req, res)=>{
//   User.
// })
app.listen(3000, ()=>{
  console.log('Process started at port 3000');
})