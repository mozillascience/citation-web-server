
const crypto = require('crypto');
const request = require('request');

/**
 * Generates the secret that is optional for github
 * @param  {JSON} req The values that are sent in from the server
 * @param  {JSON} res The secret value that is returned from the server to be sent to github.
 */
exports.generateSecret = (req, res) => {
  console.log('generateing a secret');
  const clientId = req.body.clientId;
  //If running locally create a config file that has the salt.
  const salt = process.env.salt;
  const data = clientId + salt;
  console.log(data);
  const hash = crypto.createHash('md5').update(data).digest('hex');
  res.send({ secret: hash });
};

exports.getAccessToken = (req, res) => {
  const temporaryCode = req.body.code;
  const secret = req.body.secret;
  //If running locally add a config with client_id and a client secret
  const options = {
    uri: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    json: {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code: temporaryCode,
      state: secret },
  };
  request.post(options, (error, response, body) => {
    const gitResponse = response.toJSON();
    if (gitResponse.statusCode === 200) {
      res.send({ token: gitResponse.body.access_token });
    }
  });
};
