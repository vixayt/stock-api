const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  iexApiKey: process.env.IEX_APIKEY,
  port: process.env.PORT,
};
