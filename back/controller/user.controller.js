var path = require("path");
var user = require(path.join(__dirname, '..', 'models', 'user'))
var checkuser = require(path.join(__dirname, '..', 'utils', 'checkuser'));
var check = require(path.join(__dirname, '..', 'utils', 'checkValid'));
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var getError = function(code, message) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
};

var create = function(req, res, next) {
  checkuser.createHash(req.body.password, function(hash) {
    var obj = new user({
      userId: mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hash,
      email: req.body.email
    })
    console.log(obj);
    obj.save(function(err, data) {
      console.log("--", err, data);
      if (!err) {
        res.send("User created successfully");
      } else {
        // next(getError(400, err));
      }
    })
  })
}

var login = function(req, res, next) {
  user.findOne({
    username: req.body.username
  }, function(err, data) {
    if (!err) {
      if (check.isUndefinedOrNull(data)) {
        return next(getError(500, "User Not Found"));
      } else {
        checkuser.compareHash(req.body.password, data.password, function(resPass) {
          if (resPass) {
            var payload = {
              userId: data.userId,
              username: data.username
            }
            checkuser.encodeToken(payload, function(token) {
              // data.token = token;
              var userData = {
                userId: data.userId,
                username: data.username,
                token: token
              }
              data.token = token
              console.log("data.username", data);
              data.save(function(err, updateRes) {
                console.log(err, updateRes);
                res.send(userData);
                next();
              })

            })
          } else {
            return next(getError(401, "Invalid password"))
          }
        })
      }
    } else {
      return next(getError(500, "error Retrieving Data"));
    }
  })
}

exports.create = create;
exports.login = login;
