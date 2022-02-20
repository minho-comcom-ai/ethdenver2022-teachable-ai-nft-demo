const Const = {
  SIGNING_STATUS: {
    COMPLETE: 400,
  },

  getAinizeEndpoint: function (username, serviceName) {
    switch (process.env.CLIENT_ENV) {
      case 'development':
        return `https://${serviceName}-${username}.endpoint.dev.ainize.ai`;
      case 'staging':
        return `https://${serviceName}-${username}.endpoint.staging.ainize.ai`;
      case 'production':
        return `https://${serviceName}-${username}.endpoint.ainize.ai`;
    }
  },

  APP_COMPELETED_STATUS: 7,

  // Teachable AINFT
  getTargetChainId: function() {
    switch (process.env.CLIENT_ENV) {
      case 'production':
        return 1; // mainnet
      case 'development':
      case 'staging':
      default:
        return 1666700000; // Harmony testnet
    }
  },

  // Teachable AINFT
  ETH_CHAIN_NAME: {
    1: 'Ethereum Mainnet',
    4: 'Rinkeby Test Network',
    1666700000: 'Harmony testnet',
  }
};

module.exports = Const;
