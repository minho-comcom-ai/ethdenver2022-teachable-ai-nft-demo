import React from 'react';
import styled from 'styled-components';
import { Button, Text } from '@ainize/design-system';

const NicknameInputWrapper = styled.div`
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

const NicknameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const NicknameInput = ({ editable, nickname, handleNicknameEditor }) => {
  return (
    <NicknameInputWrapper>
      {nickname ? (
        <NicknameInfo>
          <Text size="basic" weight="bold">
            {nickname}
          </Text>
          {editable && (
            <img
              src="/images/editor.svg"
              onClick={() => {
                handleNicknameEditor(true);
              }}
            />
          )}
        </NicknameInfo>
      ) : (
        <Button
          onClick={() => {
            handleNicknameEditor(true);
          }}
          type="secondary"
          size="small"
          disabled={!editable}
        >
          Set nickname
        </Button>
      )}
    </NicknameInputWrapper>
  );
};

export default NicknameInput;
