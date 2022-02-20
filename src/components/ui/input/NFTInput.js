import React from 'react';
import styled from 'styled-components';
import { Button } from '@ainize/design-system';

import Upload from 'components/ui/upload/Upload';


const NFTInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;

  & .data-text {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    margin-top: 13px;
  }
`;

const NFTInput = ({ editable, nft, handleNftSelector, handleNFTInfo }) => {
  return (
    <NFTInputWrapper>
      {nft ? (
        <Upload
          editable={editable}
          info={nft}
          type="nft"
          onRemove={() => {
            handleNFTInfo(null);
          }}
        />
      ) : (
        <Button
          onClick={() => {
            handleNftSelector(true);
          }}
          type="secondary"
          size="small"
          disabled={!editable}
        >
          Select NFT
        </Button>
      )}
    </NFTInputWrapper>
  );
};

export default NFTInput;
