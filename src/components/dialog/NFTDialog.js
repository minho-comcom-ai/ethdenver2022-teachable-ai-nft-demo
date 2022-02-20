import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Button, Text } from '@ainize/design-system';

import Const from 'constants/Const';
import ApiManager from 'network/ApiManager';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { isMobile } from 'react-device-detect';

const NFTDialogContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  box-sizing: border-box;
  background: #ffffff;
`;

const Header = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const NFTContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const NFTItem = styled.div`
  width: 88px;
  height: 88px;
  box-sizing: border-box;
  cursor: pointer;

  & img {
    width: 88px;
    height: 88px;
    outline: 1px solid #dfe2e6;
    outline-offset: -1px;
    object-fit: cover;

    ${({ isSelected }) => {
      return (
        isSelected &&
        `
        outline: 4px solid #8B3EEB;
        outline-offset: -4px;
      `
      );
    }}
  }
`;

const NFTDialog = ({ open, onClose, handleNFTInfo, currentSelectedNft }) => {
  const [address, setAddress] = useState(null);
  const [nftList, setNftList] = useState([]);
  const [selectedNft, setSelectedNft] = useState(currentSelectedNft);

  const chainCheck = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const targetChainId = Const.getTargetChainId();
    if (Number(chainId) !== targetChainId) {
      alert(
        `Please change your MetaMask network setting to ${Const.ETH_CHAIN_NAME[targetChainId]}`,
      );
    }
  };

  useEffect(() => {
    if (window?.ethereum?.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);

      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0]);
        chainCheck();
      });
      window.ethereum.on('chainChanged', (_chainId) => {
        setNftList([]);
        window.location.reload();
      });
      window.ethereum.on('disconnect', (e) => {
        // NOTE: https://docs.metamask.io/guide/ethereum-provider.html#disconnect
        // `the provider will not accept any new requests until the connection to the chain has been re-restablished, which requires reloading the page.`
        console.error(e);
        window.location.reload();
      });
    }
    // TODO: removeListener of window.ethereum.
  }, [open]);

  useEffect(() => {
    if (address) {
      ApiManager.getNftsFromOpensea(address).then(({ assets }) => {
        setNftList(assets);
      });
    } else {
      setNftList([]);
    }
  }, [address]);

  const handleConnectWithMetamask = async () => {
    if (isMobile) {
      await connectWithMobileMetamask()
    } else {
      await connectWithDesktopMetamask()
    }
  };

  const connectWithMobileMetamask = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    } else {
      const { _accounts: accounts, _chainId: chainId } = connector;
      if (accounts && accounts[0]) setAddress(accounts[0]);
    }

    connector.on("connect", (error, payload) => {
      if (error) { throw error; }

      const { accounts, chainId } = payload.params[0];
      if (accounts && accounts[0]) setAddress(accounts[0]);
    });
  };

  const connectWithDesktopMetamask = async () => {
    if (window?.ethereum?.isMetaMask) {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      await chainCheck();

      setAddress(window.ethereum.selectedAddress);
    } else {
      window.open('https://metamask.io/download');
    }
  };

  const handleClickNftItem = (id) => {
    setSelectedNft(id);
  };

  return (
    <Dialog onClose={onClose} open={open} className="root">
      <NFTDialogContainer>
        <Header>
          <Text size="h3" weight="bold" css={{ fontFamily: 'montserrat' }}>
            Select NFT
          </Text>
        </Header>
        <Content>
          {address ? (
            <Text size="h4" weight="bold">
              {`${address.slice(0, 6)}...${address.slice(-6)}`}
            </Text>
          ) : (
            <Button onClick={handleConnectWithMetamask} type="secondary">
              Connect wallet
            </Button>
          )}
          <Text size="h4">The selected nft image is applied to the result</Text>
          <NFTContainer>
            {nftList.length ? (
              nftList.map((nft) => (
                <NFTItem
                  isSelected={nft.id === selectedNft?.id}
                  onClick={() => {
                    handleClickNftItem(nft);
                  }}
                >
                  <img src={nft.image_url} alt={nft.description} />
                </NFTItem>
              ))
            ) : address ? (
              <>- No NFT Found!</>
            ) : (
              <></>
            )}
          </NFTContainer>
          { address && (
            <Text size="4">NFT requires several minutes to reflect. <br></br>(Check <a href={`https://explorer.pops.one/address/${address}`} target="_blank">the explorer</a>, then reload this page.)</Text>
          )}
        </Content>
        <ButtonContainer>
          <Button
            onClick={() => {
              handleNFTInfo(selectedNft);
              onClose();
            }}
            size="medium"
            css={{
              display: 'flex',
              width: '100%',
            }}
          >
            Done
          </Button>
        </ButtonContainer>
      </NFTDialogContainer>
    </Dialog>
  );
};

export default NFTDialog;
