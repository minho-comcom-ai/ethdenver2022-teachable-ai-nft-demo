import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import urlSlug from 'url-slug';
import {
  getAinizeEndpoint,
  APP_COMPELETED_STATUS,
} from '../../../constants/Const';
import fetch from 'node-fetch';

import { Text, Button } from '@ainize/design-system';

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Step = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Training = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 38px;
`;

const Trained = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const NFTInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & img {
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const MintedNFTInfo = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  & img {
    object-fit: cover;
    border-radius: 8px;
  }
`;

const MintInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MintText = styled(Text)`
  color: #ae8afb;

  & a {
    font-weight: bold;
    color: #ae8afb;
  }
`;

const DemoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Pending = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  & img {
    align-self: center;
  }
`;

const AINFTModelTrained = ({
  status,
  nft,
  nickname,
  urlTemplate,
  handleRequestMinting,
  demoAvailable,
  handleDemoAvailable,
  mint,
}) => {
  const isTrained = status === 'trained';
  const isMinted = !!mint;
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isTrained) {
      if (!demoAvailable && !timer) {
        setTimer(
          setInterval(async () => {
            handleDemoAvailable(
              (await apiCheck(nickname)) && (await appCompleted(nickname)),
            );
          }, 3000),
        );
      } else if (demoAvailable && timer) {
        clearInterval(timer);
      }
    }
  }, [isTrained, demoAvailable]);

  const apiCheck = async (nickname) => {
    // FIXME(hyeonwoong): Please input repo name.
    const repoName =
      process.env.CLIENT_ENV === 'production' ? 'ainft' : 'ainft-test';
    const endpoint = getAinizeEndpoint(
      'teachable-ainize',
      urlSlug(`${nickname}-${repoName}`),
    );
    const res = await fetch(`${endpoint}/ping`).catch((err) => {});
    return res && res.ok;
  };

  const appCompleted = async (nickname) => {
    // FIXME(hyeonwoong): network parameter will be fixed like devnet, stagingnet, testnet...
    const res = await fetch(
      `/ainize-api/v2/transaction/app-status?appName=${nickname}&network=mainnet`,
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error('Failed to get app status', err);
        return null;
      });
    if (res && res.status === APP_COMPELETED_STATUS) {
      return true;
    }
    return false;
  };

  const beforeMint = (
    <Trained>
      <Info>
        <Text size="p" color="2">
          Your AINFT is ready
        </Text>
        <NFTInfo>
          <img src={nft?.image_url} width={60} height={60} />
        </NFTInfo>
        <MintInfo>
          <MintText size="p">
            on{' '}
            <a
              target="_blank"
              href={`${process.env.AIN_BLOCKCHAIN_INSIGHT}/database/values/apps/${nickname}`}
            >
              AI Network
            </a>
          </MintText>
        </MintInfo>
      </Info>
      <ButtonContainer>
        <Button
          size="medium"
          onClick={() => {
            window.open(urlTemplate.demo.replace('{{id}}', nickname));
          }}
          disabled={!demoAvailable}
          css={{ fontSize: '16px !important', width: '100% !important' }}
          endIcon={<img src="/images/link.svg" width={20} height={20} />}
        >
          Test Demo
        </Button>
        <Button
          size="medium"
          disabled={!demoAvailable}
          onClick={handleRequestMinting}
          css={{
            fontSize: '16px !important',
            width: '100% !important',
            color: '#8B3EEB !important',
          }}
          startIcon={
            <img src="/images/nft-violet.svg" width={20} height={20} />
          }
          type="secondary"
        >
          Mint on Ethereum
        </Button>
      </ButtonContainer>
    </Trained>
  );

  const afterMint = (
    <Trained>
      <Info>
        <Text size="p" color="2">
          Your AINFT is ready
        </Text>
        <MintedNFTInfo>
          <img src={nft?.image_url} width={60} height={60} />
          <DemoSection>
            <Text size="basic" color="2" weight="bold">
              {nickname}
            </Text>
            <Button
              onClick={() => {
                window.open(urlTemplate.demo.replace('{{id}}', nickname));
              }}
              disabled={!demoAvailable}
              size="small"
              endIcon={<img width={16} height={16} src={'/images/link.svg'} />}
              css={{ gap: '4px !important' }}
            >
              {demoAvailable ? 'Test Demo' : 'Deploying...'}
            </Button>
          </DemoSection>
        </MintedNFTInfo>
        <MintInfo>
          <MintText size="p">
            on{' '}
            <a
              target="_blank"
              href={`https://ain-sight-dev.herokuapp.com/database/values/apps/${nickname}`}
            >
              AI Network Insight
            </a>
          </MintText>
          <MintText size="p">
            on{' '}
            <a
              target="_blank"
              href={`https://${
                process.env.CLIENT_ENV !== 'production'
                  ? 'rinkeby.etherscan.io'
                  : 'etherscan.io'
              }/tx/${mint?.txHash}`}
            >
              etherscan.io
            </a>
          </MintText>
        </MintInfo>
      </Info>
    </Trained>
  );

  const pendingComponent = (
    <Pending>
      <Text size="basic" color="2" weight="bold">
        Building API...
      </Text>
      <img src="/images/model-violet.svg" width={60} height={60} />
    </Pending>
  );

  const mintComponent = isMinted ? afterMint : beforeMint;

  return (
    <CardWrapper>
      {isTrained ? (
        demoAvailable ? (
          [mintComponent]
        ) : (
          [pendingComponent]
        )
      ) : (
        <Training>
          <img src="/images/model.svg" width={60} height={60} />
          <Text size="basic" color="2" weight="bold">
            Your own model
          </Text>
        </Training>
      )}
    </CardWrapper>
  );
};

export default AINFTModelTrained;
