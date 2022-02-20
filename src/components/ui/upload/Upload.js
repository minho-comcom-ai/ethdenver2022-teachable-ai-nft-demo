import styled from 'styled-components';
import React from 'react';

import { Text } from '@ainize/design-system';
import FileUtil from 'utils/FileUtil';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #bdbdbd;
  border-radius: 4px;

  ${({ type }) =>
    `padding: ${type === 'file' ? '8px 12px' : '4px 12px 4px 4px'};`}
`;

const Content = styled.div`
  display: flex;
  gap: 8px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Roboto';
`;

const FileInfo = styled.div`
  display: flex;
  gap: 4px;
`;

const Remove = styled.img`
  cursor: pointer;
`;

const Upload = ({ editable, info, type, onRemove }) => {
  return (
    <Wrapper type={type}>
      <Content>
        {type === 'nft' && (
          <Icon>
            <img src={info.image_url} />
          </Icon>
        )}
        <Information>
          {type === 'file' ? (
            <FileInfo>
              <Text size="label">{info.name}</Text>
              <Text size="label" color="2">
                ({FileUtil.bytesToSize(info.size)})
              </Text>
            </FileInfo>
          ) : (
            <div>
              <Text size="label">{info.name}</Text>
            </div>
          )}
        </Information>
      </Content>
      {editable && (
        <Remove
          onClick={onRemove}
          src={'/images/close.svg'}
          width="16"
          height="16"
        />
      )}
    </Wrapper>
  );
};

export default Upload;
