var mongoose = require('mongoose');

var Todo = new mongoose.model('Todo', {
    text: {
      type : String,
      required : true
    },
    completed : {
      type: Boolean,
      default :false
    },
    completedAt : {
      type : Number,
      default : null
    }
  });

  module.exports = {
      Todo: Todo
  };