var {ObjectId} = require('mongodb');

var {Todo}= require('./../models/todo');
var {mongoose} = require('../server/db/mongoose');
var {User} = require('../models/user');

var id = "5c948bac5294e83d52a1b9c8";

if(!ObjectId.isValid(id)){
    console.log('You have entered an invalid id');
}
// Todo.findById(id).then((todo)=>{
//  if(!todo){
//      return console.log('Todo not found');
//  }
//  console.log(todo);
// }).catch((e)=>{
//     console.log(e);
// })
User.findById(id).then((user)=>{
    if(!user){
        return console.log('User not found');
    }
    console.log(user);

}).catch((e)=>{
    console.log(e);
})

