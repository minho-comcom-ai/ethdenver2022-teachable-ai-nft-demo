// TODO(hyeonwoong): DO NOT COMBINE BEFORE EXTRACTING ALL LOGICS FROM THE COMPONENT DESIGN.

import React, { memo, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@ainize/design-system';

// 구분
import Upload from 'components/ui/upload/Upload';

// Styled Components
const Input = styled.input`
  display: none;
`;

const DataFileInputWrapper = styled.div`
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

const DataUploadButton = styled.div`
  padding: 6.5px 27px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;

  ${({ isActivate }) =>
    isActivate
      ? `
            background: #8B3EEB;
            color: #ffffff;
        `
      : `
            background: #C4C4C4;;
            color: #828282;
        `}
`;

const Cover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const DataFileInputNft = ({ editable, handleFileInfo, file }) => {
  const inputRef = useRef(null);

  const onChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
    handleFileInfo(file);
  };

  const handleClickUploadButton = () => {
    inputRef.current.value = null;
    inputRef.current.click();
  };

  return (
    <>
      <Input type="file" onChange={onChange} accept=".txt" ref={inputRef} />
      <DataFileInputWrapper>
        {file ? (
          <Upload
            editable={editable}
            info={file}
            type="file"
            onRemove={() => {
              handleFileInfo(null);
            }}
          />
        ) : (
          <Button
            disabled={!editable}
            onClick={handleClickUploadButton}
            type="primary"
            startIcon={
              <img src="/images/upload-white.svg" width="16" height="16" />
            }
            size="small">
            Upload text file
          </Button>
        )}
      </DataFileInputWrapper>
    </>
  );
};

export default memo(DataFileInputNft);
