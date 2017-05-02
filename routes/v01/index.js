
const express = require('express');

const router = express.Router();

router.use('/citation', require('./citation'));
router.use('/gitHub', require('./github'));

router.get('/', (req, res) => {
  res.send('Citation System API');
});

router.get('/about', (req, res) => {
  res.send('api.SoftwareCitationTools.com');
});

module.exports = router;
