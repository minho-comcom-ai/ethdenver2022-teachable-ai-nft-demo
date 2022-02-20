import RestClient from './RestClient';
import UrlList from './UrlList';

const ApiManager = {
  getNftsFromOpensea: async (address) => {
    return await RestClient.sendGetRequest(
      UrlList.getNftsFromOpenseaUrl(address),
    );
  },
};

export default ApiManager;
