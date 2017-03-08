var express = require('express');
var router = express.Router();

router.use('/citation', require('./citation'));

// This may not be needed.  Sessions are not 
// used so Angular may be able to log out by 
// simply destroying the token

router.get('/', function(req, res) {
  res.send('Citation System API');
})

router.get('/about', function(req, res) {
  res.send('api.SoftwareCitationTools.com');
})

module.exports = router;
