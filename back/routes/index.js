var express = require('express');
var router = express.Router();
var path = require("path");
var indexController = require(path.join(__dirname, '..', 'controller', 'index.controller'))
var check = require(path.join(__dirname, '..', 'utils', 'checkuser'));

router.post('/',
  check.authenticate,
  check.validGet,
  indexController.getTodo);

router.post('/add',
  check.authenticate,
  check.checkValidTodo,
  indexController.addTodo
);

router.post('/changeStatus',
  check.authenticate,
  check.validDataChangeStatus,
  indexController.changeStatus
)

module.exports = router;
