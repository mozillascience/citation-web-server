
const express = require('express');
const github = require('../../lib/github.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Citation web server api');
});

router.post('/secret', [], github.generateSecret);
router.post('/token', [], github.getAccessToken);

module.exports = router;
