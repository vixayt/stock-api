const axios = require('axios');
const { iexApiKey } = require('./envconfig');

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body,
});
exports.getStock = async function (event) {
  console.log('event be: ', event);
  let stock;
  if (event['queryStringParameters'] !== null) {
    stock = event['queryStringParameters'].stock;
  } else if (event['pathParameters'] !== null) {
    stock = event['pathParameters'].stock;
  } else {
    stock = 'AMZN';
  }

  console.log('stock be: ', stock);
  let url = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stock.toLowerCase()}&types=quote,news,chart&range=1m&last=5&token=${iexApiKey}`;
  try {
    const res = await axios.get(url);
    return response(
      200,
      JSON.stringify({
        stockData: res.data,
      })
    );
  } catch (error) {
    return response(
      404,
      JSON.stringify({
        message: 'IEX Error',
        error: error,
      })
    );
  }
};
