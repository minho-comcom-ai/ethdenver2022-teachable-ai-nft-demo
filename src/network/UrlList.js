let OPENSEA_API_BASE_URL;

switch (process.env.CLIENT_ENV) {
  case 'development':
    OPENSEA_API_BASE_URL = 'https://testnets-api.opensea.io/api/v1';
    break;
  case 'staging':
    OPENSEA_API_BASE_URL = 'https://testnets-api.opensea.io/api/v1';
    break;
  case 'production':
    OPENSEA_API_BASE_URL = 'https://api.opensea.io/api/v1';
    break;
}

const UrlList = {
  getNftsFromOpenseaUrl: function (address) {
    return `${OPENSEA_API_BASE_URL}/assets?owner=${address}`;
  },
};

module.exports = UrlList;
