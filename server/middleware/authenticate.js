var {User}= require('../../models/user');

var authenticate = (req, res, next)=>{
    var token= req.header('x-auth');
    User.findByToken(token).then((user)=>{
      if(!user){
        return Promise.reject();    // function automatically stops. res.send line never gets executed. catch catches the e. 
      }
      //console.log(req.user);
      req.user= user;
      req.token= token;
      //console.log(req.user);
      next();
    }).catch((e)=>{
      res.status(401).send();
    })
  }

  module.exports = {
      authenticate
  };