const _ = require('lodash'); 
var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose}= require('./db/mongoose.js');
var {Todo} = require('./../models/todo.js');
var {User} = require('./../models/user.js');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 3000 ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


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

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
      res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
      if(!todo){
        res.status(404).send();
      }else{
        res.send({
          todo: todo
        });
      }
    }).catch((e)=>{
      res.status(400).send();
    })
});

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(404).send();
  }
  Todo.findByIdAndDelete(id).then((todo)=>{
    res.status(200).send({todo});
  }).catch((e)=>{
    res.status(400).send();

  })
})

app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectId.isValid(id)){
      res.status(404).send();
    }
    //console.log(body);
    if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
    }else{
      body.completed = false;
      body.completedAt = null;
    }
    console.log(body);
    Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    })
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

app.post('/users', (req,res)=>{
  var body = _.pick(req.body, ["email", "password"]);
  var newUser = new User(body);
  newUser.save().then(()=>{
    //console.log('amen1')
    return newUser.generateAuthToken();
  }).then((token)=>{
    //console.log("amen2");
    res.header('x-auth', token).send(newUser);
  }).catch((e)=>{
    //console.log('amen3');
    res.status(400).send(e);
  })
})


app.get('/users/me',authenticate,  (req, res)=>{
  res.send(req.user);
})


app.listen(port, ()=>{
  console.log(`process started at port ${port}`);
})