import web3 from 'web3';
import fetch from 'node-fetch';

export async function getTokenURI(contractAddress, tokenNo) {
  const tokenURI = "0xc87b56dd00000000000000000000000000000000000000000000000000000000";
  const tokenNoHex = web3.utils.padLeft(web3.utils.numberToHex(tokenNo), 8).slice(2);
  const data = await fetch('https://api.s0.pops.one/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "hmy_call",
      params: [
        {
          from: "0x0000000000000000000000000000000000000000",
          to: contractAddress,
          data: tokenURI + tokenNoHex,
        },
        "latest",
      ],
      id: 1,
    }),
  })
    .then(res => res.json())
    .catch(console.error);
  const metadataLink = web3.utils.hexToString('0x' + data.result.slice(2+64+64));
  const metadata = await fetch(metadataLink).then(_ => _.json());
  return metadata;
}

export default async function handle(req, res) {
  const metadata = await getTokenURI("0x317695d9c06beaaf1a0f48fa2495398dd9172e53", 1);
  res.json({ metadata });
}