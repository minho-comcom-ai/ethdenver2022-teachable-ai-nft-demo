import styled from 'styled-components';
import React from 'react';

import { Text, Select, Button } from '@ainize/design-system';

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

const StyledSelect = styled(Select)`
  ${({ width }) => width && `width: ${width};`}
`;

const ModelSetting = ({
  status,
  jobType,
  currentJobType,
  handleJobType,
  handleRequestAinftTraining,
}) => {
  const isDisabled = status !== 'request';

  return (
    <CardWrapper>
      <Content>
        <Step>
          <Text size="p" color="2" weight="medium">
            Language
          </Text>
          <StyledSelect
            width="65px"
            size="small"
            options={[{ label: 'EN', value: 'EN' }]}
            value={{ label: 'EN', value: 'EN' }}
            disabled={isDisabled}
          />
        </Step>
        <Step>
          <Text size="p" color="2" weight="medium">
            Model Type
          </Text>
          <StyledSelect
            width="120px"
            size="small"
            options={jobType}
            value={currentJobType}
            onChange={handleJobType}
            disabled={isDisabled}
          />
        </Step>
      </Content>
      <Button
        css={{
          width: '100% !important',
        }}
        onClick={handleRequestAinftTraining}
        disabled={isDisabled}
      >
        Train Model
      </Button>
    </CardWrapper>
  );
};

export default ModelSetting;
