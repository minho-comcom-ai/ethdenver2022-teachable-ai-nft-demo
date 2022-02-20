# ETHDENVER2022 - Teachable AI NFT (Harmony Testnet)

[https://ethdenver2022-teachable-ai-nft-demo.vercel.app/](https://ethdenver2022-teachable-ai-nft-demo.vercel.app/)

(This is the forked version of [Ainize.ai/Teachable-NFT](https://ainize.ai/teachable-nft) for Harmony Testnet.)
This demo will show you the showcase of converting the simple-boring-image-only NFT to the interactable AI NFT.
In this scenario, we implemented the chatbot for AI NFT. So you can chat with your NFT and feel a sense of intimacy and freshness.
For shaping the AI NFT's character, you should build the text script first.
Your AI NFT will be chit-chating with you based on this text script's knowledge.

## Usage

1. Get harmony testnet account (get ONE from faucet)
1. Get any HRC721 NFT on that account
1. Go to [https://ethdenver2022-teachable-ai-nft-demo.vercel.app/](https://ethdenver2022-teachable-ai-nft-demo.vercel.app/)
1. Select NFT and Connect Wallet
1. Upload text file for AI NFT's character. (Sample prompt text file is included on site.)
1. Name your AINFT
1. Push the "Train Model" button (ETA: 5mins for training)
1. Push the "Test Demo" button for chatting with just-baked-AI-NFT in PoC NFT Metaverse world.
1. Push the "Mint NFT" button for minting your AI NFT on Harmony Testnet.

## Limitations

- Only support HRC721, not HRC1151
- Only support Harmony testnet

## Smart Contract (HRC721)

- [https://github.com/ainize-team/ainft-smart-contract](https://github.com/ainize-team/ainft-smart-contract)
- [Uploaded contract (AINFT, 0xb9a0eb7877491e1ed7cc95245340da430a39cfad)](https://explorer.pops.one/address/0xb9a0eb7877491e1ed7cc95245340da430a39cfad)

## Using external resources

- [AI Network Blockchain - AINFT minted on AI Network, AINFT Datastore](https://ainetwork.ai)
- [Ainize.ai - AINFT's AI API deployed](https://ainize.ai)
  - [Pretrained GPT-J Model on ainize.ai](https://ainize-dev.herokuapp.com/teachable-ainize/ainft_test)
  - [Training/Deploying Requester for new AINFT Model](https://github.com/ainize-team/ainize-ainetwork-gpt2-private-sdk)
- [Afan.ai - PoC NFT Metaverse](https://miniverse.dev.afan.ai/)

## Development Mode

### Set .env.local

```bash
AIN_ACCOUNT_ADDRESS=0x95112673B5ef5A43c415043b52A1A7D31b4F57C4
AIN_PRIVATE_UNSAFE_KEY=e15f10944866b65aaade1a9edd3c6ff51332a874500e4a11c3080b6d5425756f
GPT2_FIREBASE_API_KEY=AIzaSyA_ss5fiOD6bckPQk7qnb_Ruwd29OVWXE8
GPT2_FIREBASE_AUTH_DOMAIN=gpt2-ainetwork.firebaseapp.com
GPT2_FIREBASE_DATABASE_URL=https://gpt2-ainetwork.firebaseio.com
GPT2_FIREBASE_PROJECT_ID=gpt2-ainetwork
GPT2_FIREBASE_STORAGE_BUCKET=gpt2-ainetwork.appspot.com
GPT2_FIREBASE_MESSAGING_SENDER_ID=1045334268091
GPT2_FIREBASE_APP_ID=1:1045334268091:web:c0490dfa3e8057a078f19e
GPT2_FIREBASE_MEASUREMENT_ID=G-MVG9QTFBG8
```

### Run on terminal

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)
