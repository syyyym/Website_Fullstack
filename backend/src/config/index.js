'use strict';
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI
    }
} else {
    module.exports = require('./development.json');
}




















/* Module config
Configuration variables depending on the execution environment - development or production
    development - temporary and local access credentials; all access credentials are loaded in from a json file on disk: development.json
    production -  store production level environment data into the host's Environment Variables - when deploying on Heroku we get an easy way to map environment variables fo our app

    - load in access credentials for Redis
*/