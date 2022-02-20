// NOTE(minho@comcom.ai): This is the fork of our internal product (ainize.ai/teachable-nft)
// If you met the comments of non-hackathon-member, that would be also forked from our internal repo.
// After attending this ethdenver 2022 hackathon, we will merge this to our internal repo.

import React, { Children, memo, useEffect, useState, useRef } from 'react';

import Web3 from 'web3';

import Ain from '@ainblockchain/ain-js';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import * as _ from 'lodash';
import useWindowSize from '@rooks/use-window-size';
// Custom-UI
import CardBoardNft from 'components/ui/card/CardBoardNft'; // FIXME(hyeonwoong): use CardBoard
// Custom-Hooks
import ModelTraining from 'components/ui/hooks/ModelTraining';
// Managers
import GPT2FirebaseManager from '@ainize/ainize-ainetwork-gpt2-private-sdk';
// Dialog
import NFTDialog from 'components/dialog/NFTDialog';
import NicknameDialog from 'components/dialog/NicknameDialog';

import Const from 'constants/Const';

// Actions -> fetch
import DataInit from 'components/ui/hooks/DataInit';
import AINFTModelTrained from 'components/ui/hooks/AINFTModelTrained';

// ABI
import AINFT from '../../abi/AINFT';

import urlSlug from 'url-slug';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import TeachableNLPBanner from 'components/ui/layout/TeachableNLPBanner';

import TeachableTooltip, {
  TooltipIcon,
  Description,
  FileItemNFT,
  FileText,
} from 'components/ui/tooltip/TeachableTooltip';

const TeachableNFTBackground = dynamic(
  () => import('../ui/background/TeachableNLPBackground'),
  { ssr: false },
);

const TeachableNFTWrapper = styled.div`
  flex: 1;
  background-color: #fafafa;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const TitleText = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 64px;
  text-align: center;
  color: #333333;
  margin: 60px auto 0 auto;
  white-space: nowrap;

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.md}px) {
    font-family: Mulish;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0px;
    text-align: center;
    margin: 8px 0px 0px 0px;
  }
`;

const MidWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 864px;
  height: min-content;
  align-items: start;
  justify-content: space-between;
  margin: 71px auto 24px;

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.md}px) {
    display: none;
  }
`;

const ArrowRight = styled.img`
  width: 48px;
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
`;

const CarouselContainer = styled.div`
  width: 100%;
  display: none;
  position: relative;
  margin-top: 64px;

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.md}px) {
    display: block;
  }

  .arrow-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 113px;
    transform: translateY(-50%);
    z-index: 100;

    &.left {
      left: 16px;
    }

    &.right {
      right: 16px;
    }
  }
`;

const TrainAITypeSelectorWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  width: 160px;

  & .ainft {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    line-height: 30px;
    font-family: 'Roboto';
    font-weight: 700;
    color: #333333;
  }
`;

const TrainAITypeSelector = () => {
  return (
    <TrainAITypeSelectorWrapper>
      <img
        src={'/images/open-brace.svg'}
        alt={'brace'}
        width={11}
        height={40}
      />
      <span className="ainft">
        <img src={'/images/ainft.svg'} alt={'ainft'} width={20} height={20} />
        <span>AI NFT</span>
      </span>
      <img
        src={'/images/close-brace.svg'}
        alt={'brace'}
        width={11}
        height={40}
      />
    </TrainAITypeSelectorWrapper>
  );
};

const CarouselItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const CarouselItemContainer = styled.div`
  ${({ count, index }) => `
    width: ${count * 100}%;
    transform: translateX(-${(index * 100) / count}%);
  `}
  transition: .4s transform;
  display: flex;
`;

const Carousel = ({ status, children }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const count = Children.count(children);
  useEffect(() => {
    if (status === 'request') {
      setCurrIndex(1);
    } else if (status === 'trainied') {
      setCurrIndex(2);
    }
  }, [status]);

  return (
    <CarouselContainer>
      {currIndex > 0 && (
        <img
          src={'/images/arrow-left.png'}
          srcSet={`/images/arrow-left@2x.png 2x,/images/arrow-left@3x.png 3x`}
          className="arrow-icon left"
          onClick={() => {
            setCurrIndex((prev) => prev - 1);
          }}
        />
      )}
      <CarouselItemContainer count={count} index={currIndex}>
        {children}
      </CarouselItemContainer>
      {currIndex < count - 1 && (
        <img
          src={'/images/arrow-right.png'}
          srcSet={`/images/arrow-right@2x.png 2x,/images/arrow-right@3x.png 3x`}
          className="arrow-icon right"
          onClick={() => {
            setCurrIndex((prev) => prev + 1);
          }}
        />
      )}
    </CarouselContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .kebab {
    width: 5px;
    height: 19px;
  }
`;

const StyledMenu = styled(Menu)`
  margin-top: 44px;
  margin-left: 56px;
  padding-top: 0;
  padding-bottom: 0;
`;

const CustomMenuItem = styled(MenuItem)`
  &&& {
    display: flex;
    justify-content: center;
    background: #ffffff;
    min-width: 76px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #000000;

    &:hover {
      background: #e0e0e0;
    }
  }
`;

const Canvas = styled.div`
  display: none;
`;

const provider =
  process.env.AIN_BLOCKCHAIN_PROVIDER || 'https://dev-api.ainetwork.ai';
const chainId = provider.includes('mainnet') ? 1 : 0;
const ain = new Ain(provider, chainId);

const TeachableNftPage = () => {
  const authContext = {
    isSignedIn: true,
    signingStatus: Const.SIGNING_STATUS.COMPLETE,
    userId: process.env.AINIZE_USER_ID,
    userEmail: process.env.AINIZE_USER_EMAIL,
  };
  const { isSignedIn, signingStatus } = authContext;
  const canvasRef = useRef();
  const watermarkRef = useRef();
  const violetWatermarkRef = useRef();
  const router = useRouter();

  const [isOpenNftSelector, setIsOpenNftSelector] = useState(false);
  const [isOpenNicknameSelector, setIsOpenNicknameSelector] = useState(false);
  const [initData, setInitData] = useState({
    nft: null,
    file: null,
    nickname: '',
    mint: null,
  });
  const [jobType, setJobType] = useState([]);
  const [currentJobType, setCurrentJobType] = useState({});
  const [account, setAccount] = useState({});
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('signing');
  const [web3, setWeb3] = useState();
  const [demoAvailable, setDemoAvailable] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const { nft, file, nickname, mint } = initData;

  useEffect(() => {
    setDemoAvailable(false);
  }, [router.query.trainId]);

  useEffect(() => {
    if (!authContext.isSignedIn) {
      setStatus('signing');
      return;
    }
    if (!router.query.trainId && status !== 'training') {
      if (nft && file && nickname) {
        setStatus('request');
        return;
      }
    } else {
      return;
    }
    setStatus('init');
  }, [initData, router.query.trainId]);

  useEffect(() => {
    async function getInitalInformation() {
      const [responseJobType, responseAccount] = await Promise.all([
        GPT2FirebaseManager.requestJobType('ainft-chatbot'),
        {
          [process.env.AIN_ACCOUNT_ADDRESS]: {
            privateKey: process.env.AIN_PRIVATE_UNSAFE_KEY,
            id: process.env.AIN_ACCOUNT_ADDRESS,
          },
        },
      ]);
      const [address] = Object.keys(responseAccount);
      await GPT2FirebaseManager.signInWithCustomToken(
        address,
        responseAccount[address].privateKey,
      );
      const [appInfo, isTrained] = await GPT2FirebaseManager.getTrainIdInfo(
        address,
        router.query.trainId,
        'ainft_chatbot',
      );
      setJobType(responseJobType);
      setCurrentJobType(responseJobType[0]);
      setAccount(responseAccount[address]);

      if (appInfo) {
        setInitData(appInfo);
        if (isTrained) {
          setProgress(100);
          setStatus('trained');
          setTooltipVisible(false);
        }
      } else {
        router.replace('/teachable-nft');
      }
    }
    if (router.query.trainId !== nickname) {
      getInitalInformation();
    }
  }, [router.query.trainId]);

  useEffect(() => {
    setWeb3(new Web3(window.ethereum));
  }, []);

  const handleTxInfo = (txHash) => {
    setInitData((prev) => ({
      ...prev,
      mint: {
        txHash,
      },
    }));
  };

  const handleFileInfo = (file) => {
    setInitData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleNFTInfo = (nft) => {
    setInitData((prev) => ({
      ...prev,
      nft,
    }));
  };

  const handleNicknameInfo = async (nickname) => {
    setInitData((prev) => ({
      ...prev,
      nickname,
    }));
  };

  const handleJobType = (value) => {
    setCurrentJobType(value);
  };

  useEffect(() => {
    if (isSignedIn && signingStatus !== Const.SIGNING_STATUS.COMPLETE) {
      router.push('/signing');
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        handleNFTInfo(null);
      });

      window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
        const targetChainId = Const.getTargetChainId();
        if (Number(chainId) !== targetChainId) {
          alert(
            `Please change your MetaMask network setting to ${Const.ETH_CHAIN_NAME[targetChainId]}`,
          );
          return;
        }
      });
    }
  }, []);

  const handleNftSelector = (isOpen) => {
    setIsOpenNftSelector(isOpen);
  };

  const handleNicknameEditor = (isOpen) => {
    setIsOpenNicknameSelector(isOpen);
  };

  const handleDemoAvailable = (isAvailable) => {
    setDemoAvailable(isAvailable);
  };

  const TrainedMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { menuItemObjects } = props;

    const handleOpenMenu = (e) => {
      setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = (e) => {
      setAnchorEl(null);
    };

    return (
      <MenuContainer>
        <img
          className="kebab"
          src="/images/kebab@2x.png"
          onClick={handleOpenMenu}
        />
        <StyledMenu
          id=""
          anchorEl={anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}>
          {Object.entries(menuItemObjects).map(([text, onClickhandler]) => {
            return (
              <CustomMenuItem
                key={text}
                onClick={() => {
                  onClickhandler();
                  handleCloseMenu();
                }}>
                {text}
              </CustomMenuItem>
            );
          })}
        </StyledMenu>
      </MenuContainer>
    );
  };

  const handleCheckExistAppName = async (appName, callback) => {
    if (appName) {
      const isExistApp = await ain.db
        .ref()
        .getValue(`/manage_app/${appName}`, { is_final: true });

      if (isExistApp) {
        callback();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleRequestMinting = async () => {
    if (web3) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const targetChainId = Const.getTargetChainId();
      if (Number(chainId) !== targetChainId) {
        alert(
          `Please change your MetaMask network setting to ${Const.ETH_CHAIN_NAME[targetChainId]}`,
        );
        return;
      }
      const contract = new web3.eth.Contract(
        AINFT.abi,
        process.env.CLIENT_ENV === 'production'
          ? '0xDFcEf37A85997dfFEec31052CD537036EF657285'
          : '0xb9a0eb7877491e1ed7cc95245340da430a39cfad', // AI NFT on Harmony
      );
      contract.methods
        .mint(nft.asset_contract.address, nft.token_id)
        .send({ from: window.ethereum.selectedAddress })
        .once('transactionHash', (txHash) => {
          GPT2FirebaseManager.setErc721TxHash(txHash, nickname);
          handleTxInfo(txHash);
        })
        .catch((e) => {
          console.log(`Error minting erc721: ${e}`);
        });
    }
  };

  const handleRequestAinftTraining = async () => {
    try {
      if (
        await handleCheckExistAppName(nickname, () =>
          handleNicknameEditor(true),
        )
      ) {
        return;
      }

      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = nft.image_url;
      image.addEventListener(
        'load',
        async () => {
          canvasRef.current.width = image.width;
          canvasRef.current.height = image.height;
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, image.width, image.height);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, image.width, image.height);
          ctx.drawImage(image, 0, 0);
          const [r, g, b, a] = ctx.getImageData(20, 20, 1, 1).data;
          ctx.font = '12px Monaco';

          if (r === 255 && g === 255 && b === 255) {
            ctx.fillStyle = '#ae8afb';
            ctx.drawImage(
              violetWatermarkRef.current,
              image.width - 30 - violetWatermarkRef.current.width,
              image.height - 30 - violetWatermarkRef.current.height,
            );
          } else {
            ctx.drawImage(
              watermarkRef.current,
              image.width - 30 - watermarkRef.current.width,
              image.height - 30 - watermarkRef.current.height,
            );
          }

          ctx.fillText('STATE', 20, 20);
          ctx.fillText(
            `insight.ainetwork.ai/database/values/apps/${nickname}`,
            40,
            44,
          );
          ctx.fillText('SERVICE', 20, 80);
          ctx.fillText('api:', 40, 96);
          ctx.fillText(
            `ainize.ai/teachable-ainize/ainft_test?branch=${nickname}`,
            40,
            112,
          );
          ctx.fillText('demo:', 40, 128);
          ctx.fillText(`miniverse.afan.ai/${nickname}`, 40, 144);

          setStatus('training');

          const url = await new Promise((res, rej) => {
            canvasRef.current.toBlob(async (blob) => {
              try {
                const url = await GPT2FirebaseManager.uploadAINFTImageFile(
                  account.id,
                  nickname,
                  blob,
                );
                res(url);
              } catch (error) {
                rej(error);
              }
            });
          });

          await GPT2FirebaseManager.uploadDataFile(
            account.id,
            nickname,
            file,
            (progress) => {
              setProgress(progress);
            },
          );

          await GPT2FirebaseManager.requestAinftTrain({
            trainId: nickname,
            fileName: file.name,
            fileSize: file.size,
            jobType: currentJobType,
            address: account.id,
            privateKey: account.privateKey,
            ainizeUid: authContext.userId,
            ainizeMail: authContext.userEmail,
            metadata: {
              sourceNftContractAddress: nft.asset_contract.address,
              sourceNftTokenId: nft.token_id,
              ainftImageUrl: url,
              sourceImageUrl: nft.image_url,
              description: nft.description,
              name: nft.name,
            },
          });

          router.replace(`/teachable-nft/${nickname}`);
          setStatus('trained');
        },
        false,
      );
    } catch (error) {}
  };

  const windowSize = useWindowSize();

  const ContentAndFileTooltipInner = (props) => {
    const { description, files } = props;
  
    return (
      <>
        <Description>{description}</Description>
        <FileItemNFT>
          <img className='icon' src='/images/text-file.svg'
            width='13.33' height='16.67' />
          <a>
          {files.map((file) => <FileText onClick={() => {
            fetch(file)
              .then((res) => res.blob())
              .then((blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${file}-${+new Date()}.txt`;
                link.click();
              })
          }}>{file}</FileText>)}
          </a>
        </FileItemNFT>
      </>
    )
  }

  return (
    <TeachableNFTWrapper>
      <TeachableNFTBackground
        innerWidth={windowSize.innerWidth}
        innerHeight={windowSize.innerHeight}
      />
      {/* TODO: need to refactoring after eth Denver event @YoungJaeKim} */}
      <TeachableNLPBanner title="Ainize Teachable-NFT on Ethereum is live @ Ainize.ai/Teachable-NFT" buttonTitle="Try this on Ethereum!" buttonLinkUrl="https://ainize.ai/teachable-nft" />
      <TitleText>Turn your NFT into an AI NFT on Harmony Testnet</TitleText>
      <TrainAITypeSelector />
      <MidWrapper>
        <CardBoardNft
          title="Data"
          isActivate={status !== 'signing'}
          tooltipIcon={
            <TooltipIcon
              handleVisible={setTooltipVisible}
              nextStatus="nope"
            />
          }
          tooltip={
            <TeachableTooltip
              tooltip={{
                handleVisible: setTooltipVisible,
                tooltipVisible: tooltipVisible,
                content: <ContentAndFileTooltipInner
                  description={
                    `This is the data to be used for training. Currently only txt files are supported and the minimum recommended data size is 4KB. Please follow the prompt formatting. 10 prompts will be enough.`
                  } files={['/files/ainft_ain.txt']}/>,
              }}
            />
          }
        >
          <DataInit
            status={status}
            nft={nft}
            file={file}
            nickname={nickname}
            handleNicknameEditor={handleNicknameEditor}
            handleNftSelector={handleNftSelector}
            handleFileInfo={handleFileInfo}
            handleNFTInfo={handleNFTInfo}
          />
        </CardBoardNft>
        <ArrowRight
          style={{ marginTop: '90px' }}
          src={'/images/arrow-right.png'}
          srcSet={`/images/arrow-right@2x.png 2x,/images/arrow-right@3x.png 3x`}
        />
        <CardBoardNft
          title="Training"
          isActivate={status !== 'init' && status !== 'signing'}>
          <ModelTraining
            status={status}
            progress={progress}
            jobType={jobType}
            currentJobType={currentJobType}
            handleJobType={handleJobType}
            handleRequestAinftTraining={handleRequestAinftTraining}
          />
        </CardBoardNft>
        <ArrowRight
          style={{ marginTop: '90px' }}
          src={'/images/arrow-right.png'}
          srcSet={`/images/arrow-right@2x.png 2x,/images/arrow-right@3x.png 3x`}
        />
        <CardBoardNft
          title="Model"
          isActivate={status === 'trained'}
          menu={
            status === 'trained' &&
            demoAvailable && (
              <TrainedMenu
                menuItemObjects={{
                  'View API': () => {
                    window.open(
                      currentJobType.urlTemplate.api.replace(
                        '{{subdomain}}',
                        `${`teachable-ainize/${
                          process.env.CLIENT_ENV === 'production'
                            ? 'ainft'
                            : 'ainft_test'
                        }?branch=${nickname}`}`,
                      ),
                    );
                  },
                }}
              />
            )
          }>
          <AINFTModelTrained
            status={status}
            nickname={nickname}
            nft={nft}
            urlTemplate={currentJobType.urlTemplate}
            handleRequestMinting={handleRequestMinting}
            mint={mint}
            demoAvailable={demoAvailable}
            handleDemoAvailable={handleDemoAvailable}
          />
        </CardBoardNft>
      </MidWrapper>
      <Carousel status={status}>
        <CarouselItem>
          <CardBoardNft title="Data" isActivate={status !== 'signing'}>
            <DataInit
              status={status}
              nft={nft}
              file={file}
              nickname={nickname}
              handleNicknameEditor={handleNicknameEditor}
              handleNftSelector={handleNftSelector}
              handleFileInfo={handleFileInfo}
              handleNFTInfo={handleNFTInfo}
            />
          </CardBoardNft>
        </CarouselItem>
        <CarouselItem>
          <CardBoardNft
            title="Training"
            isActivate={status !== 'init' && status !== 'signing'}>
            <ModelTraining
              status={status}
              progress={progress}
              jobType={jobType}
              currentJobType={currentJobType}
              handleJobType={handleJobType}
              handleRequestAinftTraining={handleRequestAinftTraining}
            />
          </CardBoardNft>
        </CarouselItem>
        <CarouselItem>
          <CardBoardNft
            title="Model"
            isActivate={status === 'trained'}
            menu={
              status === 'trained' &&
              demoAvailable && (
                <TrainedMenu
                  menuItemObjects={{
                    'View API': () => {
                      window.open(
                        currentJobType.urlTemplate.api.replace(
                          '{{subdomain}}',
                          `${urlSlug(
                            `${nickname}-${
                              process.env.CLIENT_ENV === 'production'
                                ? 'ainft'
                                : 'ainft-test'
                            }`,
                          )}-teachable-ainize`,
                        ),
                      );
                    },
                  }}
                />
              )
            }>
            <AINFTModelTrained
              status={status}
              nickname={nickname}
              nft={nft}
              urlTemplate={currentJobType.urlTemplate}
              handleRequestMinting={handleRequestMinting}
              mint={mint}
              demoAvailable={demoAvailable}
              handleDemoAvailable={handleDemoAvailable}
            />
          </CardBoardNft>
        </CarouselItem>
      </Carousel>
      <NFTDialog
        open={isOpenNftSelector}
        onClose={() => {
          handleNftSelector(false);
        }}
        handleNFTInfo={handleNFTInfo}
        currentSelectedNft={nft}
      />
      <NicknameDialog
        open={isOpenNicknameSelector}
        onClose={() => {
          handleNicknameEditor(false);
        }}
        handleNicknameInfo={handleNicknameInfo}
        handleCheckExistAppName={handleCheckExistAppName}
      />
      <Canvas>
        <canvas ref={canvasRef} />
        <img src={'/images/watermark.png'} ref={watermarkRef} />
        <img src={'/images/watermark-violet.png'} ref={violetWatermarkRef} />
      </Canvas>
    </TeachableNFTWrapper>
  );
};

export default memo(TeachableNftPage);
