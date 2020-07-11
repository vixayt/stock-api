const { getStock } = require('./getStock');

exports.handler = async function (event) {
  return await getStock(event);
};
