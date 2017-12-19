var express = require('express');
var router = express.Router();
var path = require("path");

var user = require(path.join(__dirname, '..', 'controller', 'user.controller'));
var check = require(path.join(__dirname, '..', 'utils', 'checkuser'));

router.post('/create',
  check.checkValidUserCreateData,
  check.checkUserExists,
  user.create);

router.post('/login',
  check.checkValidUserLoginData,
  user.login
);

router.post('/checkUserSession',
  check.authenticate,
  function(req, res, next) {
    res.send("ok");
    next();
  }
);

module.exports = router;
