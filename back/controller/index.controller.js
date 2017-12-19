var path = require("path");
var todos = require(path.join(__dirname, '..', 'models', 'todos'))
var checkuser = require(path.join(__dirname, '..', 'utils', 'checkuser'));
var check = require(path.join(__dirname, '..', 'utils', 'checkValid'));
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var getError = function(code, message) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
};

var addTodo = function(req, res, next) {
  var todo = new todos({
    userId: req.body.userId,
    content: req.body.data.content,
    dueDate: req.body.data.dueDate
  })
  todo.save(function(err, data) {
    if (!err) {
      res.send("ok");
      next();
    } else {
      next(getError(400, err));
    }

  })
}
var getTodo = function(req, res, next) {

  var obj = {
    userId: req.body.userId,
  }
  if (req.body.status == "true") {
    obj.completed = "1"
  } else if (req.body.status == "false") {
    obj.completed = "0"
  }
  todos.find(obj, function(err, data) {
    if (!err) {
      res.send(data);
      next();
    } else {
      return next(getError(400, err));
    }

  })
}

var changeStatus = function(req, res, next) {
  todos.findOne({
    _id: ObjectId(req.body.todoId)
  }, function(err, data) {
    if (!err) {
      data.completed = req.body.status;
      data.save(function(err, data) {
        if (!err) {
          res.send("status changed");
          return next();
        } else {
          return next(getError(400, err));
        }
      })


    } else {
      return next(getError(400, err));
    }
  })
}

exports.addTodo = addTodo;
exports.getTodo = getTodo;
exports.changeStatus = changeStatus;
