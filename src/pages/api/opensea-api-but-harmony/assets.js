import { io } from 'socket.io-client';

import { getTokenURI } from './tokenURI';

const OfficialExplorerHandler_erc721 = (erc721Tokens) => {
  const erc721BalanceMap = erc721Tokens.reduce((prev, cur) => {
    if (prev[cur.tokenAddress]) {
      prev[cur.tokenAddress]++;
    } else {
      prev[cur.tokenAddress] = 1;
    }
    return prev;
  }, {});
  return erc721Tokens.map((token) => ({
    ...token,
    balance: erc721BalanceMap[token.tokenAddress].toString(),
    isERC721: true,
  }));
};

const getUserERC721Assets = (socket, owner) => {
  return new Promise((resolve, reject) => {
    socket.emit('getUserERC721Assets', [owner], (resp) => {
      try {
        const payload = JSON.parse(resp.payload);
        if (!payload) return reject(new Error('empty payload'));
        openseaResponseFormat(payload)
          .then(resolve)
          .catch(reject);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
}

const openseaResponseFormat = (assets) => {
  return Promise.all(assets.map(async (asset) => {
    if (asset.needUpdate || !asset.tokenURI) {
      const tokenMetadata = await getTokenURI(asset.tokenAddress, asset.tokenID).catch(_ => {});
      return {
        id: `${asset.tokenAddress}-${asset.tokenID}`,
        asset_contract: {
          address: asset.tokenAddress,
        },
        token_id: asset.tokenID,
        image_url: tokenMetadata?.image,
        description: tokenMetadata?.description,
        name: tokenMetadata?.name,
      };
    }
    return {
      id: `${asset.tokenAddress}-${asset.tokenID}`,
      asset_contract: {
        address: asset.tokenAddress,
      },
      token_id: asset.tokenID,
      image_url: asset.meta?.image,
      description: asset.meta?.description,
      name: asset.meta?.name,
    }
  }));
};

export default async function handle(req, res) {
  let owner;
  if (Array.isArray(req.query.owner)) {
    if (req.query.owner.length > 1) {
      owner = req.query.owner[0];
    }
  } else {
    owner = req.query.owner;
  }
  if (!owner) {
    res.status(400).json({ message: 'Owner was not given.' });
    return;
  }

  const socket = io("wss://api.explorer.pops.one", {
    transports: ["websocket"],
  });
  socket.connect();

  await getUserERC721Assets(socket, owner.toLowerCase())
    .then((assets) => {
      socket.disconnect();
      res.json({ assets });
    })
    .catch((err) => {
      console.error(err);
      res.json({ assets: [] });
    })

}