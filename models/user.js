var mongoose  = require('mongoose');
var validator = require('validator');
var jwt       = require('jsonwebtoken');
var _         = require('lodash')

var userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        minlength: 1,
        trim : true,
        unique : true,
        validate : {
            validator : (value)=>{
                return validator.isEmail(value)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password : {
        type : String,
        required: true,
        minlength: 6
    },
    tokens :[{
        access : {
            type: String,
            required : true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
userSchema.methods.toJSON = function(){
    //console.log('?');
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject , ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token =jwt.sign({
        _id :user._id.toHexString(),
        access : access
    }, 'abc123').toString();
    user.tokens= user.tokens.concat([{access, token}]);
    //console.log(user);
//Good code. We just return token.later on in the server file, we can grab the token by tapping on another then callback. in order to allow server. this token value will be used as the success argument for the next then call.
    return user.save().then(()=>{
        //console.log('amen5');
        return token;
    });

}
var User = mongoose.model('User',userSchema);
module.exports = {
    User : User
};

