var mongoose = require('mongoose');
// remember no user db in robo
var User = mongoose.model('User',{
    email : {
        type: String,
        required : true,
        minlength: 1,
        trim : true
    }
});
module.exports = {
    User : User
};

