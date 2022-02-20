module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.ORIGIN || 'http://localhost:3000/',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: `/teachable-nft`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.AINIZE_API_SERVER_URL || 'https://api.dev.ainize.ai'}/:path*`,
      },
    ];
  },
  env: {
    ORIGIN: process.env.ORIGIN || 'http://localhost:3000/',
    CLIENT_ENV: process.env.CLIENT_ENV || 'development',
    // @ainize/ainize-ainetwork-gpt2-private-sdk
    GPT2_FIREBASE_API_KEY: process.env.GPT2_FIREBASE_API_KEY,
    GPT2_FIREBASE_AUTH_DOMAIN: process.env.GPT2_FIREBASE_AUTH_DOMAIN,
    GPT2_FIREBASE_DATABASE_URL: process.env.GPT2_FIREBASE_DATABASE_URL,
    GPT2_FIREBASE_PROJECT_ID: process.env.GPT2_FIREBASE_PROJECT_ID,
    GPT2_FIREBASE_STORAGE_BUCKET: process.env.GPT2_FIREBASE_STORAGE_BUCKET,
    GPT2_FIREBASE_MESSAGING_SENDER_ID:
      process.env.GPT2_FIREBASE_MESSAGING_SENDER_ID,
    GPT2_FIREBASE_APP_ID: process.env.GPT2_FIREBASE_APP_ID,
    GPT2_FIREBASE_MEASUREMENT_ID: process.env.GPT2_FIREBASE_MEASUREMENT_ID,
    // Blockchain
    AIN_BLOCKCHAIN_PROVIDER: process.env.AIN_BLOCKCHAIN_PROVIDER || 'https://dev-api.ainetwork.ai',
    AIN_BLOCKCHAIN_INSIGHT: process.env.AIN_BLOCKCHAIN_INSIGHT || 'https://ain-sight-dev.herokuapp.com',
    // MOCK Login
    AINIZE_USER_ID: process.env.AINIZE_USER_ID || 'gXYugZWVqXcJmnwewllkVkhQRPL2',
    AINIZE_USER_EMAIL: process.env.AINIZE_USER_EMAIL || 'minho.comcom.ai@gmail.com',
    AIN_ACCOUNT_ADDRESS: process.env.AIN_ACCOUNT_ADDRESS,
    AIN_PRIVATE_UNSAFE_KEY: process.env.AIN_PRIVATE_UNSAFE_KEY,
  },
};
