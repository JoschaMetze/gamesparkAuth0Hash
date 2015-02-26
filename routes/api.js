var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('express-jwt');
var nconf = require ('nconf');
nconf.env();
var jwtCheck = jwt({
    secret: new Buffer(nconf.get('auth0_secret'), 'base64'),
    audience: nconf.get('auth0_api')
  });

router.post('/api/token', jwtCheck, function(req, res) {
	console.log(req.body);
  var hash = crypto.createHmac('sha256', nconf.get('gamespark_secret')).update(req.body.nonce,'utf8');
  var digest = hash.digest('base64');
  res.json({ hash: digest});
});

module.exports = router;
