var path = require("path");
var check = require(path.join(__dirname, 'checkValid'));
var config = require(path.join(__dirname, '..', 'bin', 'auth'));
var user = require(path.join(__dirname, '..', 'models', 'user'))
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require("jwt-simple")
var ObjectId = mongoose.Types.ObjectId;

var getError = function(code, message) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
};

var checkValidUserCreateData = function(req, res, next) {
  if (!check.isUndefinedOrNull(req.body.username) && !check.isUndefinedOrNull(req.body.email) && !check.isUndefinedOrNull(req.body.password)) {
    next();
  } else {
    return next(getError(400, "Invalid Data"));
  }
}

var checkValidUserLoginData = function(req, res, next) {
  if (!check.isUndefinedOrNull(req.body.username) && !check.isUndefinedOrNull(req.body.password)) {
    next();
  } else {
    return next(getError(400, "Invalid Data"));
  }
}

var checkUserExists = function(req, res, next) {
  user.find({
    $or: [{
      username: req.body.username
    }, {
      email: req.body.email
    }]
  }, function(err, body) {
    if (!err) {
      if (body.length > 0) {
        return next(getError(400, "User Exists"));
      } else {
        next();
      }
    } else {
      return next(getError(400, err));
    }
  })
}

////////////////////////Creating hash/////////////////
var createHash = function(text, cb) {
  bcrypt.hash(text, config.saltRounds, function(err, hash) {
    cb(hash);
  });
}

var compareHash = function(password, hash, cb) {
  bcrypt.compare(password, hash).then(function(res) {
    cb(res);
  });
}

////////////////////// JWT /////////////////////

var encodeToken = function(payload, cb) {
  console.log("aya", payload);
  var token = jwt.encode(payload, config.jwtSecret);
  cb(token);
}
var decodeToken = function(token, cb) {
  var res = jwt.decode(token, config.jwtSecret);
  cb(res);
}

var authenticate = function(req, res, next) {
  if (!check.isUndefinedOrNull(req.headers.authorization) || !check.isUndefinedOrNull(req.body.userId)) {
    user.findOne({
      userId: req.body.userId
    }, function(err, body) {
      if (!err && body.token == req.headers.authorization) {
        next();
      } else {
        return next(getError(400, "Unauthorized access"))
      }
    })
  } else {
    return next(getError(400, "Unauthorized access"))
  }
}

/////////////////// Todo /////////////////////
var checkValidTodo = function(req, res, next) {
  if (req.body.userId && req.body.data && req.body.data.content && req.body.data.dueDate) {
    next();
  } else {
    return next(getError(400, "Invalid Data"));
  }
}

var validDataChangeStatus = function(req, res, next) {
  if (req.body.userId && req.body && req.body.todoId && req.body.status) {
    next();
  } else {
    return next(getError(400, "Invalid Data"));
  }
}

var validGet = function(req, res, next) {
  if (req.body.userId && req.body.status) {
    next();
  } else {
    return next(getError(400, "Invalid Data"));
  }
}


exports.checkValidUserCreateData = checkValidUserCreateData;
exports.checkValidUserLoginData = checkValidUserLoginData;
exports.checkUserExists = checkUserExists;
exports.createHash = createHash;
exports.compareHash = compareHash;
exports.encodeToken = encodeToken;
exports.decodeToken = decodeToken;
exports.authenticate = authenticate;
exports.checkValidTodo = checkValidTodo;
exports.validDataChangeStatus = validDataChangeStatus
exports.validGet = validGet
