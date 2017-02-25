var envFile = __dirname + '/env.json';
var jsonfile = require('jsonfile');
var envVars = jsonfile.readFileSync(envFile);
var google= envVars['google'];
module.exports = {
    google_client_secret:google.client_secret,
    google_client_id:google.client_id
};
