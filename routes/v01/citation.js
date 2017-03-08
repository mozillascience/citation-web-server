"use strict";

var express = require('express');
var router = express.Router();
var citations = require('../../lib/citationGeneration');

router.get('/', function(req, res) {
  res.send('Citation web server api');
});

router.post('/', [], citations.generate);
module.exports = router;
