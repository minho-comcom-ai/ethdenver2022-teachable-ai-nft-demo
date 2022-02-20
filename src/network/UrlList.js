let OPENSEA_API_BASE_URL;

switch (process.env.CLIENT_ENV) {
  default:
  case 'development':
    OPENSEA_API_BASE_URL = '/api/opensea-api-but-harmony';
    break;
}

const UrlList = {
  getNftsFromOpenseaUrl: function (address) {
    return `${OPENSEA_API_BASE_URL}/assets?owner=${address}`;
  },
};

module.exports = UrlList;
