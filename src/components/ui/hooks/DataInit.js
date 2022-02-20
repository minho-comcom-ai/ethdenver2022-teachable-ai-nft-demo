import styled from 'styled-components';
import React from 'react';

import { Text } from '@ainize/design-system';
import NFTInput from '../input/NFTInput';
import DataFileInputNft from '../input/DataFileInputNft'; // FIXME(hyeonwoong): use DataFileInput
import NicknameInput from '../input/NicknameInput';

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Step = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DataInit = ({
  status,
  nft,
  file,
  nickname,
  handleNicknameEditor,
  handleNftSelector,
  handleFileInfo,
  handleNFTInfo,
}) => {
  const isEditable = status === 'init' || status === 'request';

  return (
    <CardWrapper>
      <Step>
        <Text size="p" color="2">
          1. Import NFT profile
        </Text>
        <NFTInput
          editable={isEditable}
          nft={nft}
          handleNftSelector={handleNftSelector}
          handleNFTInfo={handleNFTInfo}
        />
      </Step>
      <Step>
        <Text size="p" color="2">
          2. Upload .txt file
        </Text>
        <DataFileInputNft
          editable={isEditable}
          handleFileInfo={handleFileInfo}
          file={file}
        />
      </Step>
      <Step>
        <Text size="p" color="2">
          3. Name your AINFT
        </Text>
        <NicknameInput
          editable={isEditable}
          handleNicknameEditor={handleNicknameEditor}
          nickname={nickname}
        />
      </Step>
    </CardWrapper>
  );
};

export default DataInit;
