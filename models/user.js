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
    //console.log(1);
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

userSchema.statics.findByToken = function(token){
    var User = this //capital  U because model method.
    var decoded;  // why left undefined?this will store the return result from jwt.verify
    // we do this because jwt.verify will throw an error if something goes wrong.
    //we want to catch the error if that happens. 
    // we achieve this by using try catch .
    try{
        decoded = jwt.verify(token, 'abc123')
    } catch(e){
        return new Promise((resolve, reject)=>{  //what this does is returns a promise that always reject.
            reject();                            //this promse will be returned by findByToken()
                                                 //then over in server.js, it will be rejected so our then block wont be executed.       
        })
     // return Promise.reject(); or do this. same thing. just easier. wecan ever pass arguments for e in catch in server.

    }
    //success. verify worked. no error.
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,   //quotes are required when there is a dot between values. nice!
        'tokens.access' : 'auth'
    })
}
var User = mongoose.model('User',userSchema);
module.exports = {
    User : User
};

