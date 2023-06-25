import * as path from 'path';

const configPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'config/config.production.js')
    : path.join(__dirname, 'config/config.local.js');

const config = require(configPath);

console.log(config.API_ENDPOINT); // Use the API endpoint based on the environment
console.log(config.DEBUG_MODE); // Use the debug mode based on the environment
